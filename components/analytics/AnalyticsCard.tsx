import { TrendingUp } from "lucide-react"
import React from "react"

interface AnalyticsCardProps {
    title: string,
    amount: string,
    percent: string,
    icon: React.ReactNode,
    trendIcon: React.ReactNode
}

export default function AnalyticsCard({ title, amount, percent, icon, trendIcon }:AnalyticsCardProps) {
    return (
        <div className="border border-gray-300 p-4 rounded-lg">
            <div className="mb-3 flex items-center justify-between">
                {/* left */}
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h3 className={`text-lg font-semibold ${title === "Total Income" ? "text-green-500" : "text-black"}`}>₦{amount}</h3>
                </div>
                {/* right */}
                <div>
                    {/* icon */}
                    <div className={`${title === "Total Income" ? "bg-green-100 text-green-500": "bg-red-100 text-red-500"} h-10 w-10 rounded-full flex items-center justify-center`}>
                        {icon}
                    </div>
                </div>
            </div>

            <div className={`flex text-sm items-center gap-2 ${title === "Total Income" ? "text-green-500" : "text-red-500"}`}>
                {trendIcon}
                <p>{percent}</p>
                <span className="text-gray-500">vs last month</span>
            </div>
        </div>
    )
}