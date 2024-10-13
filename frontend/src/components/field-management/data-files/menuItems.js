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
    name: "Fertilizer Management",
    subItems: [
      { name: "Add Fertilizer Schedule", link: "field/add-fertilizer" },
      { name: "Manage Fertilizer Schedules", link: "field/manage-fertilizer" },
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
    name: "Insight and Overview",
    subItems: [
      { name: "Field Analysis", link: "field/field-analysis" },
      { name: "Labour Performance", link: "field/labour-performance" },
    ],
  },
];

export default menuItems;
