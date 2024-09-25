const menuItems = [
  {
    name: "Field Management",
    subItems: [
      { name: "Add Field", link: "/admin/field/add" },
      { name: "Manage Field", link: "/admin/field/manage" },
      { name: "Assign Labours", link: "/admin/field/labours" },
    ],
  },
  {
    name: "Harvest Management",
    subItems: [
      { name: "Add Harvest", link: "/admin/field/add-harvest", active: true },
      { name: "View Harvest", link: "/admin/field/view-harvest" },
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
