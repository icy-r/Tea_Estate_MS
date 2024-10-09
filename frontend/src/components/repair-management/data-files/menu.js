//repairs related menu items

const menuItems = [
  {
    name: "Repair Home",
    subItems: [
      { name: "Dashboard", link: "repair" },
      { name: "Manage Status", link: "/manage-status" },
    ],
  },
  {
    name: "Machine",
    subItems: [{ name: "Machine Home", link: "repair/machine" }],
  },
  {
    name: "Repair",
    subItems: [{ name: "Manage Repair", link: "repair/viewreports" }],
  },
  {
    name: "Service",
    subItems: [
      { name: "Add Service", link: "/add-service" },
      { name: "Manage Service", link: "/manage-service" },
    ],
  },
];

export default menuItems;
