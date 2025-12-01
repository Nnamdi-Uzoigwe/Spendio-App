// "use client"

// import { Eye, EyeOff, TrendingUp } from "lucide-react";
// import { useState } from "react";

// export default function ExpenseBoard() {
//     const [showValues, setShowValues] = useState(false)
//     return (
//         <div className="bg-black text-white rounded-[20px] p-6 w-full">
//             {/* flex */}
//             <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                     <div>
//                         <p className="text-gray-300">Current Balance</p>
//                         <h3 className="font-semibold text-2xl">{showValues ? "₦50,000.00" : "*****"}</h3>
//                     </div>
//                     <div onClick={() => setShowValues(!showValues)}>
//                         {showValues ? <Eye size={19} className="text-gray-300 cursor-pointer" /> : <EyeOff size={19} className="text-gray-300 cursor-pointer" />}
//                     </div>
//                 </div>

//                 {/* Trends */}
//                 <div>
//                     <span><TrendingUp size={15} className="text-gray-300" /></span>
//                     <p className="font-semibold">+ 12.5%</p>
//                 </div>
//             </div>
//             {/* grid */}
//             <div className="mt-10 grid grid-cols-2">
//                 <div>
//                     <p className="text-gray-300 text-sm">This month income</p>
//                     <h3 className="font-semibold text-lg">{showValues ? "₦97,000.00" : "*****"}</h3>
//                 </div>
//                 <div>
//                     <p className="text-gray-300 text-sm">This month expenses</p>
//                     <h3 className="font-semibold text-lg">{showValues ? "₦47,000.00" : "*****"}</h3>
//                 </div>
//             </div>
//         </div>
//     )
// }


// "use client";

// import { Eye, EyeOff, TrendingUp } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useFinanceStore } from "@/store/financeStore";

// export default function ExpenseBoard() {
//   const [showValues, setShowValues] = useState(false);

//   const { income, expenses, balance, loading, fetchMonthlyFinance } =
//     useFinanceStore();

//   useEffect(() => {
//     fetchMonthlyFinance();
//   }, []);

//   return (
//     <div className="bg-black text-white rounded-[20px] p-6 w-full">
//       {loading && <p className="text-gray-300 mb-4">Loading...</p>}

//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div>
//             <p className="text-gray-300">Current Balance</p>
//             <h3 className="font-semibold text-2xl">
//               {showValues ? `₦${balance.toLocaleString()}` : "*****"}
//             </h3>
//           </div>
//           <div onClick={() => setShowValues(!showValues)}>
//             {showValues ? (
//               <Eye size={19} className="text-gray-300 cursor-pointer" />
//             ) : (
//               <EyeOff size={19} className="text-gray-300 cursor-pointer" />
//             )}
//           </div>
//         </div>

//         <div>
//           <TrendingUp size={15} className="text-gray-300" />
//           <p className="font-semibold">+ 12.5%</p>
//         </div>
//       </div>

//       <div className="mt-10 grid grid-cols-2">
//         <div>
//           <p className="text-gray-300 text-sm">This month income</p>
//           <h3 className="font-semibold text-lg">
//             {showValues ? `₦${income.toLocaleString()}` : "*****"}
//           </h3>
//         </div>

//         <div>
//           <p className="text-gray-300 text-sm">This month expenses</p>
//           <h3 className="font-semibold text-lg">
//             {showValues ? `₦${expenses.toLocaleString()}` : "*****"}
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useFinanceStore } from "@/store/financeStore";

export default function ExpenseBoard() {
  const [showValues, setShowValues] = useState(false);

  const { income, expenses, balance, loading, fetchMonthlyFinance } =
    useFinanceStore();

  useEffect(() => {
    fetchMonthlyFinance();
  }, [fetchMonthlyFinance]); // Added fetchMonthlyFinance to dependency array

  return (
    <div className="bg-black text-white rounded-[20px] p-3 lg:p-6 w-full">

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-gray-300">Current Balance</p>
            <h3 className="font-semibold text-2xl">
              {showValues ? `₦${balance.toLocaleString()}` : "*****"}
            </h3>
          </div>
          <div onClick={() => setShowValues(!showValues)}>
            {showValues ? (
              <Eye size={19} className="text-gray-300 cursor-pointer" />
            ) : (
              <EyeOff size={19} className="text-gray-300 cursor-pointer" />
            )}
          </div>
        </div>

        <div>
          <TrendingUp size={15} className="text-gray-300" />
          <p className="font-semibold">+ 12.5%</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2">
        <div>
          <p className="text-gray-300 text-sm">This month income</p>
          <h3 className="font-semibold text-lg">
            {showValues ? `₦${income.toLocaleString()}` : "*****"}
          </h3>
        </div>

        <div>
          <p className="text-gray-300 text-sm">This month expenses</p>
          <h3 className="font-semibold text-lg">
            {showValues ? `₦${expenses.toLocaleString()}` : "*****"}
          </h3>
        </div>
      </div>
    </div>
  );
}