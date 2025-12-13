import RightSidebar from "../common/RightSidebar";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Toaster } from "sonner";
import DashboardContent from "./DashboardContent";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <DashboardContent>{children}</DashboardContent>
        </div>
      </div>
      <RightSidebar />
      <Toaster />
    </SidebarProvider>
  );
}

export default DashboardLayout;
