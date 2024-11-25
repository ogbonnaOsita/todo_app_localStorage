import React from "react";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const TaskCard = ({ todo }) => {
  const gradientColor = {
    background: `linear-gradient(to right, ${todo.task.color} 0%, ${todo.task.color}80 100%)`,
  };

  return (
    <div
      className="cursor-pointer flex flex-col justify-between gap-4 rounded-lg h-full p-8 transition-all ease-in-out duration-300"
      style={gradientColor}
    >
      <div className="flex flex-grow items-center justify-between gap-6">
        <div className="h-full">
          <p className="mb-2">{todo.task.title}</p>
          <p className="leading-relaxed text-sm">{todo.task.description}</p>
        </div>
        <div>
          {todo.completed ? (
            <IoMdCheckmarkCircleOutline className="text-2xl" />
          ) : (
            <MdRadioButtonUnchecked className="text-2xl" />
          )}
        </div>
      </div>
      <p>Date: {todo.task.date}</p>
    </div>
  );
};

export default TaskCard;
