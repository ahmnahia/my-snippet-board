"use client";
import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Text } from "react-konva";
import { Html } from "react-konva-utils";
import { RiDragMove2Fill } from "react-icons/ri";
import { dragElement } from "@/scripts/dragAndDropToucnAndMouse";

export default function Board() {
  const [state, setState] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  });

  const [windowSize, setWindowSize] = useState({
    innerWidth: 110,
    innerHeight: 110,
  });
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setWindowSize({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
    setTimeout(() => {
      dragElement(document.getElementById("div-1"));
    }, 100);
  }, []);

  return (
    <div className="relative">
      <Stage
        width={windowSize.innerWidth}
        height={windowSize.innerHeight}
        draggable
        className="board-bg"
      >
        {/* <Layer className="test LAyer">
        <Html className="test htmml" style={{}}>
          <div
            className={`border cursor-default border-zinc-400 z-10 bg-white rounded-lg  overflow-auto shadow-xl resize w-[400px] h-[200px] min-h-[200px] min-w-[200px]`}
            style={
              {
                // position: "absolute",
                // top: "50%",
                // left: "50%",
              }
            } // Ensure it can be dragged around the screen
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
                <div
                  className="cursor-move text-2xl "
                  id="div-1header"
                >
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
        </Html>
      </Layer> */}
      </Stage>
      <div
        className={`border absolute cursor-default border-zinc-400 z-10 bg-white rounded-lg  overflow-auto shadow-xl resize w-[400px] h-[200px] min-h-[200px] min-w-[200px]`}
        style={
          {
            // position: "absolute",
            top: "0",
            left: "0",
          }
        } 
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
