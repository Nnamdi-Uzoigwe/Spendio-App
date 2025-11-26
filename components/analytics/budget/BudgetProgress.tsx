// interface BudgetProgressProps {
//     categoryName: string,
//     amountUsed: number,
//     threshold: number 
// }

// export default function BudgetProgress({categoryName, amountUsed, threshold}: BudgetProgressProps) {
//     const width = (amountUsed / threshold) * 100;
//     return (
//         <div>
//             <div className="flex justify-between items-center">
//                 <p>{categoryName}</p>
//                 <p>₦{amountUsed} / ₦{threshold}</p>
//             </div>
//             <div className="bg-gray-400 rounded-2xl overflow-hidden h-4 w-full" >
//                 <div className="bg-black h-4" style={{ width: width}}>

//                 </div>
//             </div>
//         </div>
//     )
// }


interface BudgetProgressProps {
    categoryName: string,
    amountUsed: number,
    threshold: number 
}

export default function BudgetProgress({categoryName, amountUsed, threshold}: BudgetProgressProps) {
    const width = (amountUsed / threshold) * 100;

    return (
        <div>
            <div className="flex text-sm mb-1 justify-between items-center">
                <p>{categoryName}</p>
                <p>₦{amountUsed} / ₦{threshold}</p>
            </div>

            <div className="bg-gray-400 rounded-2xl overflow-hidden h-4 w-full">
                <div
                    className="bg-black h-4"
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    )
}
