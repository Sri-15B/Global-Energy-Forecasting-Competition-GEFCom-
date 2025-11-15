import { useState } from "react";

export default function BulkPredict() {
  const [csvData, setCsvData] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const parseCSV = (text) => {
    return text
      .trim()
      .split("\n")
      .map((row) => row.split(",").map(Number));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const parsed = parseCSV(event.target.result);
      setCsvData(parsed);
      setProgress(0);
      setResult([]);
    };
    reader.readAsText(file);
  };

  const runBulkPrediction = async () => {
    if (!csvData) return;

    setLoading(true);
    setProgress(0);
    let outputRows = [];

    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i];

      const res = await fetch(`${backendURL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: row }),
      });

      const data = await res.json();
      outputRows.push([...row, data.prediction]);

      // Update progress %
      setProgress(Math.round(((i + 1) / csvData.length) * 100));
    }

    setResult(outputRows);
    setLoading(false);
  };

  const downloadCSV = () => {
    const csvString = result.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "predictions.csv";
    a.click();
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Bulk CSV Prediction
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="mb-4"
      />

      {csvData && (
        <p className="text-gray-700 mb-4">
          Loaded <b>{csvData.length}</b> rows from CSV
        </p>
      )}

      {!loading && (
        <button
          onClick={runBulkPrediction}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Run Bulk Prediction
        </button>
      )}

      {/* Progress Bar */}
      {loading && (
        <div className="mt-6">
          <p className="text-center font-medium">{progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {result.length > 0 && (
        <>
          <p className="mt-6 text-green-700 text-lg">
            ✔ Predictions complete: {result.length} rows
          </p>
          <button
            onClick={downloadCSV}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Download Result CSV
          </button>
        </>
      )}
    </div>
  );
                              }
