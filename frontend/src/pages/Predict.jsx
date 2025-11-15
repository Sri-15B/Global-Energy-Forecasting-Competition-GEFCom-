import { useState } from "react";
import { predictLoad } from "../api";
import ExplanationModal from "../components/ExplanationModal";

export default function Predict() {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [prediction, setPrediction] = useState(null);
  const [showExplain, setShowExplain] = useState(false);

  const runPredict = async () => {
    const nums = inputs.map(Number);
    const out = await predictLoad(nums);
    setPrediction(out);
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
      >
        Predict
      </button>

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
