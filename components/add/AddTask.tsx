export default function AddTask() {
    return (
        <div className="border border-gray-300 p-4 rounded-md">
            Add Task page

            {/* form */}
            <form className="mt-6 flex flex-col gap-4">
                {/* Amount */}
                <div className="relative">
                    <p className="font-semibold mb-2">Task Title</p>
                    <input 
                        type="text" 
                        className="border-2 border-gray-300 w-full p-2 text-lg rounded-md" 
                        placeholder="What needs to be done?"
                    />
                </div>

                {/* Description */}
                <div>
                    <p className="font-semibold mb-2">Description</p>
                    <textarea 
                        className="border-2 border-gray-300 w-full p-2 text-lg rounded-md"
                        placeholder="Add more details..." 
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <p className="font-semibold mb-2">Priority</p>
                   <select className="border-2 border-gray-300 w-full p-2 text-lg rounded-md">
                    <option value="">Low</option>
                    <option value="">Medium</option>
                    <option value="">High</option>
            
                   </select>
                </div>

                {/* Date */}
                <div>
                    <p className="font-semibold mb-2">Due Date</p>
                    <input type="date" className="border-2 border-gray-300 w-full p-2 text-lg rounded-md" />
                </div>

                <button className="mt-2 rounded-md cursor-pointer p-2 w-full bg-black text-white">Add Task</button>
            </form>
        </div>
    )
}