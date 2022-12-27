import { useEffect } from "react";
import "react-color-palette/lib/css/styles.css";
import { ColorPicker, useColor } from "react-color-palette";

const ColourPicker = ({ setColorWidth }) => {
  const [color, setColor] = useColor("hex", "#121212");

  useEffect(() => {
    setColorWidth(color);
  }, [color]);

  return window.innerWidth < 550 ? (
    <ColorPicker
      hideHSB
      hideHEX
      dark
      width={window.innerWidth * 0.073 * 2.5}
      height={window.innerHeight * 0.1}
      color={color}
      onChange={setColor}
    />
  ) : (
    <ColorPicker
      hideHSB
      dark
      width={window.innerWidth * 0.073 * 2}
      height={window.innerWidth * 0.073 * 2}
      color={color}
      onChange={setColor}
    />
  );
};
export default ColourPicker;
