//repairs related menu items

const menuItems = [
  {
    name: "Main",
    subItems: [
      { name: "Home", link: "transport/home" },
    ],
  },
  {
    name: "Vehicle management",
    subItems: [
      { name: "Add Vehicle", link: "transport/add-vehicle" },
      { name: "Manage Vehicles", link: "transport/manage-vehicle" },
      { name: "Vehicle Details", link: "transport/vehicle-portal" },
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
    name: "Transport Management",
    subItems: [
      { name: "Configure Transportation", link: "transport/configure-transport" },
      { name: "Manage Transportation", link: "transport/manage-transport" },
      { name: "View daily Transportation", link: "transport/transport-log" },
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
