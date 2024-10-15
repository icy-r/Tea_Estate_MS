//repairs related menu items

const menuItems = [
  {
    name: "Sales Home",
    subItems: [
      { name: "Dashboard", link: "sales/" },
      
    ],
  },
  {
    name: "Auction Managment",
    subItems: [
      { name: "Start Auction", link: "sales/startAuction/" },
      { name: "Auction Details", link: "sales/addAuction" },
      { name: "Manage Auctions", link: "sales/manageauctions" },
     
    ],
  },
  {
    name: "Order Managment",
    subItems: [
      { name: "Add Orders", link: "sales/order" },
      { name: "Manage Orders", link: "sales/manageorders" },

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
