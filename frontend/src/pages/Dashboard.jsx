import Predict from "./Predict";
import Comparison from "./Comparison";
import ChartDaily from "../components/ChartDaily";
import ChartWeekly from "../components/ChartWeekly";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">
        Energy Forecasting Dashboard
      </h1>

      <Predict />
      <ChartDaily />
      <ChartWeekly />
      <Comparison />
    </div>
  );
}
