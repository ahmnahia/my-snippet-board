"use client";
import { RiDragMove2Fill } from "react-icons/ri";

export default function Snippet({ id, title, content }) {
  return (
    <div
      className={`border flex flex-col  cursor-default border-zinc-400 z-10 bg-white rounded-lg shadow-xl  w-[400px] h-[200px] min-h-[200px] min-w-[200px] resize overflow-hidden hover:z-50 hover:outline-2 hover:outline hover:outline-blue-200`}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
      id={id}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-full flex justify-between p-1 bg-zinc-50 border-b-2 border-b-zinc-200">
        <div>
          <h5 className="">
            <b>{title}</b>
          </h5>
        </div>
        <div>
          <div className="cursor-move text-2xl " id={id + "header"}>
            <RiDragMove2Fill />
          </div>
        </div>
      </div>
      <div className="px-4 content overflow-auto">{content}</div>
    </div>
  );
}
