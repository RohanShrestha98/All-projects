import { useColor } from "./ColorContext";

const ColorPicker = () => {
  const { color, setColor } = useColor();
  const { background, setBackground } = useColor();

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
    localStorage.setItem("textColor", selectedColor);
    window.location.reload();
  };
  const handleBackgroundColorChange = (selectedColor) => {
    setBackground(selectedColor);
    localStorage.setItem("backgroundColor", selectedColor);
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <label htmlFor=""> Text Color Picker</label>
        <input
          type="color"
          value={color || localStorage.getItem("textColor")}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor=""> Background Color Picker</label>
        <input
          type="color"
          value={background || localStorage.getItem("backgroundColor")}
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default ColorPicker;
