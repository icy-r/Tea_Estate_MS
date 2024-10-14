import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ topMenuItems, menuItems, setopen }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-color_focus text-white w-64 h-auto flex flex-col pl-8 pb-24">
      <div className="self-end sticky top-0">
        <IoMdClose
          onClick={() => setopen(false)}
          className="text-white text-2xl mt-4 mr-4 cursor-pointer hover:text-gray-300 transition-all duration-300"
        />
      </div>
      <nav>
        {topMenuItems && (
          <ul className="mb-4">
            {topMenuItems.map((item, index) => (
              <li key={index} className="mb-2 w-full">
                <a
                  onClick={() => navigate(`/admin${item.link}`)}
                  className={`text-white flex text-sm font-medium hover:bg-teal-600 hover:text-white transition-all duration-300 ${
                    item.active
                      ? "bg-teal-500 text-white px-4 py-3"
                      : "px-4 py-2"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}

        {menuItems && (
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-1">
                <a
                  onClick={() => navigate(`/admin/repair/${item.link}`)}
                  className="text-white hover:text-gray-300 text-sm font-normal"
                >
                  {item.name}
                </a>
                {item.subItems && (
                  <ul className="ml-8 mt-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          onClick={() => navigate(`/admin/${subItem.link}`)}
                          className={`text-white flex font-extralight text-xs items-center text-left hover:bg-teal-600 hover:text-white transition-all duration-300 ${
                            subItem.active
                              ? "bg-teal-500 text-white px-4 py-3"
                              : "px-4 py-2"
                          }`}
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
        )}
      </nav>
    </div>
  );
};

export default Sidebar;