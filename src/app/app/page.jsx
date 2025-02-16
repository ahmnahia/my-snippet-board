import Board from "@/components/Board";
import { SidebarProvider } from "@/components/ui/sidebar";

// import Board from "@/components/BoardKonva"

export default function page() {
  return (
    <SidebarProvider>
      <div className="overflow-hidden w-full h-[100vh] relative">
        <Board />
        {/* <DraggableBoard /> */}
      </div>
    </SidebarProvider>
  );
}
