//@ts-nocheck
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import rough from "roughjs/bundled/rough.cjs.js";
import Pen from "../assets/pen";

const gen = rough?.generator();
function createElement(x1, y1, x2, y2) {
  const roughEle = gen.line(x1, y1, x2, y2);
  return { x1, y1, x2, y2, roughEle };
}
const TOOLS = {
  PEN: "pen",
};

function WhiteBoard() {
  const [tool, setTool] = useState(TOOLS.PEN);
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [heightCntr, setHeightCntr] = useState(0);
  const [widthCntr, setWidthCntr] = useState(0);
  useEffect(() => {
    setHeightCntr(containerRef.current.clientHeight);
    setWidthCntr(containerRef.current.clientWidth);
  });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rc = rough.canvas(canvas);
    elements.forEach((ele) => rc.draw(ele.roughEle));
  }, [elements]);

  const startDrawing = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    const newEle = createElement(clientX, clientY, clientX, clientY);
    setElements((state) => [...state, newEle]);
  };
  const finishDrawing = () => {
    setDrawing(false);
  };
  const draw = (event) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    console.log(clientX, clientY);
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedEle = createElement(x1, y1, clientX, clientY);
    const copyElement = [...elements];
    copyElement[index] = updatedEle;
    setElements(copyElement);
  };

  return (
    <div className="w-full h-full">
      <div className="bg-grey p-2 px-10">
        <div
          className={`${
            tool === TOOLS.PEN ? " border-main border-[1px]  " : "  "
          }  cursor-pointer p-2 bg-[#1E1E1E] w-fit rounded-md`}
        >
          <Pen color="#BBBBBB" />
        </div>
      </div>
      <div className="grid-bg w-full h-full" ref={containerRef}>
        <canvas
          id="canvas"
          width={widthCntr}
          height={heightCntr}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          className="border-red-700 border-2"
        >
          Canvas
        </canvas>
      </div>
    </div>
  );
}

export default WhiteBoard;
