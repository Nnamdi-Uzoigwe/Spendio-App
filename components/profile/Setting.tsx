import { Bell, ChevronRight, CircleQuestionMark, CreditCard, DollarSign, Download, Lock, Moon, Shield, ToggleLeft, User, Settings, LogOut } from "lucide-react"
import SettingsCard from "./SettingsCard"

export default function Setting() {
    const accountSettingsData = [
        {
            id: 1,
            icon: <User />,
            title: "Personal Information",
            description: "Update your profile details",
            actionButton: <ChevronRight />
        },
        {
            id: 2,
            icon: <Lock />,
            title: "Security",
            description: "Password, 2FA, and privacy settings",
            actionButton: <ChevronRight />
        },
        {
            id: 3,
            icon: <Bell />,
            title: "Notifications",
            description: "Manage your notification preferences",
            actionButton: <ToggleLeft />
        },
        {
            id: 4,
            icon: <Moon />,
            title: "Dark Mode",
            description: "Toggle dark mode theme",
            actionButton: <ToggleLeft />
        }
    ]
    const financialSettingsData = [
        {
            id: 1,
            icon: <CreditCard />,
            title: "Payment Methods",
            description: "Manage cards and bank accounts",
            actionButton: <ChevronRight />
        },
        {
            id: 2,
            icon: <DollarSign />,
            title: "Budget Settings",
            description: "Set spending limits and categories",
            actionButton: <ChevronRight />
        },
        {
            id: 3,
            icon: <Download />,
            title: "Export Data",
            description: "Download your financial data",
            actionButton: <ChevronRight />
        },
    ]
    const supportSettingsData = [
        {
            id: 1,
            icon: <CircleQuestionMark />,
            title: "Help Center",
            description: "FAQ and support articles",
            actionButton: <ChevronRight />
        },
        {
            id: 2,
            icon: <Shield />,
            title: "Privacy Policy",
            description: "Read our privacy policy",
            actionButton: <ChevronRight />
        },
        {
            id: 3,
            icon: <Settings />,
            title: "App Settings",
            description: "General app preferences",
            actionButton: <ChevronRight />
        },
    ]
    return (
        <div>
            {/* Account Settings */}
            <section>
                    <h4 className="font-semibold mb-3">Account Settings</h4>
                    <div className="flex flex-col gap-3">
                        {accountSettingsData.map((item) => (
                            <SettingsCard 
                                key={item.id}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                actionButton={item.actionButton}
                                />
                            ))}
                    </div>
            </section>
            {/* Financial Settings */}
            <section className="mt-6">
                    <h4 className="font-semibold mb-3">Financial Settings</h4>
                    <div className="flex flex-col gap-3">
                        {financialSettingsData.map((item) => (
                            <SettingsCard 
                                key={item.id}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                actionButton={item.actionButton}
                                />
                            ))}
                    </div>
            </section>
            {/* Support */}
            <section className="mt-6">
                    <h4 className="font-semibold mb-3">Support</h4>
                    <div className="flex flex-col gap-3">
                        {supportSettingsData.map((item) => (
                            <SettingsCard 
                                key={item.id}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                actionButton={item.actionButton}
                                />
                            ))}
                    </div>
            </section>

            <div className="mt-10 hover:bg-red-100 hover:border-red-100 cursor-pointer border p-3 rounded-md flex justify-center border-gray-300">
                <button className="flex items-center gap-3">
                    <LogOut size={17} className="text-red-500" />
                    <span className="text-red-500 font-semibold">Sign out</span>
                </button>
            </div>
        </div>
    )
}