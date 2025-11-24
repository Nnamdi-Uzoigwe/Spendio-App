import { CirclePlus, House, SquareCheckBig, TrendingUp, User } from "lucide-react"

export default function BottomNavbar() {
    return (
        <div className="fixed z-30 bg-white bottom-0 text-sm text-gray-600 py-6 px-6 lg:px-40 border-t border-gray-200 w-full flex justify-between items-center">
            {/* Home */}
            <div className="flex flex-col gap-1 items-center">
                <House />
                <span>Home</span>
            </div>
            {/* Analytics */}
            <div className="flex flex-col gap-1 items-center">
                <TrendingUp />
                <span>Analytics</span>
            </div>
            {/* Add */}
            <div className="flex flex-col gap-1 items-center">
                <CirclePlus />
                <span>Add</span>
            </div>
            {/* Tasks */}
            <div className="flex flex-col gap-1 items-center">
                <SquareCheckBig />
                <span>Tasks</span>
            </div>
            {/* Profile */}
            <div className="flex flex-col gap-1 items-center">
                <User />
                <span>Profile</span>
            </div>
        </div>
    )
}