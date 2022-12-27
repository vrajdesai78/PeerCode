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
  LINE: "line",
  CIRCLE: "circle",
  RECTANGLE: "rectangle",
};

function WhiteBoard() {
  const [currentTool, setCurrentTool] = useState(TOOLS.LINE);
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [heightCntr, setHeightCntr] = useState(0);
  const [widthCntr, setWidthCntr] = useState(0);
  useEffect(() => {
    setHeightCntr(containerRef.current.clientHeight);
    setWidthCntr(containerRef.current.clientWidth);
    console.log(currentTool);
  });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rc = rough.canvas(canvas);
    console.log(elements);
    elements.forEach((ele) => rc.draw(ele.roughEle));
  }, [elements]);

  const startDrawing = (event) => {
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;
    const newEle = createElement(clientX, clientY, clientX, clientY);
    setElements((state) => [...state, newEle]);
  };
  const finishDrawing = () => {
    setDrawing(false);
  };
  const draw = (event) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    // let   updatedEle ;
    // switch (currentTool) {
    //   case TOOLS.LINE:
    //     updatedEle = createElement(x1, y1, clientX, clientY);
    //     break;
    // case TOOLS.RECTANGLE:
    //   width = x2-x1;  height = y2-y1;
    //   default:
    //     updatedEle = createElement(x1, y1, clientX, clientY);
    //     break;
    // }
    const updatedEle = createElement(x1, y1, clientX, clientY);
    const copyElement = [...elements];
    copyElement[index] = updatedEle;
    setElements(copyElement);
  };

  return (
    <div className="w-full h-full">
      <div className="bg-grey p-2 px-10 flex">
        <ToolbarButton
          tool={TOOLS.LINE}
          icon={"/line.svg"}
          currentTool={currentTool}
          setCurrentTool={setCurrentTool}
        />
        <ToolbarButton
          tool={TOOLS.CIRCLE}
          icon={"/circle.svg"}
          currentTool={currentTool}
          setCurrentTool={setCurrentTool}
        />
        <ToolbarButton
          tool={TOOLS.RECTANGLE}
          icon={"/box.svg"}
          currentTool={currentTool}
          setCurrentTool={setCurrentTool}
        />
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
          className=""
        >
          Canvas
        </canvas>
      </div>
    </div>
  );
}

const ToolbarButton = ({ tool, icon, currentTool, setCurrentTool }) => {
  return (
    <div
      onClick={() => setCurrentTool(tool)}
      className={`${
        currentTool === tool ? " outline-main outline " : "  "
      }  cursor-pointer mx-2 p-2 bg-[#1E1E1E] w-fit rounded-md`}
    >
      <img src={icon} alt={tool} />
    </div>
  );
};
export default WhiteBoard;
