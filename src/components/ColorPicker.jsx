import React, { useEffect, useState } from "react";
import { GrEdit } from "react-icons/gr";

const colors = [
  "#2196F3",
  "#009688",
  "#9C27B0",
  "#D6A727",
  "#afbbc9",
  "#4CAF50",
  "#404E66",
  "#f56565",
  "#ed64a6",
];

const ColorPicker = ({ onChange, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [colorSelected, setColorSelected] = useState(color ?? colors[0]);

  const handleColorSelect = (color) => {
    setColorSelected(color);
    if (onChange) {
      onChange(color);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    handleColorSelect(colorSelected);
  }, []);

  return (
    <div className="mb-5">
      <div className="w-full flex items-center space-x-3">
        <div className="flex-1">
          <input
            id="colorSelected"
            type="text"
            className="w-full h-12 px-4 py-2 text-white font-medium rounded-md border-4 border-white focus:outline-none"
            readOnly
            style={{ backgroundColor: colorSelected }}
          />
        </div>

        {/* Color Picker Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center text-white font-bold shadow"
            style={{ background: colorSelected }}
          >
            <GrEdit className="text-xl" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50">
              <div className="rounded-md bg-white shadow-xs px-4 py-3">
                <div className="flex flex-wrap -mx-2">
                  {colors.map((color, index) => (
                    <div key={index} className="px-2">
                      {colorSelected === color ? (
                        <div
                          className="w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white"
                          style={{
                            background: color,
                            boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)",
                          }}
                        ></div>
                      ) : (
                        <div
                          onClick={() => handleColorSelect(color)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleColorSelect(color)
                          }
                          role="checkbox"
                          tabIndex="0"
                          aria-checked={colorSelected === color}
                          className="w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white focus:outline-none focus:shadow-outline"
                          style={{ background: color }}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
