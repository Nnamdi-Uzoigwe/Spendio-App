// import { ArrowDownLeft, ArrowUpRight, Dot } from "lucide-react"

// export default function RecentTransactions() {
//     const transactionData = [
//         {
//             id: 1,
//             description: "Grocery Shopping",
//             category: "Food & Dining",
//             isExpense: true,
//             amount: "₦12,000.00",
//             date: "Today",
//             time: "2:30PM"
//         },
//         {
//             id: 2,
//             description: "Freelance Payment",
//             category: "Income",
//             amount: "₦5,000.00",
//             isExpense: false,
//             date: "Yesterday",
//             time: "10:15AM"
//         },
//         {
//             id: 3,
//             description: "Netflix Subscription",
//             category: "Entertainment",
//             amount: "₦2,500.00",
//             isExpense: true,
//             date: "Sep 8",
//             time: "6:00PM"
//         },
//         {
//             id: 4,
//             description: "Gas Station",
//             category: "Transportation",
//             amount: "₦7,000.00",
//             isExpense: true,
//             date: "Sep 7",
//             time: "8:45AM"
//         },
//     ]
//     return (
//         <div>
//             <div className="flex justify-between">
//                 <h5>Recent Transactions</h5>
//                 <button>See All</button>
//             </div>

//             {/* Transactions */}
//             <div className="mt-4 border border-gray-200 overflow-hidden rounded-[20px]">
//                 {transactionData.map((item) => (
//                     <div key={item.id} className="flex justify-between border border-gray-200 p-4">
//                         {/* left */}
//                         <div className="flex gap-3 items-center">
//                             <div className={`h-10 w-10 rounded-full flex items-center justify-center ${item.isExpense ? "bg-red-100" : "bg-green-100"}`}>
//                                 {item.isExpense ? <ArrowUpRight className="text-red-600" /> : <ArrowDownLeft className="text-green-600" />}
//                             </div>
//                             <div className="flex flex-col">
//                                 <h4 className="font-semibold">{item.description}</h4>
//                                 <p className="text-sm">{item.category}</p>
//                             </div>
//                         </div>
//                         {/* right */}
//                         <div className="flex flex-col items-end">
//                             <p className="font-semibold">{item.amount}</p>
//                             <div className="text-sm flex">
//                                 <p>{item.date}</p>
//                                 <Dot /> 
//                                 <p>{item.time}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }



// "use client";

// import { ArrowDownLeft, ArrowUpRight, Dot } from "lucide-react";
// import { useFinanceStore } from "@/store/financeStore";

// export default function RecentTransactions() {
//   // Get latest 5 transactions from the store
//   const latestTransactions = useFinanceStore((state) => state.latestTransactions());

//   if (!latestTransactions.length) {
//     return (
//       <div className="p-4 border border-gray-200 rounded-[20px]">
//         <h5 className="mb-4 font-semibold text-lg">Recent Transactions</h5>
//         <p className="text-gray-500">No transactions yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h5 className="font-semibold text-lg">Recent Transactions</h5>
//         <button className="text-sm text-indigo-600 hover:underline">See All</button>
//       </div>

//       <div className="border border-gray-200 overflow-hidden rounded-[20px]">
//         {latestTransactions.map((item) => (
//           <div key={item.id} className="flex justify-between border-b border-gray-200 p-4 last:border-b-0">
//             {/* left */}
//             <div className="flex gap-3 items-center">
//               <div
//                 className={`h-10 w-10 rounded-full flex items-center justify-center ${
//                   item.isExpense ? "bg-red-100" : "bg-green-100"
//                 }`}
//               >
//                 {item.isExpense ? (
//                   <ArrowUpRight className="text-red-600" />
//                 ) : (
//                   <ArrowDownLeft className="text-green-600" />
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <h4 className="font-semibold">{item.description}</h4>
//                 <p className="text-sm text-gray-500">{item.category}</p>
//               </div>
//             </div>

//             {/* right */}
//             <div className="flex flex-col items-end">
//               <p className="font-semibold">₦{item.amount.toLocaleString()}</p>
//               <div className="text-sm flex items-center gap-1">
//                 <p>{new Date(item.date).toLocaleDateString()}</p>
//                 <Dot className="w-2 h-2" />
//                 <p>{new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { ArrowDownLeft, ArrowUpRight, Dot } from "lucide-react";
// import { useFinanceStore } from "@/store/financeStore";

// export default function RecentTransactions() {
//   // Always read store inside component function
//   const latestTransactions = useFinanceStore((state) => state.latestTransactions());

//   if (!latestTransactions.length) {
//     return (
//       <div className="p-4 border border-gray-200 rounded-[20px]">
//         <h5 className="mb-4 font-semibold text-lg">Recent Transactions</h5>
//         <p className="text-gray-500">No transactions yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h5 className="font-semibold text-lg">Recent Transactions</h5>
//         <button className="text-sm text-indigo-600 hover:underline">See All</button>
//       </div>

//       <div className="border border-gray-200 overflow-hidden rounded-[20px]">
//         {latestTransactions.map((item) => (
//           <div key={item.id} className="flex justify-between border-b border-gray-200 p-4 last:border-b-0">
//             {/* left */}
//             <div className="flex gap-3 items-center">
//               <div
//                 className={`h-10 w-10 rounded-full flex items-center justify-center ${
//                   item.isExpense ? "bg-red-100" : "bg-green-100"
//                 }`}
//               >
//                 {item.isExpense ? (
//                   <ArrowUpRight className="text-red-600" />
//                 ) : (
//                   <ArrowDownLeft className="text-green-600" />
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <h4 className="font-semibold">{item.description}</h4>
//                 <p className="text-sm text-gray-500">{item.category}</p>
//               </div>
//             </div>

//             {/* right */}
//             <div className="flex flex-col items-end">
//               <p className="font-semibold">₦{item.amount.toLocaleString()}</p>
//               <div className="text-sm flex items-center gap-1">
//                 <p>{new Date(item.date).toLocaleDateString()}</p>
//                 <Dot className="w-2 h-2" />
//                 <p>{new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import { ArrowDownLeft, ArrowUpRight, Dot } from "lucide-react";
import { useFinanceStore } from "@/store/financeStore";

export default function RecentTransactions() {
  const recentTransactions = useFinanceStore((state) => state.recentTransactions);
  const fetchRecentTransactions = useFinanceStore((state) => state.fetchRecentTransactions);

  useEffect(() => {
    fetchRecentTransactions();
  }, [fetchRecentTransactions]);

  if (!recentTransactions.length) {
    return (
      <div className="p-4 border border-gray-200 rounded-[20px]">
        <h5 className="mb-4 font-semibold text-lg">Recent Transactions</h5>
        <p className="text-gray-500">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h5 className="font-semibold text-lg">Recent Transactions</h5>
        <button className="text-sm text-indigo-600 hover:underline">See All</button>
      </div>

      <div className="border border-gray-200 overflow-hidden rounded-[20px]">
        {recentTransactions.map((item) => (
          <div key={item.id} className="flex justify-between border-b border-gray-200 p-3 lg:p-4 last:border-b-0">
            {/* left */}
            <div className="flex gap-3 items-center">
              <div
                className={`h-8 lg:h-10 w-8 lg:w-10 rounded-full flex items-center justify-center ${
                  item.isExpense ? "bg-red-100" : "bg-green-100"
                }`}
              >
                {item.isExpense ? (
                  <ArrowUpRight size={19} className="text-red-600" />
                ) : (
                  <ArrowDownLeft size={19} className="text-green-600" />
                )}
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm lg:text-md font-semibold">{item.description}</h4>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
            </div>

            {/* right */}
            <div className="flex flex-col items-end">
              <p className="font-semibold">₦{item.amount.toLocaleString()}</p>
              <div className="text-sm flex flex-wrap justify-end items-center gap-1">
                <p>{new Date(item.date).toLocaleDateString()}</p>
                <Dot className="hidden lg:block w-2 h-2" />
                <p>{new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}