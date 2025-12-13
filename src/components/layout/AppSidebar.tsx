import { Container, Truck } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Individual Operations",
    url: "/dashboard/individual",
    icon: Truck,
  },
  {
    title: "Bulk Operations",
    url: "/dashboard/bulk",
    icon: Container,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-800 text-gray-100">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
