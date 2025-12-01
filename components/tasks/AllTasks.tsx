"use client";

import { Task, useTaskStore } from "@/store/taskStore";
import { Calendar, EllipsisVertical } from "lucide-react";

interface AllTasksProps {
  tasks: Task[];
}

export default function AllTasks({ tasks }: AllTasksProps) {
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tasks yet. Create your first task! ✨
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mb-20">
      {tasks.map((item) => (
        <div
          key={item._id}
          className="border border-gray-200 rounded-lg p-4 flex justify-between"
        >
          {/* left */}
          <div className="flex gap-2 items-start">
            <div>
              <input
                type="checkbox"
                checked={item.status === "completed"}
                onChange={() => toggleTaskStatus(item._id, item.status)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4
                className={`text-md font-semibold ${
                  item.status === "completed" && "line-through"
                }`}
              >
                {item.title}
              </h4>
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
            <div className="flex items-center gap-1">
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