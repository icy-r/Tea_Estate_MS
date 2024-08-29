import { Button } from "@mui/material";
import Logo from "../../assets/logo.png";
import { useEffect } from "react";
import ActionButtonTransparent from "../divs/ActionButtonTransparent.jsx";
import ActionButtonColor from "../divs/ActionButtonColor.jsx";

const normalMenu = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "About",
    link: "/about"
  },
  {
    name: "Services",
    link: "/services"
  },
  {
    name: "MarketPlace",
    link: "/marketplace"
  }
];

const specialMenu = [
  {
    name: "Login",
    link: "/login"
  }
];

const Header = () => {
  useEffect(() => {

  }, []);

  return (
    <div className="flex w-full p-3 justify-between">
      <div className="flex justify-between items-center">
        <img src={Logo} alt="Logo" className="h-10" />
        <p>Bio Tea</p>
      </div>
      <div className="flex justify-between items-center">
        {normalMenu.map((item, index) => (
          <ActionButtonTransparent key={index} href={item.link} text={item.name} />
        ))}
        {specialMenu.map((item, index) => (
            <ActionButtonColor key={index} href={item.link} text={item.name} />
        ))}
      </div>
    </div>
  );
};

export default Header;