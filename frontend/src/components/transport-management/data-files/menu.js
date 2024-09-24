//repairs related menu items

const menuItems = [
  {
    name: "Vehicle management",
    subItems: [
      { name: "Add Vehicle", link: "transport/add-vehicle" },
      { name: "Manage Vehicle", link: "transport/manage-vehicle" },
    ],
  },
  {
    name: "Route management",
    subItems: [
      { name: "Add Route", link: "transport/add-route" },
      { name: "Manage Route", link: "transport/manage-route" },
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
