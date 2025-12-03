

// "use client"

// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, PieLabelRenderProps } from 'recharts';
// import { useFinanceStore } from '@/store/financeStore';

// interface ExpenseData {
//   name: string;
//   value: number;
//   percentage: number;
//   color: string;
//   count?: number;
//   [key: string]: string | number | undefined;
// }

// const COLORS: string[] = [
//   '#9B8CE8', // Purple
//   '#7BC9A8', // Green
//   '#F5C563', // Yellow
//   '#F28B82', // Red
//   '#A8D5E5', // Blue
//   '#FFB6C1', // Pink
//   '#DDA15E', // Orange
//   '#B5838D', // Mauve
// ];

// const ExpenseCategories: React.FC = () => {
//   const { categoryBreakdown, fetchCategoryBreakdown } = useFinanceStore();

//   const [isMobile, setIsMobile] = useState(false);

// useEffect(() => {
//   const handleResize = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
//   handleResize();
//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);

//   useEffect(() => {
//     fetchCategoryBreakdown();
//   }, [fetchCategoryBreakdown]);

//   // Transform backend data to chart format
//   const data: ExpenseData[] = categoryBreakdown.map((cat, index) => ({
//     name: cat.category,
//     value: cat.amount,
//     percentage: Math.round(cat.percentage * 10) / 10, // Round to 1 decimal
//     color: COLORS[index % COLORS.length],
//     count: cat.count
//   }));

//   // Fallback sample data
//   const sampleData: ExpenseData[] = [
//     { name: 'Food & Dining', value: 850, percentage: 40, color: '#9B8CE8' },
//     { name: 'Transportation', value: 420, percentage: 20, color: '#7BC9A8' },
//     { name: 'Shopping', value: 380, percentage: 18, color: '#F5C563' },
//     { name: 'Bills', value: 320, percentage: 15, color: '#F28B82' },
//     { name: 'Entertainment', value: 180, percentage: 8, color: '#A8D5E5' }
//   ];

//   const displayData: ExpenseData[] = data.length > 0 ? data : sampleData;

//   const renderCustomLabel = (props: PieLabelRenderProps): React.ReactElement | null => {
//     const entry = props as PieLabelRenderProps & ExpenseData;
//     const RADIAN = Math.PI / 180;
//     const radius = 140 + 40;
//     const midAngle = entry.midAngle ?? 0;
//     const cx = entry.cx ?? 0;
//     const cy = entry.cy ?? 0;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
//     return (
//       <text
//         x={x}
//         y={y}
//         fill={entry.color}
//         textAnchor={x > cx ? 'start' : 'end'}
//         dominantBaseline="central"
//         className="text-sm font-medium"
//       >
//         {`${entry.name} ${entry.percentage}%`}
//       </text>
//     );
//   };

//   return (
//     <div className="w-full max-w-6xl mb-20 mx-auto bg-white">
//       {/* Pie Chart Section */}
//       <div className="bg-white rounded-lg p-8 mb-4">
//         <h2 className="text-xl font-medium mb-8">Expense Categories</h2>
        
//         {displayData.length === 0 ? (
//           <div className="h-96 flex items-center justify-center text-gray-500">
//             No expense data available
//           </div>
//         ) : (
//           <div className="relative h-96 flex items-center justify-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={displayData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={isMobile ? 50 : 80}
//                   outerRadius={isMobile ? 90 : 140}
//                   paddingAngle={2}
//                   dataKey="value"
//                   isAnimationActive={true}
//                   animationDuration={800}
//                   animationBegin={0}
//                   animationEasing="ease-out"
//                   label={renderCustomLabel}
//                   labelLine={{
//                     stroke: '#E5E7EB',
//                     strokeWidth: 1
//                   }}
//                 >
//                   {displayData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>

//       {/* Category List */}
//       <div className="bg-white flex flex-col gap-2 rounded-lg">
//         {displayData.map((category, index) => (
//           <div
//             key={`${category.name}-${index}`}
//             className="flex items-center justify-between py-6 px-8 border-b rounded-xl bg-[#f9f6f4] border-gray-100 last:border-b-0"
//           >
//             <div className="flex items-center gap-4">
//               <div
//                 className="w-8 h-8 rounded-full"
//                 style={{ backgroundColor: category.color }}
//               />
//               <div>
//                 <span className="text-base font-medium text-gray-900 block">
//                   {category.name}
//                 </span>
//                 {category.count && (
//                   <span className="text-xs text-gray-500">
//                     {category.count} transactions
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="text-right">
//               <span className="text-base font-semibold text-gray-900 block">
//                 ₦{category.value.toLocaleString()}
//               </span>
//               <span className="text-xs text-gray-500">
//                 {category.percentage}%
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {data.length === 0 && (
//         <div className="text-center mt-4 text-gray-500 text-sm">
//           Showing sample data. Add expenses to see your actual spending breakdown.
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpenseCategories;


"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, PieLabelRenderProps } from "recharts";
import { useFinanceStore } from "@/store/financeStore";

interface ExpenseData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  count?: number;
  [key: string]: string | number | undefined;
}

const COLORS = [
  "#9B8CE8", "#7BC9A8", "#F5C563", "#F28B82",
  "#A8D5E5", "#FFB6C1", "#DDA15E", "#B5838D",
];

const ExpenseCategories: React.FC = () => {
  const { categoryBreakdown, fetchCategoryBreakdown } = useFinanceStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchCategoryBreakdown();
    
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchCategoryBreakdown]);

  const data: ExpenseData[] = categoryBreakdown.map((cat, index) => ({
    name: cat.category,
    value: cat.amount,
    percentage: Math.round(cat.percentage * 10) / 10,
    color: COLORS[index % COLORS.length],
    count: cat.count,
  }));

  const sampleData: ExpenseData[] = [
    { name: "Food & Dining", value: 850, percentage: 40, color: "#9B8CE8" },
    { name: "Transportation", value: 420, percentage: 20, color: "#7BC9A8" },
    { name: "Shopping", value: 380, percentage: 18, color: "#F5C563" },
    { name: "Bills", value: 320, percentage: 15, color: "#F28B82" },
    { name: "Entertainment", value: 180, percentage: 8, color: "#A8D5E5" },
  ];

  const displayData = data.length > 0 ? data : sampleData;

  /** 📍 Responsive Label Renderer */
  const renderCustomLabel = (props: PieLabelRenderProps): React.ReactElement | null => {
    const entry = props as PieLabelRenderProps & ExpenseData;
    const RADIAN = Math.PI / 180;

    const labelRadius = isMobile ? 110 : 180; // 📌 Adjusted for mobile here

    const midAngle = entry.midAngle ?? 0;
    const cx = entry.cx ?? 0;
    const cy = entry.cy ?? 0;
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={entry.color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className={`font-medium ${isMobile ? "text-[10px]" : "text-sm"}`}
      >
        {`${entry.name} ${entry.percentage}%`}
      </text>
    );
  };

  return (
    <div className="w-full max-w-6xl mb-20 mx-auto bg-white">
      
      {/* 📊 Pie Chart */}
      <div className="bg-white rounded-lg p-8 mb-4">
        <h2 className="text-xl text-gray-700 font-medium mb-8">Expense Categories</h2>

        {displayData.length === 0 ? (
          <div className="h-96 flex items-center justify-center text-gray-500">
            No expense data available
          </div>
        ) : (
          <div className="relative h-64 sm:h-96 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 50 : 80}
                  outerRadius={isMobile ? 90 : 140} // 📍 Shrinks on mobile
                  paddingAngle={2}
                  dataKey="value"
                  label={renderCustomLabel}
                  labelLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                >
                  {displayData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* 📌 Category List */}
      <div className="bg-white flex flex-col gap-2 rounded-lg">
        {displayData.map((category, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 lg:py-6 px-4 lg:px-8 border-b rounded-xl bg-[#f9f6f4] border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: category.color }} />
              <div>
                {/* <span className="text-base font-medium">{category.name}</span>
                {category.count && <span className="text-xs text-gray-500">{category.count} transactions</span>} */}
                 <span className="text-base font-medium text-gray-900 block">
                   {category.name}
                 </span>
                 {category.count && (
                   <span className="text-xs text-gray-500">
                    {category.count} {category.count > 1 ? "transactions" : "transaction"}
                   </span>
                 )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-semibold">₦{category.value.toLocaleString()}</span>
              <span className="text-xs text-gray-500 block">{category.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center mt-4 text-gray-500 text-sm">
          Showing sample data. Add expenses to view your actual breakdown.
        </div>
      )}
    </div>
  );
};

export default ExpenseCategories;
