import { useState } from "react";
import { predictLoad } from "../api";
import ExplanationModal from "../components/ExplanationModal";

export default function Predict() {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const runPredict = async () => {
    setLoading(true);
    try {
      const nums = inputs.map(Number);
      const out = await predictLoad(nums);
      setPrediction(out);
    } catch (err) {
      console.error("Prediction failed:", err);
      alert("Prediction failed. Check backend connection.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        ⚡ Predict Energy Load
      </h2>

      {/* Input Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
        {inputs.map((v, i) => (
          <input
            key={i}
            className="border p-3 rounded-xl text-lg focus:ring-2 focus:ring-blue-600 outline-none shadow-sm"
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
        className={`w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold 
        hover:bg-blue-700 transform duration-200 shadow-md
        ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        onClick={runPredict}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {/* Prediction Output */}
      {prediction !== null && (
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-2xl font-bold text-blue-700 mb-2">Predicted Load</h3>
          <p className="text-4xl font-extrabold mb-4 text-purple-700">
            {prediction.toFixed(2)} MW
          </p>

          <button
            onClick={() => setShowExplain(true)}
            className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 
            shadow-md font-medium">
            🔍 Explain Prediction
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
