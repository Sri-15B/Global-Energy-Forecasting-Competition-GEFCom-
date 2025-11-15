export default function ExplanationModal({ open, onClose, prediction }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-3">
          AI Explanation
        </h2>

        <p className="text-gray-700 mb-4">
          The model predicts an estimated energy load of:
        </p>

        <p className="text-4xl font-bold text-blue-700 mb-6">
          {prediction} MW
        </p>

        <p className="text-gray-600 text-sm mb-6">
          This prediction is based on the input parameters you provided, using a
          trained Random Forest model from the Global Energy Forecasting dataset.
        </p>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
