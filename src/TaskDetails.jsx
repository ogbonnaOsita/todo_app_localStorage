import React, { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import FormButton from "./components/FormButton";
import {
  deleteTask,
  toggleTaskCompletion,
  updateTask,
} from "../utils/todoFunctions";
import { RiDeleteBin6Line } from "react-icons/ri";
import DescriptionArea from "./components/DescriptionArea";

const TaskDetails = ({ task, closeModal, updateTaskList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.task.title,
    color: task.task.color,
    description: task.task.description,
    date: task.task.date ?? new Date().toISOString().split("T")[0],
  });
  const [message, setMessage] = useState("");

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    updateTask(task.task.date, task.id, formData);
    setMessage("Task successfully updated!");
    updateTaskList();
    closeModal();
  };

  const handleCancel = () => {
    setFormData({
      title: task.task.title,
      color: task.task.color,
      description: task.task.description,
    });
    setIsEditing(false);
  };

  const handleCompleteClick = () => {
    setMessage(
      `Task marked as ${!task.completed ? "Completed" : "Incomplete"}!`
    );
    toggleTaskCompletion(task.task.date, task.id);
    updateTaskList();
    closeModal();
  };

  const handleDeleteTask = () => {
    deleteTask(task.id, task.task.date);
    setMessage("Task successfully deleted!");
    updateTaskList();
    closeModal();
  };

  return (
    <div className="task-details">
       <div className="md:max-w-md mx-auto p-6 md:p-8 bg-[#07121b] rounded-md shadow-md form-container max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Task Details</h2>
          <RiDeleteBin6Line
            className="text-red-500 text-2xl cursor-pointer"
            onClick={handleDeleteTask}
          />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-300 text-xs md:text-sm font-semibold md:font-bold mb-1 md:mb-2"
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
              readOnly={!isEditing}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-300 text-xs md:text-sm font-semibold md:font-bold mb-1 md:mb-2"
            >
              Description
            </label>
            <DescriptionArea
              text={formData.description}
              setText={(value) =>
                setFormData({ ...formData, description: value })
              }
              readOnly={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-300 text-xs md:text-sm font-semibold md:font-bold mb-1 md:mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              readOnly={!isEditing}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="colorSelected"
              className="block text-gray-300 text-sm font-bold"
            >
              Select Color
            </label>
            <ColorPicker color={formData.color} onChange={handleColorChange} />
          </div>

          <div>
            {message && (
              <div className="text-green-500 text-sm mb-4">{message}</div>
            )}
            {isEditing ? (
              <div className="flex justify-between items-center">
                <FormButton onClick={handleSubmit} color="blue">
                  Submit
                </FormButton>
                <FormButton onClick={handleCancel} color="red">
                  Cancel
                </FormButton>
              </div>
            ) : (
              <div>
                {!task.completed ? (
                  <div className="flex items-center justify-between">
                    <FormButton onClick={handleEditClick} color="green">
                      Edit
                    </FormButton>
                    <FormButton onClick={handleCompleteClick} color="blue">
                      Mark as Complete
                    </FormButton>
                  </div>
                ) : (
                  <FormButton onClick={handleCompleteClick} color="red">
                    Mark as Incomplete
                  </FormButton>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
