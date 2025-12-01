"use client"

import { CirclePlus, House, SquareCheckBig, TrendingUp, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BottomNavbar() {
    const [activeLink, setActiveLink] = useState("/");

    return (
        <div className="fixed z-30 bg-white bottom-0 text-xs text-gray-600 py-6 px-4 lg:px-40 border-t border-gray-200 w-full flex justify-between items-center">
            {/* Home */}
            <Link href="/" onClick={() => setActiveLink("/")} className={`${activeLink === "/" ? "font-bold" : "font-medium"} w-fit flex flex-col gap-1 items-center`}>
                <House className={`${activeLink === "/" ?"font-bold" : "font-medium" }`} size={18} />
                <span>Home</span>
            </Link>
            {/* Analytics */}
            <Link href="/dashboard/analytics" onClick={() => setActiveLink("/analytics")} className={`${activeLink === "/analytics" ? "font-bold" : "font-medium"} flex w-fit flex-col gap-1 items-center`}>
                <TrendingUp className={`${activeLink === "/analytics" ?"font-bold" : "font-medium" }`} size={18} />
                <span>Analytics</span>
            </Link>
            {/* Add */}
            <Link href="/dashboard/add" onClick={() => setActiveLink("/add")} className={`${activeLink === "/add" ? "font-bold" : "font-medium"} flex w-fit flex-col gap-1 items-center`}>
                <CirclePlus className={`${activeLink === "/add" ?"font-bold" : "font-medium" }`} size={18} />
                <span>Add</span>
            </Link>
            {/* Tasks */}
            <Link href="/dashboard/tasks" onClick={() => setActiveLink("/tasks")} className={`${activeLink === "/tasks" ? "font-bold" : "font-medium"} flex w-fit flex-col gap-1 items-center`}>
                <SquareCheckBig className={`${activeLink === "/tasks" ?"font-bold" : "font-medium" }`} size={18} />
                <span>Tasks</span>
            </Link>
            {/* Profile */}
            <Link href="/dashboard/profile" onClick={()=> setActiveLink("/profile")} className={`${activeLink === "/profile" ? "font-bold" : "font-medium"} flex w-fit flex-col gap-1 items-center`}>
                <User className={`${activeLink === "/profile" ?"font-bold" : "font-medium" }`} size={18} />
                <span>Profile</span>
            </Link>
        </div>
    )
}