//repairs related menu items

const menuItems = [

  {
    name: "Supply Management",
    subItems: [
      { name: "Add Supply", link: "supply/add" },
      { name: "Manage Supply", link: "supply/manage" },
      { name: "Calling for Supplies", link: "supply/calling-supply" },
      
      
    ],
  },
  
  {
    name: "Suppliers Management",
    subItems: [
      { name: "Add Supplier", link: "supply/addsupplier" },
      { name: "Manage Supplier", link: "supply/managesupplier" },
      // { name: "Order Supply", link: "supply/ordersupplies" },
      { name: "View History", link: "supply/viewhistory" },
    ],
  },
  
];

export default menuItems;
