import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
const localizer = momentLocalizer(moment);

const MaintenanceScheduler = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScheduledMaintenance();
  }, []);

  const fetchScheduledMaintenance = async () => {
    try {
      const response = await axios.get("/maintenances");
      setEvents(
        response.data.map((task) => ({
          id: task._id,
          title: task.description,
          start: new Date(task.scheduledDate),
          end: new Date(task.scheduledDate),
          allDay: true,
        }))
      );
    } catch (error) {
      console.error("Error fetching scheduled maintenance:", error);
    }
  };

  const handleSelectSlot = async ({ start }) => {
    navigate("/admin/repair/newmaintenance", {
      state: { scheduledDate: start },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Maintenance Scheduler</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        selectable
        onSelectEvent={(event) => {
          navigate(`/admin/repair/viewmaintenance/${event.id}`);
        }}
        eventPropGetter={(event, start, end, isSelected) => ({
          style: {
            backgroundColor: "#3174ad",
            color: "black",
            cursor: "pointer",
          },
        })}
        components={{
          dateCellWrapper: ({ children, value }) => (
            <div style={{ backgroundColor: "#f0f0f0", color: "black" }}>
              {children}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default MaintenanceScheduler;
