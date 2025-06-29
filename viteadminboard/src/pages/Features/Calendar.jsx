// src/pages/Features/Calendar.jsx

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { v4 as uuidv4 } from "uuid";

const LOCAL_KEY = "calendar-events";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) setEvents(JSON.parse(stored));
    else
      setEvents([
        { id: uuidv4(), title: "Meeting", date: "2025-06-28" },
        { id: uuidv4(), title: "Product Launch", date: "2025-06-30" },
        { id: uuidv4(), title: "Review Deadline", date: "2025-07-03" },
      ]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(events));
  }, [events]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setNewTitle("");
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Delete event "${clickInfo.event.title}"?`)) {
      setEvents((prev) =>
        prev.filter((event) => event.id !== clickInfo.event.id)
      );
    }
  };

  const handleAddEvent = () => {
    if (newTitle.trim()) {
      setEvents((prev) => [
        ...prev,
        { id: uuidv4(), title: newTitle.trim(), date: selectedDate },
      ]);
      setShowModal(false);
    }
  };

  return (
    <div
      className="p-6 rounded-lg shadow-md"
      style={{ backgroundColor: "var(--card)", color: "var(--text)" }}
    >
      <h2 className="text-2xl font-semibold mb-4">Team Schedule</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "title",
          center: "",
          end: "prev,next today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventColor="var(--accent)"
        height="auto"
        aspectRatio={2}
      />

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white dark:bg-[#1e293b] p-6 rounded-lg w-[90%] max-w-md shadow-lg"
            style={{ color: "var(--text)", backgroundColor: "var(--card)" }}
          >
            <h3 className="text-xl font-semibold mb-4">Add Event</h3>
            <input
              type="text"
              placeholder="Event Title"
              className="w-full p-2 mb-4 rounded border"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                backgroundColor: "var(--input)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-black dark:text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
