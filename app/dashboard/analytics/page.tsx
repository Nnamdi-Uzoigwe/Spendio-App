// "use client"

// import AnalyticsCard from "@/components/analytics/AnalyticsCard";
// import BudgetOverview from "@/components/analytics/budget/BudgetOverview";
// import ExpenseCategories from "@/components/analytics/categories/ExpenseCategories";
// import SpendingChart from "@/components/analytics/trends/SpendingChart";
// import { ArrowDownLeft, ArrowUpRight, Calendar, TrendingDown, TrendingUp } from "lucide-react";
// import { useState } from "react";

// export default function Analytics() {
//     const [activeTab, setActiveTab] = useState("Overview");
//     const analyticsCardData = [
//         {
//             id: 1,
//             title: "Total Income",
//             amount: "46,000",
//             icon: <ArrowDownLeft />,
//             percent: "+ 8.2%",
//             trendIcon: <TrendingUp size={17} />
//         },
//         {
//             id: 2,
//             title: "Total Expense",
//             amount: "32,500",
//             icon: <ArrowUpRight />,
//             percent: "- 2.1%",
//             trendIcon: <TrendingDown size={17} />
//         }
//     ]
//     return (
//         <div className="">
//             <div className="px-4 lg:px-40 py-4 border-b border-gray-300 flex justify-between items-center">
//                 <h4 className="text-lg font-semibold">Analytics</h4>
//                 <button className="border border-gray-300 rounded-md flex items-center gap-2 py-1 px-2">
//                     <Calendar size={17} />
//                     <p>This month</p>
//                 </button>
//             </div>

//             <div className="mt-10 px-4 lg:px-40 grid grid-cols-2 gap-3">
//                 {analyticsCardData.map((item) => (
//                     <AnalyticsCard 
//                         key={item.id}
//                         title={item.title}
//                         amount={item.amount}
//                         icon={item.icon}
//                         percent={item.percent}
//                         trendIcon={item.trendIcon}
//                     />
//                 ))}
//             </div>

//              {/* Tab navigation */}
//             <div className="mt-10 px-4 lg:px-40">
//                 <div className="bg-gray-200 grid p-1 grid-cols-3 gap-1 rounded-[40px] overflow-hidden">
//                     <div onClick={() => setActiveTab("Overview")} className={`${activeTab === "Overview" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-md font-semibold`}>Overview</div>
//                     <div onClick={() => setActiveTab("Trends")} className={`${activeTab === "Trends" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-md font-semibold`}>Trends</div>
//                     <div onClick={() => setActiveTab("Categories")} className={`${activeTab === "Categories" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-md font-semibold`}>Categories</div>
//                 </div>
//             </div>

//             <div className="px-4 lg:px-40 pb-20">

//                 {activeTab === "Overview" && <BudgetOverview />}
//                 {activeTab === "Trends" &&  <SpendingChart />}
//                 {activeTab === "Categories" &&  <ExpenseCategories />}
//             </div>
//         </div>
//     )
// }


"use client"

import { ArrowDownLeft, ArrowUpRight, Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import BudgetOverview from "@/components/analytics/budget/BudgetOverview";
import ExpenseCategories from "@/components/analytics/categories/ExpenseCategories";
import SpendingChart from "@/components/analytics/trends/SpendingChart";
import { useFinanceStore } from "@/store/financeStore";

interface AnalyticsCardProps {
  title: string;
  amount: number;
  percent: string;
  icon: React.ReactNode;
  trendIcon: React.ReactNode;
}

function AnalyticsCard({ title, amount, percent, icon, trendIcon }: AnalyticsCardProps) {
  const isIncome = title === "Total Income";
  const isPositive = parseFloat(percent) >= 0;
  
  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className={`text-lg font-semibold ${isIncome ? "text-green-500" : "text-black"}`}>
            ₦{amount.toLocaleString()}
          </h3>
        </div>
        <div className={`${isIncome ? "bg-green-100 text-green-500": "bg-red-100 text-red-500"} h-10 w-10 rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className={`flex text-sm items-center gap-2 ${
        isIncome 
          ? (isPositive ? "text-green-500" : "text-red-500")
          : (isPositive ? "text-red-500" : "text-green-500")
      }`}>
        {trendIcon}
        <p>{percent}</p>
        <span className="text-gray-500">vs last month</span>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<"Overview" | "Trends" | "Categories">("Overview");
  
  const {
    income,
    expenses,
    previousMonthIncome,
    previousMonthExpenses,
    loading,
    fetchMonthlyFinance,
    fetchPreviousMonthData,
  } = useFinanceStore();

  useEffect(() => {
    // Fetch data when component mounts
    const loadData = async () => {
      await fetchMonthlyFinance();
      await fetchPreviousMonthData();
    };
    
    loadData();
  }, [fetchMonthlyFinance, fetchPreviousMonthData]);

  // Calculate percentage changes
  const incomeChange = previousMonthIncome > 0 
    ? (((income - previousMonthIncome) / previousMonthIncome) * 100).toFixed(1)
    : "0.0";
    
  const expenseChange = previousMonthExpenses > 0
    ? (((expenses - previousMonthExpenses) / previousMonthExpenses) * 100).toFixed(1)
    : "0.0";

  const incomeChangeNum = parseFloat(incomeChange);
  const expenseChangeNum = parseFloat(expenseChange);

  const analyticsCardData = [
    {
      id: 1,
      title: "Total Income",
      amount: income,
      icon: <ArrowDownLeft />,
      percent: `${incomeChangeNum >= 0 ? '+' : ''}${incomeChange}%`,
      trendIcon: incomeChangeNum >= 0 ? <TrendingUp size={17} /> : <TrendingDown size={17} />
    },
    {
      id: 2,
      title: "Total Expense",
      amount: expenses,
      icon: <ArrowUpRight />,
      percent: `${expenseChangeNum >= 0 ? '+' : ''}${expenseChange}%`,
      trendIcon: expenseChangeNum >= 0 ? <TrendingUp size={17} /> : <TrendingDown size={17} />
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="px-4 lg:px-40 py-4 border-b border-gray-300 flex justify-between items-center">
        <h4 className="text-lg font-semibold">Analytics</h4>
        <button className="border border-gray-300 rounded-md flex items-center gap-2 py-1 px-2">
          <Calendar size={17} />
          <p>This month</p>
        </button>
      </div>

      <div className="mt-10 px-4 lg:px-40 grid grid-cols-2 gap-3">
        {analyticsCardData.map((item) => (
          <AnalyticsCard 
            key={item.id}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
            percent={item.percent}
            trendIcon={item.trendIcon}
          />
        ))}
      </div>

      {/* Tab navigation */}
      <div className="mt-10 px-4 lg:px-40">
        <div className="bg-gray-200 grid p-1 grid-cols-3 gap-1 rounded-[40px] overflow-hidden">
          <div 
            onClick={() => setActiveTab("Overview")} 
            className={`${activeTab === "Overview" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center py-2 rounded-[40px] text-md font-semibold transition-colors`}
          >
            Overview
          </div>
          <div 
            onClick={() => setActiveTab("Trends")} 
            className={`${activeTab === "Trends" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center py-2 rounded-[40px] text-md font-semibold transition-colors`}
          >
            Trends
          </div>
          <div 
            onClick={() => setActiveTab("Categories")} 
            className={`${activeTab === "Categories" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center py-2 rounded-[40px] text-md font-semibold transition-colors`}
          >
            Categories
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-40 pb-20">
        {activeTab === "Overview" && <BudgetOverview />}
        {activeTab === "Trends" && <SpendingChart />}
        {activeTab === "Categories" && <ExpenseCategories />}
      </div>
    </div>
  );
}