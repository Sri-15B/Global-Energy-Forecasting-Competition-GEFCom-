import { motion, AnimatePresence } from "framer-motion";

export default function ExplanationModal({ open, prediction, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-11/12 max-w-lg"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140 }}
        >
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
            AI Explanation
          </h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Based on the values you entered, the model estimated the energy load
            to be{" "}
            <span className="font-bold text-blue-600 dark:text-blue-300">
              {prediction?.toFixed(2)} MW
            </span>
            . The prediction is influenced by numerical relationships between your
            input features and past energy patterns learned by the model.
            Higher or lower values in key features may shift the demand
            estimation accordingly.
          </p>

          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
