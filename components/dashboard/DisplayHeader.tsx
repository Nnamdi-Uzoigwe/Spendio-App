import { Bell, Settings } from "lucide-react";

export default function DisplayHeader() {
    return (
        <div className="flex justify-between items-center">
            {/* Left */}
            <div className="flex gap-4 items-center">
                {/* Profile Pic */}
                <div className="bg-gray-600 text-white font-semibold flex items-center justify-center text-lg h-10 w-10 rounded-full">
                    JD
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Good Afternoon</p>
                    <h4 className="font-semibold text-gray-700 text-xl">John Doe</h4>
                </div>
            </div>
            {/* Right */}
            <div className="flex gap-10">
                <div>
                    <Bell size={19} />
                </div>
                <div>
                    <Settings size={19} />
                </div>
            </div>
        </div>
    )
}