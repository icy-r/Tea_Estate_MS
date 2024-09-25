const menuItems = [
  {
    name: "Field Management",
    subItems: [
      { name: "Add Field", link: "field/add" },
      { name: "Manage Field", link: "field/manage" },
    ],
  },
  {
    name: "Labour Management",
    subItems: [{ name: "Assign Labours", link: "field/labours" }],
  },

  {
    name: "Harvest Management",
    subItems: [
      { name: "Add Harvest", link: "field/add-harvest" },
      { name: "View Harvest", link: "field/view-harvest" },
    ],
  },

  {
    name: "Overtime Management",
    subItems: [{ name: "Calculate OT", link: "field/calculate-ot" }],
  },
];

export default menuItems;
