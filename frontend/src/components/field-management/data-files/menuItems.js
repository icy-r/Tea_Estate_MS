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
    ],
  },
  {
    name: "Harvest Management",
    subItems: [
      { name: "Add Harvest", link: "field/add-harvest" },
      { name: "View Harvest", link: "field/view-harvest" },
      { name: "Calculate OT", link: "field/calculate-ot" },
    ],
  },
  {
    name: "Fertilizer Management",
    subItems: [
      { name: "Add Fertilizer Schedule", link: "field/add-fertilizer" },
      { name: "Manage Fertilizer Schedules", link: "field/manage-fertilizer" },
    ],
  },
];

export default menuItems;
