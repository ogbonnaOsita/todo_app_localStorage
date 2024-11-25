import React from "react";
import { MdAddTask } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Navbar = ({ onClick }) => {
  return (
    <header className="body-font">
      <div className="container mx-auto flex p-5 items-center border-b">
        <a className="flex title-font font-medium items-center">
          <MdAddTask className="text-2xl" />
          <span className="ml-2 text-xl">ActivityPlanner</span>
        </a>
        <button
          onClick={onClick}
          className="ml-auto inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0 text-gray-900"
        >
          Add Task
          <IoMdAdd className="ml-2" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
