//repairs related menu items

const menuItems = [
  {
    name: "Dashboard",
    subItems: [{ name: "Overview", link: "repair/" }],
  },
  {
    name: "Assets",
    subItems: [
      { name: "View Assets", link: "repair/viewassets" },
      { name: "Add New Asset", link: "repair/newasset" },
    ],
  },
  {
    name: "Maintenance",
    subItems: [
      { name: "View Maintenance", link: "repair/maintenance" },
      { name: "New Maintenance", link: "repair/newmaintenance" },
      { name: "Maintenance Scheduler", link: "repair/scheduler" },
      { name: "Task Priority", link: "repair/taskpriority" },
    ],
  },
  {
    name: "Maintenance Requests",
    subItems: [
      { name: "New Requests", link: "repair/reqmaintenance" },
      { name: "View Requests", link: "repair/viewreports" },
    ],
  },
  {
    name: "Tasks",
    subItems: [{ name: "Assigned Tasks", link: "repair/assignedtasks" }],
  },
];

export default menuItems;
