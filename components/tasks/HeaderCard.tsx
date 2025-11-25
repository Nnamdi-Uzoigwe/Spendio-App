interface HeaderCardProps {
    figure: number,
    title: string
}

export default function HeaderCard({figure, title}: HeaderCardProps) {
    return (
        <div className="border border-gray-300 flex flex-col items-center justify-center p-4 rounded-[15px]">
            <h3 className={`text-xl font-semibold ${title === "Completed" ? "text-green-300" : title === "Pending" ? "text-black" : "text-red-400"}`}>{figure}</h3>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    )
}