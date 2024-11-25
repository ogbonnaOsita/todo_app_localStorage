import React, { useEffect, useState, useCallback, useMemo } from "react";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import TaskDetails from "./TaskDetails";
import {
  deleteOldTodos,
  loadAllTasks,
  filterTasks,
} from "../utils/todoFunctions";
import FilterTasks from "./components/FilterTasks";

const Tasks = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: "all",
  });

  // Load and filter tasks
  const loadTaskList = useCallback(() => {
    deleteOldTodos();
    const allTasks = loadAllTasks();
    const filteredTodos = filterTasks(allTasks, filters);
    setTodos(filteredTodos);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTask(null);
  }, []);

  const updateTaskList = useCallback(() => {
    loadTaskList();
  }, [loadTaskList]);

  useEffect(() => {
    loadTaskList();
  }, [loadTaskList]);

  return (
    <div className="container mx-auto mt-6 px-5">
      <FilterTasks onFilterChange={handleFilterChange} />
      {todos.length === 0 ? (
        <div className="flex justify-center items-center mt-6">
          <p>No tasks found for the selected criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {todos.map((todo, index) => (
            <div key={index} onClick={() => handleTaskClick(todo)}>
              <TaskCard todo={todo} />
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            updateTaskList={updateTaskList}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default Tasks;