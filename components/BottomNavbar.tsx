"use client"

import { CirclePlus, House, SquareCheckBig, TrendingUp, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BottomNavbar() {
    const [activeLink, setActiveLink] = useState("/");

    return (
        <div className="fixed z-30 bg-white bottom-0 text-sm text-gray-600 py-6 px-6 lg:px-40 border-t border-gray-200 w-full flex justify-between items-center">
            {/* Home */}
            <Link href="/" onClick={() => setActiveLink("/")} className={`${activeLink === "/" ? "bg-black text-white p-4  rounded-full" : "bg-transparent text-black"} w-fit flex flex-col gap-1 items-center`}>
                <House />
                <span>Home</span>
            </Link>
            {/* Analytics */}
            <Link href="/analytics" onClick={() => setActiveLink("/analytics")} className={`${activeLink === "/analytics" ? "bg-black text-white p-4  rounded-full" : "bg-transparent text-black"} flex w-fit flex-col gap-1 items-center`}>
                <TrendingUp />
                <span>Analytics</span>
            </Link>
            {/* Add */}
            <Link href="/add" onClick={() => setActiveLink("/add")} className={`${activeLink === "/add" ? "bg-black text-white p-4  rounded-full" : "bg-transparent text-black"} flex w-fit flex-col gap-1 items-center`}>
                <CirclePlus />
                <span>Add</span>
            </Link>
            {/* Tasks */}
            <Link href="/tasks" onClick={() => setActiveLink("/tasks")} className={`${activeLink === "/tasks" ? "bg-black text-white p-4  rounded-full" : "bg-transparent text-black"} flex w-fit flex-col gap-1 items-center`}>
                <SquareCheckBig />
                <span>Tasks</span>
            </Link>
            {/* Profile */}
            <Link href="/profile" onClick={()=> setActiveLink("/profile")} className={`${activeLink === "/profile" ? "bg-black text-white p-4  rounded-full" : "bg-transparent text-black"} flex w-fit flex-col gap-1 items-center`}>
                <User />
                <span>Profile</span>
            </Link>
        </div>
    )
}