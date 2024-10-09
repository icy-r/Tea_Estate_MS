const buyerMenuItems = [
    {
      name: "Welcome To Bio Tea",
      subItems: [
        { name: "Dashboard", link: "buyer/BuyerDashboard" },
        { name: "Profile", link: "buyer/profile" },
        
      ],
    },
    {
      name: "Buyer",
      subItems: [
        {name : "Sign Up", link: "buyer/AddBuyer"},
        { name: "Buyer Details", link: "buyer/ManageBuyer" },
        { name: "Catalog", link: "buyer/Catalog" },
        { name: "Wish List", link: "buyer/WishList" },
        ],
    },

    {
      name: "Our Teas",
      subItems: [
        {name : "Teas", link: "buyer/AddBuyer"},
        ],
    },

    {
      name: "About Us",
      subItems: [
        {name : "Sign Up", link: "buyer/AddBuyer"},
        ],
    },

    {
      name: "Contact US",
      subItems: [
        {name : "Sign Up", link: "buyer/AddBuyer"},
        ],
    },
    

    
  ];
  
  export default buyerMenuItems;
  