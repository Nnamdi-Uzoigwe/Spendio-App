import BudgetProgress from "./BudgetProgress"

export default function BudgetOverview() {
    const budgetPrgressData = [
        {
            id: 1,
            categoryName: "Food & Dining",
            amountUsed: 18500,
            limit: 20000
        },
        {
            id: 2,
            categoryName: "Transportation",
            amountUsed: 42000,
            limit: 60000
        },
        {
            id: 3,
            categoryName: "Shopping",
            amountUsed: 90000,
            limit: 200000
        },
        {
            id: 4,
            categoryName: "Entertainment",
            amountUsed: 15000,
            limit: 30000
        }
    ]
    return (
        <div className="mt-10 border p-4 mb-20 border-gray-300 rounded-lg">
            Budget Overview

            <div className="mt-4 flex flex-col gap-2">
                {budgetPrgressData.map((item) => (
                    <BudgetProgress 
                        key={item.id}
                        categoryName={item.categoryName}
                        amountUsed={item.amountUsed}
                        threshold={item.limit}
                    />
                ))}
            </div>

        </div>
    )
}