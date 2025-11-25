"use client"

import AllTasks from "@/components/tasks/AllTasks";
import CompletedTasks from "@/components/tasks/CompletedTasks";
import HeaderCard from "@/components/tasks/HeaderCard";
import PendingTasks from "@/components/tasks/PendingTasks";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export default function Tasks() {
    const [activeTab, setActiveTab] = useState("Pending");
    const taskStats = [
        {
            id: 1,
            figure: 1,
            title: "Completed"
        },
        {
            id: 2,
            figure: 4,
            title: "Pending"
        },
        {
            id: 3,
            figure: 4,
            title: "Overdue"
        }
    ]
    return (
        <div className="">
            {/* Head */}
            <section className="border-b border-gray-300 w-full px-4 lg:px-40 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Tasks</h4>
                    <button className="bg-black flex gap-1 items-center text-white p-2 text-sm rounded-md">
                        <Plus size={16} />
                        Add Task
                    </button>
                </div>
                {/* Search */}
                <div className="relative">
                    <input 
                        type="text"
                        className="bg-gray-100 pl-10 p-2 rounded-lg w-full"
                        placeholder="Search tasks..."
                     />
                     <Search className="absolute top-2 text-gray-400 left-2" />
                </div>
            </section>

            {/* Stats */}
            <section className="mt-10 grid grid-cols-3 gap-2 px-4 lg:px-40">
                {taskStats.map((item) => (
                    <HeaderCard  
                        key={item.id}
                        title={item.title}
                        figure={item.figure}
                    />
                ))}
            </section>
            {/* Tab navigation */}
            <div className="mt-10 px-4 lg:px-40">
                <div className="bg-gray-200 grid p-1 grid-cols-3 gap-1 rounded-[40px] overflow-hidden">
                    <div onClick={() => setActiveTab("Pending")} className={`${activeTab === "Pending" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-sm font-semibold`}>Pending (1)</div>
                    <div onClick={() => setActiveTab("Completed")} className={`${activeTab === "Completed" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-sm font-semibold`}>Completed (4)</div>
                    <div onClick={() => setActiveTab("All")} className={`${activeTab === "All" ? "bg-white" : "bg-transparent"} cursor-pointer w-full text-center rounded-[40px] text-sm font-semibold`}>All (5)</div>
                </div>
            </div>


            <div className="mt-10 px-4 lg:px-40">
                {activeTab === "Pending" && <PendingTasks />}
                {activeTab === "Completed" && <CompletedTasks />}
                {activeTab === "All" && <AllTasks />}
            </div>
        </div>
    )
}