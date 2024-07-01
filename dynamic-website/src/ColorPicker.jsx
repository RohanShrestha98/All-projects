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
          value={
            localStorage.getItem("textColor")
              ? localStorage.getItem("textColor")
              : color
          }
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor=""> Background Color Picker</label>
        <input
          type="color"
          value={
            localStorage.getItem("backgroundColor")
              ? localStorage.getItem("backgroundColor")
              : background
          }
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default ColorPicker;
