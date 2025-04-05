import InfoBar from "@/components/global/infobar";
import Navbar from "@/components/global/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  
  return (
    <>
      <SidebarProvider>
        <Navbar />
        <main className="min-h-screen w-full overflow-hidden">
          <InfoBar />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
