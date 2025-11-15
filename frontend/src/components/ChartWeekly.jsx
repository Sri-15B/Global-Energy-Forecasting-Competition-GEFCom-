import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { week: "W1", load: 98000 },
  { week: "W2", load: 102000 },
  { week: "W3", load: 96000 },
  { week: "W4", load: 110000 }
];

export default function ChartWeekly() {
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl mb-3 font-bold">Weekly Load Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <Bar dataKey="load" fill="#3b82f6" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
