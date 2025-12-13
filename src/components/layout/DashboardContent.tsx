import type { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import useAuthStore from "@/store/AuthStore";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function DashboardContent({ children }: { children: ReactNode }) {
  const { open } = useSidebar();
  const { logout } = useAuthStore();
  console.log(open);
  return (
    <div className={open ? "w-[calc(100vw_-_255px)]" : "w-screen"}>
      <div className="w-full bg-gray-500 py-2 px-4 flex justify-between">
        <SidebarTrigger className="text-gray-300" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon-sm" variant="outline" onClick={logout}>
              <LogOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex-1 w-full p-2 md:p-4">
        <Card>
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardContent;
