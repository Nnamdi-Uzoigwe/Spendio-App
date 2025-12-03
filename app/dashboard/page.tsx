import DisplayHeader from "@/components/dashboard/DisplayHeader";
import ExpenseBoard from "@/components/dashboard/ExpenseBoard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import TaskLists from "@/components/dashboard/TaskLists";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="px-4 lg:px-40 py-10 mb-30 flex flex-col gap-8">
      <DisplayHeader /> 
      <ExpenseBoard />
      <QuickActions />
      <RecentTransactions />
      <TaskLists />
    </div>
  );
}