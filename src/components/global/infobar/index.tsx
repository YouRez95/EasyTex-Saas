import { currentUser } from "@clerk/nextjs/server";
import { bagel } from "../../../../fonts/fonts";
import { Input } from "@/components/ui/input";
import { Bell, LogOut, Search } from "lucide-react";
import NavbarPhone from "../navbar/navbar-phone";

export default async function InfoBar() {
  const user = await currentUser();
  return (
    <section className="h-16 bg-secondary border border-b flex items-center justify-between px-5 gap-3">
      <div className="gap-1 flex items-end">
        <span
          className={`${bagel.className} uppercase text-base md:text-lg lg:text-xl`}
        >
          {user?.firstName + " " + user?.lastName}
        </span>
        <span className="text-[8px] md:text-[10px] bg-primary text-secondary rounded-full py-[1px] px-[4px] font-bold">
          FREE
        </span>
      </div>

      <div className="relative flex-1 max-w-[300px] hidden md:flex">
        <Input
          className="bg-background rounded-full w-full"
          placeholder="Search Folders .."
        />
        <Search
          size={20}
          className="text-primary absolute right-2 top-[50%] translate-y-[-50%]"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell size={20} />
        <LogOut size={20} />
        <NavbarPhone />
      </div>
    </section>
  );
}
