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
    ],
  },
];

export default menuItems;
