"use client";
import React, { useEffect } from "react";
import { dragElement } from "@/scripts/dragAndDropToucnAndMouse";
import { boardSize } from "@/constants/sizes";
import { RiDragMove2Fill } from "react-icons/ri";

export default function Board() {
  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
    dragElement(document.getElementById("div-1"));
    dragElement(document.getElementById("board"));
  }, []);

  return (
      <div
        className={`z-0 bg-pink-100 absolute board-bg hover:cursor-grab`}
        style={{
          left: -boardSize / 2,
          top: -boardSize / 2,
          width: boardSize,
          height: boardSize,
        }}
        id="board"
      >
        <div
          className={`border cursor-default border-zinc-400 z-10 bg-white rounded-lg  overflow-auto shadow-xl resize w-[400px] h-[200px] min-h-[200px] min-w-[200px]`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }} 
          id="div-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full  flex justify-between p-1 bg-zinc-50 ">
            <div>
              <h5 className="">
                <b>Code #1</b>
              </h5>
            </div>
            <div>
              <div className="cursor-move text-2xl " id="div-1header">
                <RiDragMove2Fill />
              </div>
            </div>
          </div>
          <div className="px-4 content ">
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
          </div>
        </div>
      </div>
  );
}
