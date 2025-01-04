"use client";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Text } from "react-konva";
import { Html } from "react-konva-utils";

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
  console.log(windowSize);

  useEffect(() => {
    // Set window size after the component has mounted on the client side
    setWindowSize({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
    // Generate initial stars
    // setStars(generateShapes(windowSize.innerWidth, windowSize.innerHeight));
  }, []);

  return (
    <Stage
      width={windowSize.innerWidth}
      height={windowSize.innerHeight}
      draggable
    >
      <Layer>
        <Html
          x={state.x}
          y={state.y}
          draggable
          fill={state.isDragging ? "green" : "black"}
          onDragStart={() => {
            setState({
              isDragging: true,
            });
          }}
          onDragEnd={(e) => {
            setState({
              isDragging: false,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        >
          <div className={`w-[200px] h-[200px] border border-black cursor-pointer ${state.isDragging? "border-[20px]":""}`} style={{borderWidth:state.isDragging?20:1}}></div>
        </Html>
        {/* <Text
          text="Draggable Text"
          x={state.x}
          y={state.y}
          draggable
          fill={state.isDragging ? "green" : "black"}
          onDragStart={() => {
            setState({
              isDragging: true,
            });
          }}
          onDragEnd={(e) => {
            setState({
              isDragging: false,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        /> */}
      </Layer>
    </Stage>
  );
}
