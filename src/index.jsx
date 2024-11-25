import React, { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import AddTask from "./AddTask";
import Tasks from "./Tasks";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTaskAdded = useCallback(() => {
    setRefreshKey((prev) => prev + 1); // Increment to trigger refresh
    closeModal();
  }, []);

  return (
    <div className="min-h-svh flex flex-col">
      <Navbar onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddTask onSubmit={handleTaskAdded} updateTaskList />
      </Modal>
      <div className="flex-grow">
        <Tasks key={refreshKey} />
      </div>
    </div>
  );
};

export default Home;
