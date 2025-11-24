import { Eye, TrendingUp } from "lucide-react";

export default function ExpenseBoard() {
    return (
        <div className="bg-black text-white rounded-[20px] p-6 w-full">
            {/* flex */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div>
                        <p className="text-gray-300">Current Balance</p>
                        <h3 className="font-semibold text-2xl">₦47,000.00</h3>
                    </div>
                    <span>
                        <Eye size={19} className="text-gray-300 cursor-pointer" />
                    </span>
                </div>

                {/* Trends */}
                <div>
                    <span><TrendingUp size={15} className="text-gray-300" /></span>
                    <p className="font-semibold">+ 12.5%</p>
                </div>
            </div>
            {/* grid */}
            <div className="mt-10 grid grid-cols-2">
                <div>
                    <p className="text-gray-300 text-sm">This month income</p>
                    <h3 className="font-semibold text-lg">₦97,000.00</h3>
                </div>
                <div>
                    <p className="text-gray-300 text-sm">This month expenses</p>
                    <h3 className="font-semibold text-lg">₦47,000.00</h3>
                </div>
            </div>
        </div>
    )
}