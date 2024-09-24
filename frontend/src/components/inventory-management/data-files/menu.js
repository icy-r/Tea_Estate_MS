//repairs related menu items

const menuItems = [
  {
    name: "Repair Home",
    subItems: [
      { name: "Dashboard", link: "inventory/create-inventory" },
      { name: "Manage Status", link: "/manage-status" },
    ],
  },
  {
    name: "Machine",
    subItems: [
      { name: "Machine Home", link: "repair/machine/" },
      { name: "Add Machine", link: "/add-machine" },
      { name: "Manage Machine", link: "/manage-machine" },
    ],
  },
  {
    name: "Repair",
    subItems: [
      { name: "Add Repair", link: "/add-repair" },
      { name: "Manage Repair", link: "/manage-repair" },
    ],
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
