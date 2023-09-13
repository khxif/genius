import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen ">
            <div className="hidden h-full md:flex md:w-72 p-4 bg-[#111827]">
                <Sidebar />
            </div>
            <main className="md:flex-1 h-auto overflow-y-auto">
                <Navbar />
                {children}
                <Toaster />
            </main>
        </div>
    )
}
