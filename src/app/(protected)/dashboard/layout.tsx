import InfoBar from "@/components/global/infobar";
import Navbar from "@/components/global/navbar";
import NavbarPhone from "@/components/global/navbar/navbar-phone";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <SidebarProvider className="">
        <Navbar />
        {/* <NavbarPhone /> */}
        <main className="min-h-screen w-full overflow-hidden">
          <InfoBar />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
