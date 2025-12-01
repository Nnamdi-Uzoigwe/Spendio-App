import Header from "@/components/Header";
import BottomNavbar from "@/components/BottomNavbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Header />
      {children}
      <BottomNavbar />
    </ProtectedRoute>
  );
}