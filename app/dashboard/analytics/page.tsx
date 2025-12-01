"use client"

import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import BudgetOverview from "@/components/analytics/budget/BudgetOverview";
import ExpenseCategories from "@/components/analytics/categories/ExpenseCategories";
import SpendingChart from "@/components/analytics/trends/SpendingChart";
import { ArrowDownLeft, ArrowUpRight, Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Analytics() {
    const [activeTab, setActiveTab] = useState("Overview");
    const analyticsCardData = [
        {
            id: 1,
            title: "Total Income",
            amount: "46,000",
            icon: <ArrowDownLeft />,
            percent: "+ 8.2%",
            trendIcon: <TrendingUp size={17} />
        },
        {
            id: 2,
            title: "Total Expense",
            amount: "32,500",
            icon: <ArrowUpRight />,
            percent: "- 2.1%",
            trendIcon: <TrendingDown size={17} />
        }
    ]
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
                    <div onClick={() => setActiveTab("Overview")} className={`${activeTab === "Overview" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-md font-semibold`}>Overview</div>
                    <div onClick={() => setActiveTab("Trends")} className={`${activeTab === "Trends" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-md font-semibold`}>Trends</div>
                    <div onClick={() => setActiveTab("Categories")} className={`${activeTab === "Categories" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-md font-semibold`}>Categories</div>
                </div>
            </div>

            <div className="px-4 lg:px-40 pb-20">

                {activeTab === "Overview" && <BudgetOverview />}
                {activeTab === "Trends" &&  <SpendingChart />}
                {activeTab === "Categories" &&  <ExpenseCategories />}
            </div>
        </div>
    )
}