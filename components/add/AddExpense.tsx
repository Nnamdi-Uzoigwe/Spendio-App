export default function AddExpense() {
    return (
        <div className="border border-gray-300 rounded-md p-4">
            Add Expense page

            {/* form */}
            <form className="mt-6 flex flex-col gap-4">
                {/* Amount */}
                <div className="relative">
                    <p className="font-semibold mb-2">Amount</p>
                    <input 
                        type="text" 
                        className="pl-10 border-2 border-gray-300 w-full p-2 text-lg rounded-md" 
                    />
                    <span className="absolute top-[45px] text-lg left-4">₦</span>
                </div>

                {/* Description */}
                <div>
                    <p className="font-semibold mb-2">Description</p>
                    <input 
                        type="text" 
                        className="border-2 border-gray-300 w-full p-2 text-lg rounded-md"
                        placeholder="What was this for?" 
                    />
                </div>

                {/* Category */}
                <div>
                    <p className="font-semibold mb-2">Category</p>
                   <select className="border-2 border-gray-300 w-full p-2 text-lg rounded-md">
                    <option value="">Food & Dining</option>
                    <option value="">Transportation</option>
                    <option value="">Shopping</option>
                    <option value="">Entertainment</option>
                    <option value="">Bills</option>
                    <option value="">Healthcare</option>
                    <option value="">Other</option>
                   </select>
                </div>

                {/* Date */}
                <div>
                    <p className="font-semibold mb-2">Date</p>
                    <input type="date" className="border-2 border-gray-300 w-full p-2 text-lg rounded-md" />
                </div>

                <button className="mt-2 rounded-md cursor-pointer p-2 w-full bg-black text-white">Add Expense</button>
            </form>
        </div>
    )
}