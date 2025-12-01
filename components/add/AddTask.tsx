"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddTask() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: new Date().toISOString().split("T")[0], // Today's date
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.priority ||
      !formData.dueDate
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          dueDate: formData.dueDate,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add Task");
      }

      setSuccess("Task added successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        priority: "Low",
        dueDate: new Date().toISOString().split("T")[0],
      });

      // Optional: Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      console.error("Error adding task:", err);
      setError(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <h2 className="mb-4 font-semibold text-xl"> Add Task page</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-4">
          {success}
        </div>
      )}

      {/* form */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {/* Amount */}
        <div className="relative">
          <p className="font-semibold mb-2">Task Title</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border-2 border-gray-300 w-full p-2 text-lg rounded-md"
            placeholder="What needs to be done?"
            required
          />
        </div>

        {/* Description */}
        <div>
          <p className="font-semibold mb-2">Description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-2 border-gray-300 w-full p-2 text-lg rounded-md"
            placeholder="Add more details..."
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <p className="font-semibold mb-2">Priority</p>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border-2 border-gray-300 w-full p-2 text-lg rounded-md"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <p className="font-semibold mb-2">Due Date</p>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="border-2 border-gray-300 w-full p-2 text-lg rounded-md focus:border-indigo-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md cursor-pointer p-2 w-full bg-black text-white"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
