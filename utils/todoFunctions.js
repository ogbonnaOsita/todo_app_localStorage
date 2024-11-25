import { v4 as uuidv4 } from "uuid";

const getLocalStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Failed to parse localStorage data for key: ${key}`, error);
    return null;
  }
};

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save data to localStorage for key: ${key}`, error);
  }
};

export const getCurrentDate = () => new Date().toISOString().split("T")[0];

export const addTask = (task) => {
  const taskDate = task.date;
  const key = `todo-${taskDate}`;
  const existingData = getLocalStorageData(key) ?? {
    todos: [],
    timestamp: `${taskDate}T00:00:00.000Z`,
  };

  const updatedTodos = [
    ...existingData.todos,
    {
      id: uuidv4(),
      task,
      completed: false,
      date: taskDate,
    },
  ];

  saveToLocalStorage(key, { todos: updatedTodos, timestamp: existingData.timestamp });
  console.log(`Task added for ${taskDate}:`, task);
};

// Load tasks for a specific date
export const loadTasks = (date) => {
  const key = `todo-${date}`;
  const data = getLocalStorageData(key);

  if (!data) {
    console.log(`No tasks found for ${date}`);
    return [];
  }

  return data.todos;
};

// Load all tasks from localStorage
export const loadAllTasks = () => {
  const allTasks = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("todo-")) {
      const data = getLocalStorageData(key);

      if (data && Array.isArray(data.todos)) {
        allTasks.push(data);
      }
    }
  }

  return allTasks;
};

// Update a task and move it if the date changes
export const updateTask = (date, taskId, updatedTaskData) => {
  const currentKey = `todo-${date}`;
  const newKey = `todo-${updatedTaskData.date}`;
  const currentData = getLocalStorageData(currentKey);

  if (!currentData) {
    console.error(`No data found for the date: ${date}`);
    return;
  }

  if (updatedTaskData.date !== date) {
    const newDateData = getLocalStorageData(newKey) ?? {
      todos: [],
      timestamp: `${updatedTaskData.date}T00:00:00.000Z`,
    };

    newDateData.todos.push({
      id: taskId,
      task: updatedTaskData,
      completed: updatedTaskData.completed || false,
    });

    saveToLocalStorage(newKey, newDateData);

    const updatedCurrentTodos = currentData.todos.filter((t) => t.id !== taskId);
    if (updatedCurrentTodos.length > 0) {
      saveToLocalStorage(currentKey, { ...currentData, todos: updatedCurrentTodos });
    } else {
      localStorage.removeItem(currentKey);
    }
  } else {
    const updatedTodos = currentData.todos.map((t) =>
      t.id === taskId
        ? {
            id: taskId,
            task: updatedTaskData,
            completed: updatedTaskData.completed ?? t.completed,
          }
        : t
    );

    saveToLocalStorage(currentKey, { ...currentData, todos: updatedTodos });
  }
};

// Toggle the completion status of a task
export const toggleTaskCompletion = (date, taskId) => {
  const key = `todo-${date}`;
  const data = getLocalStorageData(key);

  if (!data) {
    console.error(`No tasks found for ${date}`);
    return;
  }

  const updatedTodos = data.todos.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveToLocalStorage(key, { todos: updatedTodos, timestamp: data.timestamp });
  console.log(`Task completion status updated for ${date}`);
};

// Delete tasks older than 7 days
export const deleteOldTodos = () => {
  const now = new Date();

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("todo-")) {
      const data = getLocalStorageData(key);

      if (data) {
        const timestamp = new Date(data.timestamp);
        const daysDifference = (now - timestamp) / (1000 * 60 * 60 * 24);

        if (daysDifference > 7) {
          localStorage.removeItem(key);
          console.log(`Deleted to-do list ${key} (older than 7 days)`);
        }
      }
    }
  });
};

// Delete a specific task from localStorage
export const deleteTask = (taskId, date) => {
  const key = `todo-${date}`;
  const data = getLocalStorageData(key);

  if (!data) {
    console.error(`No tasks found for the date: ${date}`);
    return;
  }

  const updatedTodos = data.todos.filter((task) => task.id !== taskId);

  saveToLocalStorage(key, { todos: updatedTodos, timestamp: data.timestamp });
  console.log(`Task with ID ${taskId} deleted for the date: ${date}`);
};

// Get a date string based on a filter
export const getDateFromFilter = (filter) => {
  const today = new Date();
  switch (filter) {
    case "Today":
      return today.toISOString().split("T")[0];
    case "Yesterday":
      return new Date(today.setDate(today.getDate() - 1)).toISOString().split("T")[0];
    default:
      const daysAgo = parseInt(filter.split(" ")[0]);
      today.setDate(today.getDate() - daysAgo);
      return today.toISOString().split("T")[0];
  }
};

// Filter tasks based on filters (date range and status)
export const filterTasks = (allTasks, filters) => {
  const { dateFrom, dateTo, status } = filters;

  const startDate = dateFrom ? new Date(dateFrom) : null;
  const endDate = dateTo ? new Date(dateTo) : null;

  return allTasks
    .filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      if (startDate && endDate) {
        return entryDate >= startDate && entryDate <= endDate;
      } else if (startDate) {
        return entryDate >= startDate;
      } else if (endDate) {
        return entryDate <= endDate;
      }
      return true;
    })
    .flatMap((entry) => entry.todos)
    .filter((task) => {
      if (status === "complete") return task.completed;
      if (status === "incomplete") return !task.completed;
      return true;
    });
};