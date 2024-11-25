import React, { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import { addTask } from "../utils/todoFunctions";
import DescriptionArea from "./components/DescriptionArea";

const AddTask = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    color: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleColorChange = (color) => {
    setFormData({
      ...formData,
      color,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    console.log("Form Submitted:", formData);
    onSubmit();
  };

  return (
    <div className="md:max-w-md mx-auto p-6 md:p-8 bg-[#07121b] rounded-md shadow-md form-container max-w-sm">
      <h2 className="text-2xl font-semibold text-white mb-6">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-300 text-xs md:text-sm font-semibold md:font-bold mb-1 sm:mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title of the task"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-300 text-xs md:text-sm font-semibold md:font-bold mb-1 sm:mb-2"
          >
            Description
          </label>
          <DescriptionArea
            text={formData.description}
            setText={(value) =>
              setFormData({ ...formData, description: value })
            }
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-300 text-xs md:text-sm font-semibold md:font-bold mb-1 sm:mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="colorSelected"
            className="block text-gray-300 text-xs md:text-sm font-semibold md:font-bold"
          >
            Select Color
          </label>
          <ColorPicker onChange={handleColorChange} />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTask;
