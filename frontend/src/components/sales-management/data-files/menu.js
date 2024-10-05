//repairs related menu items

const menuItems = [
  {
    name: "Sales Home",
    subItems: [
      { name: "Dashboard", link: "sales/" },
      { name: "Manage Status", link: "/manage-status"   },
    ],
  },
  {
    name: "Auction Managment",
    subItems: [
      { name: "Start Auction", link: "repair/machine/" },
      { name: "Auction Overview", link: "/add-machine" },
     
    ],
  },
  {
    name: "Order Managment",
    subItems: [
      { name: "Add Orders", link: "sales/order" },
      { name: "Manage Orders", link: "sales/manageorders" },
      { name: "Ready To Deliver", link: "/ordersoverview" },

    ],
  },
  {
    name: "Invoice Managment",
    subItems: [
      { name: "Generate Invoice", link: "sales/invoice" },
      { name: "Manage Invoice", link: "sales/addinvoice" },
    ],
  },

];

export default menuItems;
