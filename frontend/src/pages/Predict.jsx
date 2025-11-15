import { useState } from "react";
import ExplanationModal from "../components/ExplanationModal";

export default function Predict() {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [prediction, setPrediction] = useState(null);
  const [showExplain, setShowExplain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Inline API function (Fix for Netlify)
  async function predictLoad(features) {
    try {
      const res = await fetch(
        "https://global-energy-forecasting-competition.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ features }),
        }
      );

      if (!res.ok) {
        throw new Error("Backend error: " + res.status);
      }

      return res.json();
    } catch (err) {
      throw err;
    }
  }

  const runPredict = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const nums = inputs.map(Number);
      const out = await predictLoad(nums);

      // expect {prediction: value}
      setPrediction(out.prediction);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Predict Energy Load
      </h2>

      {/* Input Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
        {inputs.map((v, i) => (
          <input
            key={i}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={v}
            placeholder={`Feature ${i + 1}`}
            type="number"
            onChange={(e) => {
              const newArr = [...inputs];
              newArr[i] = e.target.value;
              setInputs(newArr);
            }}
          />
        ))}
      </div>

      {/* Predict Button */}
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={runPredict}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 font-semibold mt-4">
          ❌ {error}
        </p>
      )}

      {/* Prediction Output */}
      {prediction !== null && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-blue-700">Predicted Load:</h3>
          <p className="text-3xl font-bold mb-4">{prediction.toFixed(2)} MW</p>

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
