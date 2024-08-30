import * as React from 'react';
import Drawer from '@mui/joy/Drawer';
import menu from './menuContent';

const Menubar = (props) => {
  const isOpen = props.props[0];
  const setOpen = props.props[1];
  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <div className='flex'>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className='h-full bg-color_focus'
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className='p-4'>
            <h1 className='text-2xl font-semibold dark:text-white text-white'>Menu</h1>
          </div>
          <div className='border-t border-gray-200 dark:text-white text-white'>
            {menu.map((item) => (
              <div key={item.name} className='p-4'>
                <div className='p-3 hover:bg-color_extra'>
                <a href={item.link}>{item.name}</a></div>
                {item.submenu.length > 0 && (
                  <div className='pl-4 py-2 border-l border-gray-200 dark:text-white text-white'>
                    {item.submenu.map((subItem) => (
                      <div key={subItem.name}>
                        <div  className= 'p-3 hover:bg-color_extra'>
                        <a href={subItem.link}>
                          {subItem.name} 
                        </a></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Menubar;
