// "use client"

// import { Calendar, EllipsisVertical } from "lucide-react"

// export default function PendingTasks() {
//     const pendingData = [
//         {
//             id: 1,
//             title: "Review monthly budget",
//             description: "Analyze spending patterns and adjust budget categories",
//             priority: "high",
//             category: "Finance",
//             date: "Sep 10"
//         },
//         {
//             id: 2,
//             title: "Plan next week's expenses",
//             description: "Create shopping list and meal plan",
//             priority: "low",
//             category: "Personal",
//             date: "Sep 11"
//         },
//         {
//             id: 3,
//             title: "Update investment portfolio",
//             description: "Review and rebalance investment allocations",
//             priority: "medium",
//             category: "Finance",
//             date: "Sep 15"
//         },
//         {
//             id: 4,
//             title: "Pay credit card bills",
//             description: "Pay outstanding balances before due date",
//             priority: "high",
//             category: "Bills",
//             date: "Sep 12"
//         },
//     ]
//     return (
//         <div className="flex flex-col gap-4 mb-20">
//             {pendingData.map((item) => (
//                 <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex justify-between">
//                     {/* left */}
//                     <div className="flex gap-2 items-start">
//                         <div>
//                             <input type="checkbox" />
//                         </div>
//                         <div className="flex flex-col gap-2">
//                             <h4 className="text-md font-semibold">{item.title}</h4>
//                             <p className="text-sm text-gray-400">{item.description}</p>

//                             <div className="flex gap-3">
//                                 <button className={`${item.priority === "high" ? "bg-red-100 text-red-500" : item.priority === "medium" ? "bg-yellow-100 text-yellow-500" : "bg-green-100 text-green-500"} py-1 px-2 font-semibold rounded-md text-xs`}>{item.priority}</button>
//                                 <button className="border font-semibold border-gray-300 text-xs py-1 px-3 rounded-lg text-gray-600">{item.category}</button>
//                             </div>
//                         </div>
//                     </div>
//                     {/* right */}
//                     <div className="flex flex-col items-end justify-between">
//                         <EllipsisVertical size={18} className="text-gray-500" />
//                         <div className="flex items-center gap-1">
//                             <Calendar className="text-gray-500" size={15} />
//                             <p className="text-xs text-gray-500">{item.date}</p>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }


"use client";

import { Task, useTaskStore } from "@/store/taskStore";
import { Calendar, EllipsisVertical } from "lucide-react";

interface PendingTasksProps {
  tasks: Task[];
}

export default function PendingTasks({ tasks }: PendingTasksProps) {
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);

  // ✅ Add safety check
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tasks yet.
      </div>
    );
  }

  const pendingTasks = tasks.filter((task) => task.status === "pending");

  if (pendingTasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No pending tasks. Great job! 🎉
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mb-20">
      {pendingTasks.map((item) => (
        <div
          key={item._id}
          className="border border-gray-200 rounded-lg p-4 flex justify-between"
        >
          {/* left */}
          <div className="flex gap-2 items-start">
            <div>
              <input
                type="checkbox"
                checked={false}
                onChange={() => toggleTaskStatus(item._id, item.status)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-md font-semibold">{item.title}</h4>
              {item.description && (
                <p className="text-sm text-gray-400">{item.description}</p>
              )}

              <div className="flex gap-3">
                <button
                  className={`${
                    item.priority === "high"
                      ? "bg-red-100 text-red-500"
                      : item.priority === "medium"
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-green-100 text-green-500"
                  } py-1 px-2 font-semibold rounded-md text-xs`}
                >
                  {item.priority}
                </button>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col items-end justify-between">
            <EllipsisVertical size={18} className="text-gray-500" />
            <div className="flex flex-wrap items-center gap-1">
              <Calendar className="text-gray-500" size={15} />
              <p className="text-xs text-gray-500">
                {new Date(item.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}