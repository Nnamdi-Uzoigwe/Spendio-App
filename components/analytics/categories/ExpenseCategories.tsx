import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, PieLabelRenderProps } from 'recharts';

interface ExpenseData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  [key: string]: string | number; // Add index signature for Recharts compatibility
}

const ExpenseCategories = () => {
  const data: ExpenseData[] = [
    { name: 'Food & Dining', value: 850, percentage: 40, color: '#9B8CE8' },
    { name: 'Transportation', value: 420, percentage: 20, color: '#7BC9A8' },
    { name: 'Shopping', value: 380, percentage: 18, color: '#F5C563' },
    { name: 'Bills', value: 320, percentage: 15, color: '#F28B82' },
    { name: 'Entertainment', value: 180, percentage: 8, color: '#A8D5E5' }
  ];

  return (
    <div className="w-full max-w-6xl mb-20 mx-auto bg-white">
      {/* Pie Chart Section */}
      <div className="bg-white rounded-lg p-8 mb-4">
        <h2 className="text-xl font-medium mb-8">Expense Categories</h2>
        
        <div className="relative h-96 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={true}
                animationDuration={800}
                animationBegin={0}
                animationEasing="ease-out"
                label={(props: PieLabelRenderProps) => {
                  const entry = props as PieLabelRenderProps & ExpenseData;
                  const RADIAN = Math.PI / 180;
                  const radius = 140 + 40;
                  const midAngle = entry.midAngle ?? 0;
                  const x = entry.cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = entry.cy + radius * Math.sin(-midAngle * RADIAN);
                  
                  return (
                    <text
                      x={x}
                      y={y}
                      fill={entry.color}
                      textAnchor={x > entry.cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      className="text-sm font-medium"
                    >
                      {`${entry.name} ${entry.percentage}%`}
                    </text>
                  );
                }}
                labelLine={{
                  stroke: '#E5E7EB',
                  strokeWidth: 1
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category List */}
      <div className="bg-white flex flex-col gap-2 rounded-lg">
        {data.map((category, index) => (
          <div
            key={category.name}
            className="flex items-center justify-between py-6 px-8 border-b rounded-xl bg-[#f9f6f4] border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-base font-medium text-gray-900">
                {category.name}
              </span>
            </div>
            <span className="text-base font-semibold text-gray-900">
              ${category.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCategories;