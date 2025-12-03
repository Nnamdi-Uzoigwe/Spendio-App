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
    categoryName: string;
    amountUsed: number;
    threshold: number;
}

export default function BudgetProgress({ categoryName, amountUsed, threshold }: BudgetProgressProps) {
    const percentage = (amountUsed / threshold) * 100;
    const width = Math.min(percentage, 100); // Cap at 100%
    
    // Determine color based on usage percentage
    const getColor = () => {
        if (percentage >= 90) return 'bg-red-500'; // Over budget or close
        if (percentage >= 70) return 'bg-yellow-500'; // Warning
        return 'bg-black'; // Good
    };

    const getBgColor = () => {
        if (percentage >= 90) return 'bg-red-100';
        if (percentage >= 70) return 'bg-yellow-100';
        return 'bg-gray-200';
    };

    return (
        <div>
            <div className="flex text-sm mb-1 justify-between items-center">
                <p className="font-medium">{categoryName}</p>
                <p className="text-gray-600 text-xs lg:text-sm">
                    ₦{amountUsed.toLocaleString()} / ₦{threshold.toLocaleString()}
                    <span className={`ml-2 text-xs ${
                        percentage >= 90 ? 'text-red-600' : 
                        percentage >= 70 ? 'text-yellow-600' : 
                        'text-green-600'
                    }`}>
                        ({percentage.toFixed(0)}%)
                    </span>
                </p>
            </div>
            <div className={`${getBgColor()} rounded-2xl overflow-hidden h-4 w-full transition-colors`}>
                <div
                    className={`${getColor()} h-4 transition-all duration-500 ease-out`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}