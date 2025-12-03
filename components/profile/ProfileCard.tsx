interface ProfileCardProps {
    icon: React.ReactNode,
    figure: string,
    title: string
}

export default function ProfileCard({ icon, figure, title }:ProfileCardProps) {
    return (
        <div className="border border-gray-300 rounded-md p-3 lg:p-4 flex flex-col gap-2 items-center justify-center">
            <div>
                {icon}
            </div>
            <h4 className="font-semibold">{figure}</h4>
            <p className="text-sm text-gray-500">
                {title}
            </p>
        </div>
    )
}