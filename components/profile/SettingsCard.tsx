import React from "react"

interface SettingsCardProps {
    icon: React.ReactNode,
    title: string,
    description: string,
    actionButton: React.ReactNode
}

export default function SettingsCard({ icon, title, description, actionButton }: SettingsCardProps) {
    return (
        <div className="border border-gray-300 p-2 rounded-lg flex items-center justify-between">
            {/* left */}
            <div className="flex gap-2 items-center">
                <div className="bg-gray-200 h-8 w-8 flex items-center p-2 justify-center rounded-md">
                    {icon}
                </div>
                <div>
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-gray-400 text-sm">{description}</p>
                </div>
            </div>
            {/* right */}
            <div>
                {actionButton}
            </div>
        </div>
    )
}