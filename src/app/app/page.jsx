import Board from "@/components/Board";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "App",
};

export default function page() {
  return (
    <SidebarProvider>
      <div className="overflow-hidden w-full h-[100vh] relative">
        <Board />
      </div>
    </SidebarProvider>
  );
}
