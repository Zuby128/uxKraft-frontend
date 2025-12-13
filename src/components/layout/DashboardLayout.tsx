import { Card, CardContent } from "../ui/card";
import { SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <div className="w-full">
        <div className="w-full bg-gray-500">
          <SidebarTrigger className="text-gray-300" />
        </div>
        <div className="w-full p-2 md:p-4 lg:p-4">
          <Card>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
