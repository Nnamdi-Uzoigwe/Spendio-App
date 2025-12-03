import { Minus, Plus, ScanLine, SquareCheckBig } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
    return (
        <div>
            <h5>Quick Actions</h5>
            <div className="mt-6 grid grid-cols-2 gap-4">
                {/* Add Income */}
                <Link href="/dashboard/add/addIncome" className="border border-gray-300 lg:active:opacity-0 rounded-lg p-3">   
                    <div className="bg-green-100 cursor-pointer hover:bg-green-200 p-4 rounded-lg flex flex-col items-center">
                        <Plus className="text-green-600"/>
                        <p className="text-green-600 font-semibold">Add Income</p>
                    </div>
                </Link>
                {/* Add Expense */}
                <Link  href="/dashboard/add/addExpense" className="border border-gray-300 lg:active:opacity-0 rounded-lg p-3">
                    <div className="bg-red-100 hover:bg-red-200 cursor-pointer p-4 rounded-lg flex flex-col items-center">
                        <Minus className="text-red-600" />
                        <p className="text-red-600 font-semibold">Add Expense</p>
                    </div>
                </Link>
                {/* Scan Bill */}
                <Link  href="/dashboard/add/scanBill" className="border border-gray-300 lg:active:opacity-0 rounded-lg p-3">
                    <div className="bg-blue-100 hover:bg-blue-300 p-4 cursor-pointer rounded-lg flex flex-col items-center">
                        <ScanLine className="text-blue-600" />
                        <p className="text-blue-600 font-semibold">Scan Bill</p>
                    </div>
                </Link>
                {/* Add Task */}
                <Link  href="/dashboard/add/addTask" className="border border-gray-300 lg:active:opacity-0 rounded-lg p-3">
                    <div className="bg-purple-100 hover:bg-purple-300 cursor-pointer p-4 rounded-lg flex flex-col items-center">
                        <SquareCheckBig className="text-purple-600" />
                        <p className="text-purple-600 font-semibold">Add Task</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}