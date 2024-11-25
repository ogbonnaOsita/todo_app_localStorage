import React, { useState, useEffect, useRef } from "react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DatePicker = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankdays, setBlankdays] = useState([]);
  const dateRef = useRef();

  useEffect(() => {
    initDate();
  }, []);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const initDate = () => {
    let today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setDatepickerValue(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ).toDateString()
    );
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const isPastDate = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const getDateValue = (date) => {
    if (isPastDate(date)) return; // Prevent selecting past dates

    let selectedDate = new Date(year, month, date);
    setDatepickerValue(selectedDate.toDateString());

    if (dateRef.current) {
      dateRef.current.value = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    }

    setShowDatepicker(false);
  };

  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month).getDay();

    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankdays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  return (
    <div className="antialiased sans-serif">
      <div className="container mx-auto px-4 py-2">
        <div className="mb-5 w-64">
          <div className="relative">
            <input type="hidden" name="date" ref={dateRef} />
            <input
              type="text"
              readOnly
              value={datepickerValue}
              onClick={() => setShowDatepicker(!showDatepicker)}
              className="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Select date"
            />

            <div
              onClick={() => setShowDatepicker(!showDatepicker)}
              className="absolute top-0 right-0 px-3 py-2 cursor-pointer"
            >
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {showDatepicker && (
              <div
                className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
                style={{ width: "17rem" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-lg font-bold text-gray-800">
                      {MONTH_NAMES[month]}
                    </span>
                    <span className="ml-1 text-lg text-gray-600 font-normal">
                      {year}
                    </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                        month === 0 ? "cursor-not-allowed opacity-25" : ""
                      }`}
                      disabled={month === 0}
                      onClick={() => setMonth(month - 1)}
                    >
                      <svg
                        className="h-6 w-6 text-gray-500 inline-flex"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                        month === 11 ? "cursor-not-allowed opacity-25" : ""
                      }`}
                      disabled={month === 11}
                      onClick={() => setMonth(month + 1)}
                    >
                      <svg
                        className="h-6 w-6 text-gray-500 inline-flex"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap mb-3 -mx-1">
                  {DAYS.map((day, index) => (
                    <div
                      key={index}
                      style={{ width: "14.26%" }}
                      className="px-1"
                    >
                      <div className="text-gray-800 font-medium text-center text-xs">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap -mx-1">
                  {blankdays.map((_, i) => (
                    <div
                      key={i}
                      style={{ width: "14.28%" }}
                      className="text-center border p-1 border-transparent text-sm"
                    ></div>
                  ))}
                  {noOfDays.map((date, i) => (
                    <div
                      key={i}
                      style={{ width: "14.28%" }}
                      className="px-1 mb-1"
                    >
                      <div
                        onClick={() => getDateValue(date)}
                        className={`cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100
                            ${
                              isToday(date)
                                ? "bg-blue-500 text-white"
                                : isPastDate(date)
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 hover:bg-blue-200"
                            }`}
                      >
                        {date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
