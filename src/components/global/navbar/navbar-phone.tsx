"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function NavbarPhone() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="block md:hidden" onClick={toggleSidebar}>
      <Menu size={24} />
    </div>
  );
}
