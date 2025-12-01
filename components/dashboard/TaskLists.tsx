// import { Clock4 } from "lucide-react";

// export default function TaskLists() {
//   const taskList = [
//     {
//       id: 1,
//       isCompleted: false,
//       taskName: "Review monthly budget",
//       priority: "high",
//       deadline: "Today",
//     },
//     {
//       id: 2,
//       isCompleted: true,
//       taskName: "Submit expense reports",
//       priority: "medium",
//       deadline: "Yesterday",
//     },
//     {
//       id: 3,
//       isCompleted: false,
//       taskName: "Plan next week's expenses",
//       priority: "low",
//       deadline: "Tomorrow",
//     },
//   ];
//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <div>
//           <h5>Tasks</h5>
//           <p className="text-sm">2 pending tasks</p>
//         </div>

//         <div>
//           <p>See All</p>
//         </div>
//       </div>

//       {/* Transactions */}
//       <div className="mt-4 border border-gray-200 overflow-hidden rounded-[20px]">
//         {taskList.map((item) => (
//           <div key={item.id} className="flex gap-3 items-center border border-gray-200 p-3 lg:p-4">
//             <input type="checkbox" defaultChecked={item.isCompleted} />
//             <div>
//               <h5 className={`mb-2 ${item.isCompleted ? "line-through" : " decoration-0"}`}>{item.taskName}</h5>
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-fit p-2 rounded-xl text-xs font-semibold ${
//                     item.priority === "high"
//                       ? "bg-red-200 text-red-600"
//                       : item.priority === "medium"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : "bg-green-100 text-green-600"
//                   }`}
//                 >
//                   {item.priority}
//                 </div>
//                 <div className="flex">
//                   <Clock4 size={15} />
//                   <span className="ml-1 text-xs">{item.deadline}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useTaskStore } from "@/store/taskStore";
import { Clock4 } from "lucide-react";
import { useEffect } from "react";

export default function TaskLists() {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Get recent 5 tasks, sorted by date
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Count pending tasks
  const pendingCount = tasks.filter((t) => t.status === "pending").length;

  // Format deadline (relative to today)
  const formatDeadline = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time for comparison
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    if (due.getTime() === today.getTime()) return "Today";
    if (due.getTime() === tomorrow.getTime()) return "Tomorrow";
    if (due.getTime() === yesterday.getTime()) return "Yesterday";

    // Calculate days difference
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `In ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    if (diffDays < 0) return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
    
    return new Date(dueDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (recentTasks.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h5 className="font-semibold">Tasks</h5>
            <p className="text-sm text-gray-500">No tasks yet</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-[20px] p-8 text-center text-gray-500">
          <p>Create your first task to get started! ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h5 className="font-semibold">Tasks</h5>
          <p className="text-sm text-gray-500">{pendingCount} pending task{pendingCount !== 1 ? "s" : ""}</p>
        </div>

        <div>
          <a href="/dashboard/tasks" className="text-sm text-indigo-600 hover:underline">
            See All
          </a>
        </div>
      </div>

      {/* Tasks */}
      <div className="border border-gray-200 overflow-hidden rounded-[20px]">
        {recentTasks.map((item) => (
          <div
            key={item._id}
            className="flex gap-3 items-center border-b border-gray-200 p-3 lg:p-4 last:border-b-0"
          >
            <input
              type="checkbox"
              checked={item.status === "completed"}
              onChange={() => toggleTaskStatus(item._id, item.status)}
              className="cursor-pointer"
            />
            <div className="flex-1">
              <h5
                className={`mb-2 font-medium ${
                  item.status === "completed" ? "line-through text-gray-500" : ""
                }`}
              >
                {item.title}
              </h5>
              <div className="flex items-center gap-2">
                <div
                  className={`w-fit px-2 py-1 rounded-lg text-xs font-semibold ${
                    item.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : item.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.priority}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock4 size={15} />
                  <span className="ml-1 text-xs">{formatDeadline(item.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}