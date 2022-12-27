//@ts-nocheck
import { useState } from "react";
import ColourPicker from "./ColourPicker";

const Toolbar = ({
  toolType,
  setToolType,
  width,
  setWidth,
  setElements,
  setColorWidth,
  setPath,
  colorWidth,
  setShapeWidth,
}) => {
  const [displayStroke, setDisplayStroke] = useState(false);

  const handleClickStroke = () => {
    setDisplayStroke(!displayStroke);
    setColorWidth(colorWidth);
  };

  const increaseWidth = () => {
    if (toolType === "brush" || toolType === "eraser") {
      if (width < 30) setWidth((prev) => prev + 5);
    }
    if (toolType === "pencil") {
      if (width < 15) setWidth((prev) => prev + 3);
    }
    if (toolType === ("triangle" || "rectangle" || "circle")) {
      if (width < 15) setShapeWidth((prev) => prev + 3);
    }
  };
  const decreaseWidth = () => {
    if (toolType === "brush" || toolType === "eraser") {
      if (width > 1) setWidth((prev) => prev - 5);
    }
    if (toolType === "pencil") {
      if (width > 1) setWidth((prev) => prev - 3);
    }
    if (toolType === ("triangle" || "rectangle" || "circle")) {
      if (width > 1) setShapeWidth((prev) => prev - 3);
    }
  };
  return (
    <>
      <div className="flex">
        <ToolbarButton
          tool="line"
          icon="/line.svg"
          currentTool={toolType}
          handleClick={() => {
            setToolType("line");
            setWidth(1);
            setShapeWidth(1);
          }}
        />
        <ToolbarButton
          tool="rectangle"
          icon="/box.svg"
          currentTool={toolType}
          handleClick={() => {
            setToolType("rectangle");
            setWidth(1);
            setShapeWidth(1);
          }}
        />
        <ToolbarButton
          tool="circle"
          icon="/circle.svg"
          currentTool={toolType}
          handleClick={() => {
            setToolType("circle");
            setWidth(1);
            setShapeWidth(1);
          }}
        />
        <ToolbarButton
          tool="triangle"
          icon="/triangle.svg"
          currentTool={toolType}
          handleClick={() => {
            setToolType("triangle");
            setWidth(1);
            setShapeWidth(1);
          }}
        />
        <ToolbarButton
          tool="pencil"
          icon="/pencil.svg"
          currentTool={toolType}
          handleClick={() => {
            setToolType("pencil");
            setWidth(1);
            setShapeWidth(1);
          }}
        />
        <ToolbarButton
          tool="brush"
          icon="/brush.svg"
          currentTool={toolType}
          handleClick={() => {
            setToolType("brush");
            setWidth(10);
            setShapeWidth(1);
          }}
        />
        <ToolbarButton
          tool="eraser"
          icon="/eraser.svg"
          currentTool={toolType}
          handleClick={() => {
            setToolType("eraser");
            setWidth(10);
            setShapeWidth(1);
          }}
        />
      </div>
      <div className="flex">
        <div
          className="cursor-pointer hover:outline-main hover:outline flex items-center px-4 mx-2 p-2 bg-[#1E1E1E] w-fit rounded-md"
          onClick={() => {
            setElements([]);
            setPath([]);
            return;
          }}
        >
          <img src={"/bin.svg"} alt={"bin"} />
        </div>
        <div
          className="cursor-pointer hover:outline-main hover:outline flex items-center px-4 mx-2 p-2 bg-[#1E1E1E] w-fit rounded-md text-xl"
          onClick={decreaseWidth}
        >
          <img src={"/minus.svg"} alt={"minus"} />
        </div>
        <div
          className="cursor-pointer hover:outline-main hover:outline flex items-center px-4 mx-2 p-2 bg-[#1E1E1E] w-fit rounded-md  text-xl"
          onClick={increaseWidth}
        >
          <img src={"/plus.svg"} alt={"plus"} />
        </div>
        {displayStroke && (
          <div className="">
            <ColourPicker setColorWidth={setColorWidth} />
          </div>
        )}
      </div>
    </>
  );
};

export default Toolbar;

const ToolbarButton = ({ tool, icon, currentTool, handleClick }) => {
  return (
    <div
      onClick={() => handleClick()}
      className={`${
        currentTool === tool ? " outline-main outline  " : "  "
      }  flex hover:outline-main hover:outline items-center px-4 cursor-pointer mx-2 p-2 bg-[#1E1E1E] w-fit rounded-md`}
    >
      <img src={icon} alt={tool} />
    </div>
  );
};
