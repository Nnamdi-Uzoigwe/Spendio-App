"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddExpense() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        category: "Food & Dining",
        date: new Date().toISOString().split('T')[0], // Today's date
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        if (!formData.amount || !formData.description || !formData.category || !formData.date) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (parseFloat(formData.amount) <= 0) {
            setError("Amount must be greater than 0");
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

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/expense`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: parseFloat(formData.amount),
                    description: formData.description,
                    category: formData.category,
                    date: formData.date,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to add expense");
            }

            setSuccess("Expense added successfully!");
            
            // Reset form
            setFormData({
                amount: "",
                description: "",
                category: "Food & Dining",
                date: new Date().toISOString().split('T')[0],
            });

            // Optional: Redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);

        } catch (err: any) {
            console.error("Error adding expense:", err);
            setError(err.message || "Failed to add expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-gray-300 rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

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
                    <p className="font-semibold mb-2">Amount</p>
                    <input 
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        // className="pl-10 border-2 border-gray-300 w-full p-2 text-lg rounded-md focus:border-indigo-500 focus:outline-none" 
                        className="pl-10 p-2 text-md lg:text-lg bg-[#d8d8d7] outline-gray-400 rounded-md w-full"
                        required
                    />
                    <span className="absolute top-10 text-md lg:text-lg left-4 text-gray-500">₦</span>
                </div>

                {/* Description */}
                <div>
                    <p className="font-semibold mb-2">Description</p>
                    <input 
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        // className="border-2 border-gray-300 w-full p-2 text-lg rounded-md focus:border-indigo-500 focus:outline-none"
                        className="p-2 text-md lg:text-lg bg-[#d8d8d7] outline-gray-400 rounded-md w-full"
                        placeholder="What was this for?" 
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <p className="font-semibold mb-2">Category</p>
                    <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        // className="border-2 border-gray-300 w-full p-2 text-lg rounded-md focus:border-indigo-500 focus:outline-none"
                        className="p-2 text-md lg:text-lg bg-[#d8d8d7] outline-gray-400 rounded-md w-full"
                        required
                    >
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Bills">Bills</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Date */}
                <div>
                    <p className="font-semibold mb-2">Date</p>
                    <input 
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]} // Can't select future dates
                        // className="border-2 border-gray-300 w-full p-2 text-lg rounded-md focus:border-indigo-500 focus:outline-none" 
                        className="p-2 text-md lg:text-lg bg-[#d8d8d7] outline-gray-400 rounded-md w-full"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="mt-2 rounded-md cursor-pointer p-2 w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                    {loading ? "Adding..." : "Add Expense"}
                </button>
            </form>
        </div>
    );
}