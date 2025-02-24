"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function NavbarPhone() {
  const { toggleSidebar } = useSidebar();
  return (
    <div
      className="absolute flex md:hidden right-2 top-2 cursor-pointer"
      onClick={toggleSidebar}
    >
      <Menu size={30} />
    </div>
  );
}
