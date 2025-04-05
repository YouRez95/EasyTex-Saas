"use client";

import { FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { bagel } from "../../../../fonts/fonts";
import { PRIMARY_MENU } from "@/constants/menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "./theme-switcher";
import { useFolders } from "@/hooks/useFolders";

export default function navbar() {
  const { open } = useSidebar();
  const { data: folderData, isPending } = useFolders();

  return (
    <Sidebar
      collapsible="icon"
      className={`pt-5 ${open ? "px-5" : "px-0"} bg-sidebar`}
    >
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
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="[&_svg]:size-5 h-full">
                      <item.icon className="" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === "Folders" && folderData?.data && (
                    <SidebarMenuSub className="">
                      {folderData.data.map((folder) => (
                        <SidebarMenuSubItem key={folder.id}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={`/dashboard/folders/${folder.slug}`}
                              className="h-10 flex gap-2"
                            >
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: folder.color }}
                              />
                              <span>{folder.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className="">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="h-[40px]">
                <SidebarMenuButton asChild>
                  <Link href={""} className="[&_svg]:size-5 h-full">
                    <UserButton />
                    <span>Profil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className={
          open
            ? "visible delay-200 transition-all flex flex-col gap-4"
            : "invisible"
        }
      >
        <div className="p-2 border-[1px] border-dashed rounded-xl border-muted-foreground">
          <Card>
            <CardHeader className={`p-1 pt-4 ${bagel.className}`}>
              <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-b from-[#243949] via-[#171717] to-[#517fa4]">
                Upgrade Your Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1">
              <p className="text-sm">Unlock all Features</p>
            </CardContent>
            <CardFooter className="items-center p-1">
              <Button className="w-full text-white rounded-full bg-gradient-to-b from-[#243949] via-[#171717] to-[#517fa4] font-bold">
                Upgrade
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <ThemeSwitcher />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
