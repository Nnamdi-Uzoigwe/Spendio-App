"use client";

interface IncomeChartProp {
  data: number[]
}
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function IncomeVsExpensesChart() {
  const data = [
    { month: "Jan", income: 4200, expenses: 3000 },
    { month: "Feb", income: 4500, expenses: 2800 },
    { month: "Mar", income: 4300, expenses: 3200 },
    { month: "Apr", income: 4700, expenses: 2900 },
    { month: "May", income: 4200, expenses: 3100 },
    { month: "Jun", income: 4600, expenses: 3000 },
  ];

  return (
    <div className="w-full rounded-2xl border border-gray-200 p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Income vs Expenses
      </h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#dadada"
            />
            <XAxis dataKey="month" tick={{ fill: "#555" }} />
            <YAxis tick={{ fill: "#555" }} />
            <Tooltip />
            <Bar
              dataKey="income"
              fill="#22c55e" // Tailwind green-500
              barSize={35}
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill="#ef4444" // Tailwind red-500
              barSize={35}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
