export default function Comparison() {
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-3">Model Comparison</h2>
      <p>Random Forest (Your Model)</p>
      <ul className="list-disc pl-6">
        <li>R² = 0.8080</li>
        <li>MAE = 607 MW</li>
        <li>RMSE = 798 MW</li>
      </ul>
    </div>
  );
}
