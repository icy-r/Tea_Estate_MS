const buyerMenuItems = [
    {
      name: "Welcome To Bio Tea",
      subItems: [
    
        { name: "Profile", link: "buyer/profile" },
        
      ],
    },
    {
      name: "Buyer",
      subItems: [
        {name : "Sign Up", link: "buyer/AddBuyer"},
        { name: "Catalog", link: "buyer/Catalog" },
        { name: "Wish List", link: "buyer/WishList" },
        { name: "Manage Buyer", link: "buyer/ManageBuyer" },
        { name:"Order Tracking", link: "buyer/OrderTracking" },
        ],
    },

    {
      name: "Our Teas",
      subItems: [
        {name : "Teas", link: "buyer/TeaCollection"},
        ],
    },

    {
      name: "About Us",
      subItems: [
        {name : "About Us", link: "buyer/AddBuyer"},
        ],
    },

    {
      name: "Contact US",
      subItems: [
        {name : "Contact US", link: "buyer/AddBuyer"},
        ],
    },
    

    
  ];
  
  export default buyerMenuItems;
  