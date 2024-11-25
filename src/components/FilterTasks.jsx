import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiArrowDown } from "react-icons/fi";

const FilterTasks = ({ onFilterChange }) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const today = new Date();

  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  // Close the dropdown if the user clicks outside
  const handleOutsideClick = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, handleOutsideClick]);

  // Apply the selected filters
  const handleApplyFilter = () => {
    onFilterChange({ dateFrom, dateTo, status });
    setOpen(false);
  };

  // Clear all filters
  const handleClearFilter = () => {
    setDateFrom("");
    setDateTo("");
    setStatus("all");
    onFilterChange({ dateFrom: "", dateTo: "", status: "all" });
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-expanded={open}
        aria-controls="filter-dropdown"
      >
        Filter Tasks <FiArrowDown className="ml-2" />
      </button>

      {/* Filter Dropdown */}
      {open && (
        <div
          id="filter-dropdown"
          className="absolute left-0 mt-2 w-[20rem] p-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
        >
          <div className="space-y-6">
            {/* Date Range Filter */}
            <div>
              <label
                htmlFor="dateFrom"
                className="block text-sm font-medium text-gray-700"
              >
                Filter By Date Range
              </label>
              <div className="flex items-center mt-2 space-x-2">
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  min={formatDate(today.setDate(today.getDate() - 6))}
                  className="w-[45%] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-900 border-gray-300 text-sm"
                />
                <span className="text-gray-500 w-[10%]">to</span>
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  min={dateFrom || formatDate(new Date())}
                  className="w-[45%] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-900 border-gray-300 text-sm"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label
                htmlFor="taskStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Task Status
              </label>
              <select
                id="taskStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-900 border-gray-300"
              >
                <option value="all">All Tasks</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleApplyFilter}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filter
              </button>
              <button
                onClick={handleClearFilter}
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTasks;
