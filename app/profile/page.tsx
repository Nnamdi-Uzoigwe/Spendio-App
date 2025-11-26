import ProfileCard from "@/components/profile/ProfileCard"
import Settings from "@/components/profile/Setting"
import { CreditCard, DollarSign, User } from "lucide-react"

export default function Profile() {
    const profileCardData = [
        {
            id: 1,
            icon: <DollarSign className="text-green-400" />,
            figure: "₦20,847",
            title: "Current Balance"
        },
        {
            id: 2,
            icon: <CreditCard className="text-blue-400" />,
            figure: "156",
            title: "Transactions"
        },
        {
            id: 3,
            icon: <User className="text-purple-400" />,
            figure: "23",
            title: "Completed Tasks"
        },
    ]
    return (
        <div className="mb-20">
            <div className="border-b border-gray-300 p-4 px-4 lg:px-40">
                <h3 className="font-semibold text-lg">Profile</h3>
            </div>

            <div className="mt-10 px-4 lg:px-40">
                <div className="border border-gray-300 p-6 rounded-[20px] flex justify-between items-center">
                    {/* Left */}
                    <div className="flex gap-3 items-center">
                        {/* Avatar */}
                        <div className="bg-black text-white h-16 w-16 rounded-full text-xl  flex items-center justify-center">
                            JD
                        </div>

                        {/* Name */}
                        <div>
                            <h2 className="text-xl font-semibold">John Doe</h2>
                            {/* Email */}
                            <p className="text-gray-500 font-semibold">john.doe@gmail.com</p>
                            <p className="text-sm text-gray-500">Member since Jan 2024</p>
                        </div>

                    </div>
                    {/* Right */}
                    <div>
                        <button className="border border-gray-300 font-semibold py-2 px-4 text-sm rounded-lg">
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10 px-4 lg:px-40 grid grid-cols-3 gap-3">
                {profileCardData.map((item) => (
                    <ProfileCard 
                        key={item.id}
                        icon={item.icon}
                        figure={item.figure}
                        title={item.title}
                    />
                ))}
            </div>

            <div className="mt-10 px-4 lg:px-40 pb-20">
                <Settings />
            </div>
        </div>
    )
}