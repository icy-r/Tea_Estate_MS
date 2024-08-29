const Menubar = () => {
  const menu = [
    {
      name: 'Home',
      link: '/',
      submenu: []
    },
    {
      name: 'Employee Management',
      link: '/employee',
      submenu: [
        { name: 'Add Employee', link: '/employee/add' },
        { name: 'View Employee', link: '/employee/view' }
      ]
    },
    {
      name: 'Field Management',
      link: '/field',
      submenu: [
        { name: 'Add Field', link: '/field/add' },
        { name: 'View Fields', link: '/field/view' }
      ]
    },
    {
      name: 'Inventory Management',
      link: '/inventory',
      submenu: [
        { name: 'Add Inventory', link: '/inventory/add' },
        { name: 'View Inventory', link: '/inventory/view' }
      ]
    },
    {
      name: 'Supply Management',
      link: '/supply',
      submenu: [
        { name: 'Add Supply', link: '/supply/add' },
        { name: 'View Supplies', link: '/supply/view' }
      ]
    },
  ];

  return (
    <div className='flex'>
      <div className={'w-72 h-screen bg-color_focus p-2'}>
        <ul>
          {menu.map((item, index) => (
            <li key={index} className='text-white-400 text-sm flex flex-col gap-y-2 cursor-pointer p-2'>
              <div className=" hover:bg-color_extra p-2">
              {item.name}
              </div>
              {item.submenu.length > 0 && (
                <ul className='ml-4 mt-1'>
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex} className='text-white-400 text-sm flex flex-col gap-y-2 cursor-pointer p-2 hover:bg-color_extra'>
                      {subItem.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Home Page</h1>
      </div>
    </div>
  );
};

export default Menubar;
