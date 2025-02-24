"use client";

import { FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { bagel } from "../../../../fonts/fonts";
import { PRIMARY_MENU } from "@/constants/menu";

export default function navbar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className={`pt-5 ${open ? "px-5" : "px-0"}`}>
      <SidebarHeader>
        <SidebarGroup className="flex flex-row items-center gap-4">
          <Link
            href={"/dashboard"}
            className={`flex items-center gap-2 text-2xl -mt-[6px] ${
              !open ? "w-0 h-0 hidden" : "flex"
            }`}
          >
            <FileText className="h-7 w-7 shrink-0 text-primary" />
            <span
              className={`${bagel.className} bg-clip-text text-transparent bg-gradient-to-b from-[#243949] via-[#171717] to-[#517fa4]`}
            >
              EasyTex
            </span>
          </Link>
          <SidebarTrigger className="[&_svg]:size-6" />
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="">
          <SidebarGroupContent>
            <SidebarMenu>
              {PRIMARY_MENU.map((item) => (
                <SidebarMenuItem key={item.title} className="h-[40px]">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="[&_svg]:size-5 h-full">
                      <item.icon className="" />
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
