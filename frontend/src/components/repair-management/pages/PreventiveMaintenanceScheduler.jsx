import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const PreventiveMaintenanceScheduler = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchScheduledMaintenance();
  }, []);

  const fetchScheduledMaintenance = async () => {
    try {
      const response = await axios.get("/preventive-maintenance");
      setEvents(
        response.data.map((task) => ({
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Preventive Maintenance Scheduler
      </h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default PreventiveMaintenanceScheduler;
