const menuItems = [
  {
    name: "Field Management",
    subItems: [
      { name: "Add Field", link: "field/add" },
      { name: "Manage Field", link: "field/manage" },
      { name: "Assign Labours", link: "field/labours" },
    ],
  },
  {
    name: "Harvest Management",
    subItems: [
      { name: "Add Harvest", link: "field/add-harvest" },
      { name: "View Harvest", link: "field/view-harvest" },
    ],
  },
  {
    name: "Transport management",
    subItems: [
      { name: "Schedule a routine", link: "/schedule-routine" },
      { name: "Manage Routines", link: "/manage-routines" },
    ],
  },
  {
    name: "Distribution Management",
    subItems: [
      { name: "Manage Distributions", link: "/manage-distributions" },
      { name: "Delivery Complains", link: "/delivery-complains" },
    ],
  },
];

export default menuItems;
