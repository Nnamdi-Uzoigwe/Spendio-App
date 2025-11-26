"use client"

import { Calendar, EllipsisVertical } from "lucide-react"

export default function CompletedTasks() {
    const completedData = [
        {
            id: 1,
            title: "Submit expense reports",
            description: "Upload receipts for business trip expenses",
            priority: "medium",
            category: "Work",
            date: "Sep 9"
        },
    ]
    return (
        <div className="flex flex-col gap-4 mb-20">
            {completedData.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex justify-between">
                    {/* left */}
                    <div className="flex gap-2 items-start">
                        <div>
                            <input type="checkbox" defaultChecked />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-md font-semibold line-through">{item.title}</h4>
                            <p className="text-sm text-gray-400">{item.description}</p>

                            <div className="flex gap-3">
                                <button className={`${item.priority === "high" ? "bg-red-100 text-red-500" : item.priority === "medium" ? "bg-yellow-100 text-yellow-500" : "bg-green-100 text-green-500"} py-1 px-2 font-semibold rounded-md text-xs`}>{item.priority}</button>
                                <button className="border font-semibold border-gray-300 text-xs py-1 px-3 rounded-lg text-gray-600">{item.category}</button>
                            </div>
                        </div>
                    </div>
                    {/* right */}
                    <div className="flex flex-col items-end justify-between">
                        <EllipsisVertical size={18} className="text-gray-500" />
                        <div className="flex items-center gap-1">
                            <Calendar className="text-gray-500" size={15} />
                            <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}