import Logo from "@assets/logo.png";
import {useState, useEffect} from "react";
import ActionButtonTransparent from "@divs/ActionButtonTransparent.jsx";
import ActionButtonColor from "@divs/ActionButtonColor.jsx";
import {motion} from "framer-motion";

const menuItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Services", link: "/services" },
  { name: "MarketPlace", link: "/marketplace" },
  { name: "Login", link: "/admin", special: true },
];

const Header = (props) => {
    const setOpen = props.props;
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setOpen(true);
        console.log("closeNav");
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
      <div
        className={`flex w-full p-3 justify-between items-center px-14 transition-all duration-300 ${
          scrolled ? "bg-color_focus" : "bg-transparent"
        }`}
        id="menuContainer"
      >
        <div className="flex items-center" onClick={closeNav}>
          <img src={Logo} alt="Bio Tea Logo" className="h-10" />
          <p className="px-3 font-semibold text-white text-lg">Bio Tea</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {menuItems
            .filter((item) => !item.special)
            .map((item) => (
              <ActionButtonTransparent
                key={item.name}
                href={item.link}
                text={item.name}
              />
            ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex flex-row-reverse">
          <button onClick={toggleNav} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div className="md:hidden items-center space-x-4 px-3">
            {menuItems
              .filter((item) => item.special)
              .map((item) => (
                <ActionButtonColor
                  key={item.name}
                  href={item.link}
                  text={item.name}
                />
              ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {nav && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="absolute top-16 left-0 w-full flex flex-col bg-white_modified items-center justify-center space-y-4 z-50"
          >
            {menuItems
              .filter((item) => !item.special)
              .map((item) => (
                <ActionButtonTransparent
                  key={item.name}
                  href={item.link}
                  text={item.name}
                />
              ))}
          </motion.div>
        )}

        {/* Login Button */}
        <div className="hidden md:flex items-center space-x-4">
          {menuItems
            .filter((item) => item.special)
            .map((item) => (
              <ActionButtonColor
                key={item.name}
                href={item.link}
                text={item.name}
              />
            ))}
        </div>

        {/* another button for admin, and login */}
        <div className="flex items-center space-x-4">
          <ActionButtonColor href="/admin" text="Admin" />
          <ActionButtonColor href="/login" text="Login" />
        </div>
      </div>
    );
};

export default Header;
