import { useState } from "react";
import { predictLoad } from "../api";

export default function Predict() {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState(null);

  const runPredict = async () => {
    const nums = inputs.map(Number);
    const out = await predictLoad(nums);
    setResult(out);
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-3">Predict Energy Load</h2>

      <div className="grid grid-cols-5 gap-3 mb-4">
        {inputs.map((v, i) => (
          <input
            key={i}
            className="border p-2 rounded"
            value={v}
            placeholder={`Feature ${i + 1}`}
            onChange={(e) => {
              const newArr = [...inputs];
              newArr[i] = e.target.value;
              setInputs(newArr);
            }}
          />
        ))}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={runPredict}
      >
        Predict
      </button>

      {result !== null && (
        <p className="mt-4 text-lg font-semibold text-green-600">
          Predicted Load: {result.toFixed(2)} MW
        </p>
      )}
    </div>
  );
}
