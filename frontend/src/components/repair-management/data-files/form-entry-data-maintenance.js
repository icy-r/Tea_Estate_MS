const maintenanceFormData = [
  {
    name: "Maintenance ID",
    required: true,
    placeholder: "maintenance_id",
    type: "text",
  },
  {
    name: "Equipment ID",
    required: true,
    placeholder: "equipment_id",
    type: "text",
  },
  {
    name: "Scheduled Date",
    required: true,
    placeholder: "scheduled_date",
    type: "date",
  },
  {
    name: "Maintenance Type",
    required: true,
    placeholder: "maintenance_type",
    type: "select",
    options: [
      { value: "preventive", label: "Preventive" },
      { value: "corrective", label: "Corrective" },
      { value: "predictive", label: "Predictive" },
    ],
  },
  {
    name: "Technician Assigned",
    required: true,
    placeholder: "technician_assigned",
    type: "text",
  },
  {
    name: "Status",
    required: true,
    placeholder: "status",
    type: "select",
    options: [
      { value: "scheduled", label: "Scheduled" },
      { value: "in_progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
      { value: "cancelled", label: "Cancelled" },
    ],
  },
  {
    name: "Last Maintenance Date",
    required: false,
    placeholder: "last_maintenance_date",
    type: "date",
  },
  {
    name: "Notes",
    required: false,
    placeholder: "notes",
    type: "textarea",
  },
];

export default maintenanceFormData;
