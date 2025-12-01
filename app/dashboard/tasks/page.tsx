"use client";

import AllTasks from "@/components/tasks/AllTasks";
import CompletedTasks from "@/components/tasks/CompletedTasks";
import HeaderCard from "@/components/tasks/HeaderCard";
import PendingTasks from "@/components/tasks/PendingTasks";
import { Plus, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useTaskStore } from "@/store/taskStore";
import Link from "next/link";

export default function Tasks() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const stats = useMemo(() => {
    const completed = filteredTasks.filter(
      (t) => t.status === "completed"
    ).length;
    const pending = filteredTasks.filter((t) => t.status === "pending").length;
    const now = new Date();
    const overdue = filteredTasks.filter(
      (t) => t.status === "pending" && t.dueDate && new Date(t.dueDate) < now
    ).length;

    return { completed, pending, overdue, total: filteredTasks.length };
  }, [filteredTasks]);

  const taskStats = [
    {
      id: 1,
      figure: stats.completed,
      title: "Completed",
    },
    {
      id: 2,
      figure: stats.pending,
      title: "Pending",
    },
    {
      id: 3,
      figure: stats.overdue,
      title: "Overdue",
    },
  ];

  return (
    <div className="">
      {/* Head */}
      <section className="border-b border-gray-300 w-full px-4 lg:px-40 py-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Tasks</h4>
          <Link
            href="/dashboard/add/addTask"
            className="bg-black flex gap-1 items-center text-white p-2 text-sm rounded-md"
          >
            <Plus size={16} />
            Add Task
          </Link>
        </div>
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            className="bg-gray-100 pl-10 p-2 rounded-lg w-full"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-2 text-gray-400 left-2" />
        </div>
      </section>

      {/* Stats */}
      <section className="mt-10 grid grid-cols-3 gap-2 px-4 lg:px-40">
        {taskStats.map((item) => (
          <HeaderCard key={item.id} title={item.title} figure={item.figure} />
        ))}
      </section>

      {/* Tab navigation */}
      <div className="mt-10 px-4 lg:px-40">
        <div className="bg-gray-200 grid p-1 grid-cols-3 gap-1 rounded-[40px] overflow-hidden">
          <div
            onClick={() => setActiveTab("Pending")}
            className={`${
              activeTab === "Pending" ? "bg-white" : "bg-transparent"
            } cursor-pointer py-2 text-center rounded-[40px] text-sm font-semibold`}
          >
            Pending ({stats.pending})
          </div>
          <div
            onClick={() => setActiveTab("Completed")}
            className={`${
              activeTab === "Completed" ? "bg-white" : "bg-transparent"
            } cursor-pointer py-2 text-center rounded-[40px] text-sm font-semibold`}
          >
            Completed ({stats.completed})
          </div>
          <div
            onClick={() => setActiveTab("All")}
            className={`${
              activeTab === "All" ? "bg-white" : "bg-transparent"
            } cursor-pointer py-2 text-center rounded-[40px] text-sm font-semibold`}
          >
            All ({stats.total})
          </div>
        </div>
      </div>

      <div className="mt-4 pb-20 px-4 lg:px-40">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading tasks...
          </div>
        ) : (
          <>
            {activeTab === "Pending" && <PendingTasks tasks={filteredTasks} />}
            {activeTab === "Completed" && (
              <CompletedTasks tasks={filteredTasks} />
            )}
            {activeTab === "All" && <AllTasks tasks={filteredTasks} />}
          </>
        )}
      </div>
    </div>
  );
}
