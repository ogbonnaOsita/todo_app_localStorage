import React from "react";

const FormButton = ({ onClick, color, children, className = "", ...props }) => {
  const baseStyle =
    "px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2";
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormButton;
