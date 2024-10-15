//repairs related menu items

const menuItems = [

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
    name: "Distribution Management",
    subItems: [
      { name: "Distribution Management", link: "transport/distribute-management" },
     
    ],
  },
];

export default menuItems;
