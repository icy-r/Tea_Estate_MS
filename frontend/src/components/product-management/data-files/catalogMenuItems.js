const catalogMenuItems = [
    {
      name: "Product Management Home",
      subItems: [
        { name: "Dashboard", link: "product/ManagerDashboard" },
        
      ],
    },
    
    {
      name: "Product",
      subItems: [
        { name: "Tea Inventory", link: "product/TeaProducts" },
        { name: "Add Product", link: "product/AddCatalog" },
        { name: "Admin Market Place", link: "product/ManageCatalog" },
        {name : "Catalog", link: "product/Catalog"} 
       
    ],
    },
    {
      name: "Buyer",
      subItems: [
        { name: "Buyer Details", link: "product/ManageBuyer" },
      ],
    },
    
  ];
  
  export default catalogMenuItems;
  