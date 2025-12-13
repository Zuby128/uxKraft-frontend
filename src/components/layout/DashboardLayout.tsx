import RightSidebar from "../common/RightSidebar";
import { Card, CardContent } from "../ui/card";
import { SidebarTrigger } from "../ui/sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Toaster } from "sonner";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <div className="w-full bg-gray-500 p-2">
            <SidebarTrigger className="text-gray-300" />
          </div>

          <div className="flex-1 w-full p-2 md:p-4">
            <Card>
              <CardContent className="p-6">{children}</CardContent>
            </Card>
          </div>
        </div>
      </div>
      <RightSidebar />
      <Toaster />
    </SidebarProvider>
  );
}

export default DashboardLayout;
