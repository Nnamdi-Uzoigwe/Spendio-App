import { ArrowDownLeft, ArrowUpRight, Dot } from "lucide-react"

export default function RecentTransactions() {
    const transactionData = [
        {
            id: 1,
            description: "Grocery Shopping",
            category: "Food & Dining",
            isExpense: true,
            amount: "₦12,000.00",
            date: "Today",
            time: "2:30PM"
        },
        {
            id: 2,
            description: "Freelance Payment",
            category: "Income",
            amount: "₦5,000.00",
            isExpense: false,
            date: "Yesterday",
            time: "10:15AM"
        },
        {
            id: 3,
            description: "Netflix Subscription",
            category: "Entertainment",
            amount: "₦2,500.00",
            isExpense: true,
            date: "Sep 8",
            time: "6:00PM"
        },
        {
            id: 4,
            description: "Gas Station",
            category: "Transportation",
            amount: "₦7,000.00",
            isExpense: true,
            date: "Sep 7",
            time: "8:45AM"
        },
    ]
    return (
        <div>
            <div className="flex justify-between">
                <h5>Recent Transactions</h5>
                <button>See All</button>
            </div>

            {/* Transactions */}
            <div className="mt-4 border border-gray-200 overflow-hidden rounded-[20px]">
                {transactionData.map((item) => (
                    <div key={item.id} className="flex justify-between border border-gray-200 p-4">
                        {/* left */}
                        <div className="flex gap-3 items-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${item.isExpense ? "bg-red-100" : "bg-green-100"}`}>
                                {item.isExpense ? <ArrowUpRight className="text-red-600" /> : <ArrowDownLeft className="text-green-600" />}
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-semibold">{item.description}</h4>
                                <p className="text-sm">{item.category}</p>
                            </div>
                        </div>
                        {/* right */}
                        <div className="flex flex-col items-end">
                            <p className="font-semibold">{item.amount}</p>
                            <div className="text-sm flex">
                                <p>{item.date}</p>
                                <Dot /> 
                                <p>{item.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}