"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", amount: 3400 },
  { month: "Feb", amount: 3100 },
  { month: "Mar", amount: 3450 },
  { month: "Apr", amount: 3150 },
  { month: "May", amount: 3350 },
  { month: "Jun", amount: 3300 },
];

export default function SpendingChart() {
  return (
    <div className="w-full mt-10 mb-20 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Spending Trend
      </h2>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#d6d6d6"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#999"
              tick={{ fontSize: 13 }}
            />
            <YAxis
              stroke="#999"
              tick={{ fontSize: 13 }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#9b8df5"          // soft purple line
              strokeWidth={3}
              dot={{ r: 5, stroke: "#9b8df5", strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
