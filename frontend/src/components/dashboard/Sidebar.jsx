import React from 'react';


const Sidebar = ({ topMenuItems, menuItems }) => {
    return (
        <div className="bg-color_focus text-white w-64 h-100 flex flex-col pl-8 py-8 pb-24">
            <nav>
                {/* Top Menu Items (e.g., Home, Dashboard, Settings, Profile) */}
                <ul className="mb-4">
                    {topMenuItems.map((item, index) => (
                        <li key={index} className="mb-2 w-100">
                            <a href={item.link || '#'} className={`text-white flex text-sm font-medium   hover:bg-teal-600 hover:text-white transition-all duration-300 ${item.active ? 'bg-teal-500 text-white px-4 py-3' : 'px-4 py-2'}`}>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Other Menu Items (with sub-items) */}
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-1">
                            <a href={item.link || '#'} className="text-white hover:text-gray-300 text-sm font-normal">
                                {item.name}
                            </a>
                            {item.subItems && (
                                <ul className="ml-8 mt-4">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <a 
                                                href={subItem.link || '#'} 
                                                className={`text-white flex font-extralight text-xs items-center text-left hover:bg-teal-600 hover:text-white transition-all duration-300 ${subItem.active ? 'bg-teal-500 text-white px-4 py-3' : 'px-4 py-2'}`}
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
