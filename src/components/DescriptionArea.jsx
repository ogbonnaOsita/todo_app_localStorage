import React, { useState, useRef } from "react";

const DescriptionArea = ({ text, setText, readOnly }) => {
  const textareaRef = useRef(null);
  const maxLength = 150;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col relative w-full rounded-lg overflow-hidden mx-auto">
      <textarea
        rows="4"
        maxLength={maxLength}
        value={text}
        onChange={handleChange}
        ref={textareaRef}
        placeholder="Describe the task"
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white ${
          readOnly ? "bg-gray-500 cursor-not-allowed" : ""
        }`}
        readOnly={readOnly}
      />
      <span className="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-2 bottom-2">
        {maxLength - text.length}
      </span>
    </div>
  );
};

export default DescriptionArea;
