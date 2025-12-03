// import BudgetProgress from "./BudgetProgress"
// import IncomeVsExpensesChart from "./IncomeVsExpensesChart"

// export default function BudgetOverview() {
//     const budgetPrgressData = [
//         {
//             id: 1,
//             categoryName: "Food & Dining",
//             amountUsed: 18500,
//             limit: 20000
//         },
//         {
//             id: 2,
//             categoryName: "Transportation",
//             amountUsed: 42000,
//             limit: 60000
//         },
//         {
//             id: 3,
//             categoryName: "Shopping",
//             amountUsed: 90000,
//             limit: 200000
//         },
//         {
//             id: 4,
//             categoryName: "Entertainment",
//             amountUsed: 15000,
//             limit: 30000
//         }
//     ]
//     return (
//         <div className="mb-20">
            
//         <div className="mt-10 border p-4 mb-10 border-gray-300 rounded-lg">
//             Budget Overview

//             <div className="mt-4 flex flex-col gap-2">
//                 {budgetPrgressData.map((item) => (
//                     <BudgetProgress 
//                         key={item.id}
//                         categoryName={item.categoryName}
//                         amountUsed={item.amountUsed}
//                         threshold={item.limit}
//                     />
//                 ))}
//             </div>

//         </div>
//             <IncomeVsExpensesChart />
//         </div>
//     )
// }


"use client"

import BudgetProgress from "./BudgetProgress"
import IncomeVsExpensesChart from "./IncomeVsExpensesChart"
import { useFinanceStore } from "@/store/financeStore"
import { useEffect } from "react"

interface BudgetProgressData {
    id: number;
    categoryName: string;
    amountUsed: number;
    limit: number;
}

export default function BudgetOverview() {
    const { 
        categoryBreakdown, 
        fetchCategoryBreakdown,
        monthlyTrends,
        fetchMonthlyTrends 
    } = useFinanceStore();

    useEffect(() => {
        fetchCategoryBreakdown();
        fetchMonthlyTrends(6); // Get last 6 months
    }, [fetchCategoryBreakdown, fetchMonthlyTrends]);

    // Transform category breakdown for budget progress
    // Using a heuristic: budget limit is 1.5x current spending
    // TODO: Create a budgets endpoint to store actual budget limits per category
    const budgetProgressData: BudgetProgressData[] = categoryBreakdown.slice(0, 5).map((cat, index) => ({
        id: index + 1,
        categoryName: cat.category,
        amountUsed: cat.amount,
        // For now using a simple heuristic: limit is 1.5x current spending
        // This ensures the progress bar shows meaningful data
        limit: Math.ceil(cat.amount * 1.5)
    }));

    return (
        <div className="mb-20">
            <div className="mt-10 border p-4 mb-10 border-gray-300 rounded-lg">
                <h3 className="text-lg text-gray-700 font-semibold mb-4">Budget Overview</h3>

                {budgetProgressData.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No expense data available. Start adding expenses to see your budget overview.
                    </p>
                ) : (
                    <div className="mt-4 flex flex-col gap-2">
                        {budgetProgressData.map((item) => (
                            <BudgetProgress 
                                key={item.id}
                                categoryName={item.categoryName}
                                amountUsed={item.amountUsed}
                                threshold={item.limit}
                            />
                        ))}
                    </div>
                )}

                {budgetProgressData.length > 0 && (
                    <p className="text-xs text-gray-500 mt-4 text-center">
                        💡 Budget limits are calculated as 1.5× current spending
                    </p>
                )}
            </div>
            
            <IncomeVsExpensesChart />
        </div>
    )
}