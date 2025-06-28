// src/pages/Features/Calendar.jsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const handleDateClick = (arg) => {
    alert(`You clicked on date: ${arg.dateStr}`);
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] text-black dark:text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Team Schedule</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        height="auto"
        events={[
          { title: "Meeting", date: "2025-06-28" },
          { title: "Product Launch", date: "2025-06-30" },
          { title: "Review Deadline", date: "2025-07-03" },
        ]}
        headerToolbar={{
          start: "title",
          center: "",
          end: "prev,next today",
        }}
        dayMaxEventRows={true}
        fixedWeekCount={false}
        aspectRatio={2}
        eventColor="#8b5cf6"
      />
    </div>
  );
};

export default Calendar;
