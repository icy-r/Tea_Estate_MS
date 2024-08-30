const menu = [
    {
      name: 'Home', link: '/',
      submenu: []
    },
    {
      name: 'Employee Management',link: '/employee',
      submenu: [
        { name: 'Add Employee', link: '/employee/add' },
        { name: 'View Employee', link: '/employee/view' }
      ]
    },
    {
      name: 'Field Management',link: '/field',
      submenu: [
        { name: 'Add Field', link: '/field/add' },
        { name: 'View Fields', link: '/field/view' }
      ]
    },
    {
      name: 'Inventory Management', link: '/inventory',
      submenu: [
        { name: 'Add Inventory', link: '/inventory/add' },
        { name: 'View Inventory', link: '/inventory/view' }
      ]
    },
    {
      name: 'Supply Management', link: '/supply',
      submenu: [
        { name: 'Add Supply', link: '/supply/add' },
        { name: 'View Supplies', link: '/supply/view' }
      ]
    },
  ];

  export default menu;