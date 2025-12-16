import RightSidebar from "../common/RightSidebar";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Toaster } from "sonner";
import DashboardContent from "./DashboardContent";
import { TimelineProvider } from "@/context/TimelineContext";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TimelineProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          <div className="flex-1 flex flex-col">
            <DashboardContent>{children}</DashboardContent>
          </div>
        </div>
        <RightSidebar />
        <Toaster />
      </TimelineProvider>
    </SidebarProvider>
  );
}

export default DashboardLayout;
