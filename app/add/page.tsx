"use client"

import AddExpense from "@/components/add/AddExpense";
import AddIncome from "@/components/add/AddIncome";
import AddTask from "@/components/add/AddTask";
import ScanBill from "@/components/add/ScanBill";
import { ArrowLeft, Minus, Plus, ScanLine, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Add() {
    const [activeTab, setActiveTab] = useState("Expense")
    return (
        <div className="px-6 py-10 mb-30 lg:px-40">
            <header className="flex items-center gap-2">
                <Link href="/">
                    <ArrowLeft />
                </Link>
                <h4 className="font-semibold text-lg">Add New</h4>
            </header>

            {/* Tabs */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-3">
                {/* Expense */}
                <div onClick={() => setActiveTab("Expense")} className={`${activeTab === "Expense" ? "bg-black text-white" : "bg-transparent text-black" } border border-gray-300 hover:bg-gray-200 cursor-pointer rounded-md flex flex-col items-center p-3 w-full`}>
                    <Minus className={`${activeTab === "Expense" ? "text-white" : "text-black"}`} />
                    <span className={`${activeTab === "Expense" ? "text-white" : "text-black"} font-semibold`}>Expense</span>
                </div>
                {/* Income */}
                <div onClick={() => setActiveTab("Income")} className={`${activeTab === "Income" ? "bg-black text-white" : "bg-transparent text-black" } border border-gray-300 hover:bg-gray-200 cursor-pointer rounded-md flex flex-col items-center p-3 w-full`}>
                    <Plus className={`${activeTab === "Income" ? "text-white" : "text-black"}`} />
                    <span className={`${activeTab === "Income" ? "text-white" : "text-black"} font-semibold`}>Income</span>
                </div>
                {/* Scan Bill */}
                <div onClick={() => setActiveTab("Scan")} className={`${activeTab === "Scan" ? "bg-black text-white" : "bg-transparent text-black" } border border-gray-300 hover:bg-gray-200 cursor-pointer rounded-md flex flex-col items-center p-3 w-full`}>
                    <ScanLine className={`${activeTab === "Scan" ? "text-white" : "text-black"}`} />
                    <span className={`${activeTab === "Scan" ? "text-white" : "text-black"} font-semibold`}>Scan Bill</span>
                </div>
                {/* Task */}
                <div onClick={() => setActiveTab("Task")} className={`${activeTab === "Task" ? "bg-black text-white" : "bg-transparent text-black"} border border-gray-300 hover:bg-gray-200 cursor-pointer rounded-md flex flex-col items-center p-3 w-full`}>
                    <SquareCheckBig className={`${activeTab === "Task" ? "text-white" : "text-black"}`} />
                    <span className={`${activeTab === "Task" ? "text-white" : "text-black"} font-semibold`}>Task</span>
                </div>
            </div>

            <section className="mt-10">
                {activeTab === "Expense" && <AddExpense />}
                {activeTab === "Income" && <AddIncome />}
                {activeTab === "Scan" && <ScanBill />}
                {activeTab === "Task" && <AddTask />}
            </section>
        </div>
    )
}