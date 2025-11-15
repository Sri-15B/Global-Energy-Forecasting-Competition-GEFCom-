import { useState } from "react";
import { predictLoad } from "../api";
import ExplanationModal from "../components/ExplanationModal";

export default function Predict() {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [prediction, setPrediction] = useState(null);
  const [showExplain, setShowExplain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const runPredict = async () => {
    setErrorMsg("");

    // Basic input validation
    if (inputs.some((v) => v === "")) {
      setErrorMsg("⚠ Please fill all 5 feature values before predicting.");
      return;
    }

    const nums = inputs.map(Number);
    setLoading(true);

    const out = await predictLoad(nums);

    setLoading(false);

    // If backend returned fallback 0 due to error
    if (out === 0) {
      setErrorMsg("❌ Backend error — check if your API is deployed correctly.");
    }

    setPrediction(out);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Predict Energy Load
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-4">
        {inputs.map((v, i) => (
          <input
            key={i}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={v}
            placeholder={`Feature ${i + 1}`}
            type="number"
            onChange={(e) => {
              const arr = [...inputs];
              arr[i] = e.target.value;
              setInputs(arr);
            }}
          />
        ))}
      </div>

      {/* Error message */}
      {errorMsg && (
        <p className="text-red-600 font-semibold mb-3">{errorMsg}</p>
      )}

      {/* Predict button */}
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={runPredict}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {/* Prediction Output */}
      {prediction !== null && (
        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-blue-700">Predicted Load:</h3>
          <p className="text-3xl font-bold mb-4">
            {prediction.toFixed(2)} MW
          </p>

          <button
            onClick={() => setShowExplain(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Explain Prediction
          </button>
        </div>
      )}

      {/* AI Explanation Modal */}
      <ExplanationModal
        open={showExplain}
        prediction={prediction}
        onClose={() => setShowExplain(false)}
      />
    </div>
  );
}
