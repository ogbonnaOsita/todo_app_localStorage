import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div
        className="relative shadow-lg max-w-lg mx-auto m-6 z-50 transform opacity-100 scale-100 transition-all duration-300"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
