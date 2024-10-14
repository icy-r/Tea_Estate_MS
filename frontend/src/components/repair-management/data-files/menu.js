//repairs related menu items

const menuItems = [
  {
    name: "Repair Home",
    subItems: [
      { name: "Dashboard", link: "/repair" },
      { name: "Graphs", link: "/repair/graphs" },
    ],
  },
  {
    name: "Machine",
    subItems: [
      { name: "Machine List", link: "/repair/machine" },
      { name: "Add Machine", link: "/repair/machine/add" },
      { name: "Asset Performance", link: "/repair/asset-performance" },
    ],
  },
  {
    name: "Repair",
    subItems: [
      { name: "Repair List", link: "/repair/reports" },
      { name: "Add Repair", link: "/repair/reports/add" },
    ],
  },
  {
    name: "Maintenance",
    subItems: [
      { name: "Maintenance List", link: "repair/maintenance" },
      { name: "Add Maintenance", link: "repair/newmaintenance" },
      { name: "Task Priority", link: "repair/taskpriority" },
      { name: "Preventive Maintenance", link: "repair/preventive-maintenance" },
    ],
  },
  {
    name: "Technicians",
    subItems: [{ name: "Technician List", link: "repair/technicians" }],
  },
  {
    name: "Inventory",
    subItems: [{ name: "Inventory Management", link: "repair/inventory" }],
  },
];

export default menuItems;
