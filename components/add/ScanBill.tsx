import { ScanLine } from "lucide-react";

export default function ScanBill() {
    return (
        <div  className="border border-gray-300 p-4 rounded-md">
            Scan Bill page

            <div className="mt-10 mb-4 border-2 border-gray-300 rounded-xl px-6 py-14 flex flex-col gap-3 items-center border-dashed">
                <ScanLine size={30} />
                <p className="text-gray-400">Take a photo of your receipt or bill</p>

                <button className="border border-gray-300 p-2 hover:bg-gray-200 rounded-lg font-semibold text-sm cursor-pointer">Open Camera</button>
                <span>or</span>
                <button className="font-semibold hover:bg-gray-200 hover:rounded-lg text-sm p-2 cursor-pointer">Choose from gallery</button>
            </div>
            <p className="text-center">We'll extract the exact amount, merchant, and date from your receipt</p>
        </div>
    )
}