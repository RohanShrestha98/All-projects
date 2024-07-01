import React, { useState } from "react";

const ColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState<string>("")
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedColorCode = e.target.value;
        // const selectedColrHexCode = selectedColorCode.toUpperCase()
        setSelectedColor(selectedColorCode)
    }
    return { selectedColor, handleColorChange, setSelectedColor }

}

export default ColorPicker;