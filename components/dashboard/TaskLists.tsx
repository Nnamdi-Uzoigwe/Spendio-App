import { Clock4 } from "lucide-react";

export default function TaskLists() {
  const taskList = [
    {
      id: 1,
      isCompleted: false,
      taskName: "Review monthly budget",
      priority: "high",
      deadline: "Today",
    },
    {
      id: 2,
      isCompleted: true,
      taskName: "Submit expense reports",
      priority: "medium",
      deadline: "Yesterday",
    },
    {
      id: 3,
      isCompleted: false,
      taskName: "Plan next week's expenses",
      priority: "low",
      deadline: "Tomorrow",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h5>Tasks</h5>
          <p className="text-sm">2 pending tasks</p>
        </div>

        <div>
          <p>See All</p>
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-4 border border-gray-200 overflow-hidden rounded-[20px]">
        {taskList.map((item) => (
          <div key={item.id} className="flex gap-3 items-center border border-gray-200 p-4">
            <input type="checkbox" defaultChecked={item.isCompleted} />
            <div>
              <h5 className={`mb-2 ${item.isCompleted ? "line-through" : " decoration-0"}`}>{item.taskName}</h5>
              <div className="flex items-center gap-2">
                <div
                  className={`w-fit p-2 rounded-xl text-xs font-semibold ${
                    item.priority === "high"
                      ? "bg-red-200 text-red-600"
                      : item.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.priority}
                </div>
                <div className="flex">
                  <Clock4 size={15} />
                  <span className="ml-1 text-xs">{item.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
