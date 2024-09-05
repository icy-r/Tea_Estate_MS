import React from "react";
import employeeImg from "../../../assets/dashboard/functioncard/employee.png";
import fieldImg from "../../../assets/dashboard/functioncard/field.png";
import inventoryImg from "../../../assets/dashboard/functioncard/inventory.png";
import supplyImg from "../../../assets/dashboard/functioncard/supply.png";
import salesImg from "../../../assets/dashboard/functioncard/sales.png";
import productImg from "../../../assets/dashboard/functioncard/product.png";
import transportImg from "../../../assets/dashboard/functioncard/transport.png";
import repairImg from "../../../assets/dashboard/functioncard/repair.png";
import Button from "./button.jsx";

// Sample image paths for the icons in each card (Replace with your actual image paths)
const cardData = [
  {
    id: 1,
    title: "Employee Management",
    imgSrc: employeeImg,
    path: "/employee",
  },
  { id: 2, title: "Field Management", imgSrc: fieldImg, path: "/field" },
  {
    id: 3,
    title: "Inventory Management",
    imgSrc: inventoryImg,
    path: "/inventory",
  },
  { id: 4, title: "Supply Management", imgSrc: supplyImg, path: "/supply" },
  { id: 5, title: "Sales Management", imgSrc: salesImg, path: "/sales" },
  { id: 6, title: "Product Management", imgSrc: productImg, path: "/product" },
  {
    id: 7,
    title: "Transport Management",
    imgSrc: transportImg,
    path: "/transport",
  },
  { id: 8, title: "Repair Management", imgSrc: repairImg, path: "/repair" },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-100 md:h-150 sm:h-100 flex items-center justify-center mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-md p-2 text-center transition-transform transform hover:scale-105 pb-2"
          >
            <img
              src={card.imgSrc}
              alt={card.title}
              className="mx-auto mb-4 w-40 h-40"
            />
            <center>
              {" "}
              <Button text={card.title} path={card.path} />
            </center>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
