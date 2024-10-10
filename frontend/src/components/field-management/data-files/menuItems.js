const menuItems = [
  {
    name: "Main",
    subItems: [{ name: "Dashboard", link: "field" }],
  },
  {
    name: "Field Management",
    subItems: [
      { name: "Add Field", link: "field/add" },
      { name: "Manage Field", link: "field/manage" },
      { name: "Assign Labours", link: "field/labours" },
      { name: "Add Field", link: "field/add" },
      { name: "Manage Field", link: "field/manage" },
      { name: "Assign Labours", link: "field/labours" },
    ],
  },
  {
    name: "Harvest Management",
    subItems: [
      { name: "Add Harvest", link: "field/add-harvest", active: true },
      { name: "View Harvest", link: "field/view-harvest" },
    ],
  },
  {
    name: "Fertilizer Management",
    subItems: [
      { name: "Schedule a routine", link: "field/schedule-routine" },
      { name: "Manage Routines", link: "field/manage-routines" },
    ],
  },
  {
    name: "Distribution Management",
    subItems: [
      { name: "Manage Distributions", link: "field/manage-distributions" },
      { name: "Delivery Complains", link: "field/delivery-complains" },
    ],
  },
];

export default menuItems;
