"use client";

import { useEffect, useState } from "react";
import { Bell, Settings } from "lucide-react";

interface ProfileType {
  _id: string;
  name: string;
  email: string;
  dateJoined: string;
  currentBalance: number;
  totalTransactions: number;
  completedTasks: number;
}

export default function DisplayHeader() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [greeting, setGreeting] = useState("Good Morning");
  const [loading, setLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API;

  // Function to get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token || !user) {
          setLoading(false);
          return;
        }

        const userData = JSON.parse(user);

        const res = await fetch(`${apiBase}/api/profile/${userData._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    setGreeting(getGreeting());
  }, [apiBase]);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="bg-gray-300 animate-pulse h-10 w-10 rounded-full"></div>
          <div>
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded mb-2"></div>
            <div className="h-5 w-32 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="h-5 w-5 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-5 w-5 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      {/* Left */}
      <div className="flex gap-4 items-center">
        {/* Profile Pic */}
        <div className="bg-gray-600 text-white font-semibold flex items-center justify-center text-lg h-10 w-10 rounded-full">
          {profile ? getInitials(profile.name) : "JD"}
        </div>

        <div>
          <p className="text-gray-500 text-sm">{greeting}</p>
          <h4 className="font-semibold text-gray-700 text-xl">
            {profile ? profile.name : "John Doe"}
          </h4>
        </div>
      </div>

      {/* Right */}
      <div className="flex gap-10">
        <button className="hover:text-gray-600 transition-colors">
          <Bell size={19} />
        </button>
        <button className="hover:text-gray-600 transition-colors">
          <Settings size={19} />
        </button>
      </div>
    </div>
  );
}