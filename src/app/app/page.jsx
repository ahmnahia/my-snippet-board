import Board from "@/components/Board";
// import Board from "@/components/BoardKonva"

export default function page() {
  return (
    <div className="overflow-hidden w-full h-[100vh] relative">
        <Board />
        {/* <DraggableBoard /> */}
    </div>
  )
}
