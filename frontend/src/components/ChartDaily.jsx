import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", load: 12000 },
  { day: "Tue", load: 13500 },
  { day: "Wed", load: 12800 },
  { day: "Thu", load: 14200 },
  { day: "Fri", load: 15000 },
  { day: "Sat", load: 13800 },
  { day: "Sun", load: 14500 },
];

export default function ChartDaily() {
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl mb-3 font-bold">Daily Load Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="load" stroke="#2563eb" strokeWidth={3} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
