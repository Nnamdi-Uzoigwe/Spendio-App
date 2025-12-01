"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess(""); // Add this state at the top: const [success, setSuccess] = useState("");

  try {
    const endpoint = isLogin 
      ? `${API_URL}/api/auth/login` 
      : `${API_URL}/api/auth/login`;
      
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const response = await res.json();

    if (!res.ok) {
      setError(response.message || "Something went wrong");
    } else {
      if (isLogin) {
        // Login successful - save token and redirect to dashboard
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify({
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
        }));
        router.replace("/dashboard");
      } else {
        // Registration successful - show message and switch to login
        setSuccess(response.message || "Registration successful! Please login.");
        setForm({ username: "", email: "", password: "" });
        setTimeout(() => {
          setIsLogin(true);
          setSuccess("");
        }, 2000);
      }
    }
  } catch (err) {
    console.error(err);
    setError("Network error");
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              name="username"
              placeholder="Username"
              className="border p-3 rounded"
              value={form.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-3 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="border w-full p-3 rounded"
            value={form.password}
            onChange={handleChange}
            required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-4">
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
            </div>
          <button
            disabled={loading}
            className="bg-black text-white p-3 rounded-md cursor-pointer disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}