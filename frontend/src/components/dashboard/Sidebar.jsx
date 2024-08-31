import React from 'react';
import logo from '@assets/logo.png';

const Sidebar = ({ menuItems }) => {
    return (
        
        <div className="bg-color_focus text-white w-80 h-screen flex flex-col pl-8 py-8">
 
            <div className="mb-8">
            <img src={logo} alt="Logo" className="h-8 w-8" />  
                <h2 className="text-xl font-bold">TEA MANAGEMENT</h2>
            </div>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-4">
                            <a href={item.link || '#'} className="text-white hover:text-gray-300 text-lg font-normal">
                                {item.name}
                            </a>
                            {item.subItems && (
                                <ul className="ml-8 mt-4">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex} className='mb-2'>
                                            <a 
                                                href={subItem.link || '#'} 
                                                className={`text-white flex font-extralight items-center  text-left hover:bg-teal-600 hover:text-white transition-all duration-300  ${subItem.active ? 'bg-teal-500 text-white px-4 py-4' : 'px-4 py-2'}`}
                                            >
                                                {subItem.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
