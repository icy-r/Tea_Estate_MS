import React from "react";
import BuyerDetails from "../components/BuyerDetails.jsx";
import ErrorBoundary from "../../ErrorBoundary.jsx";
import Button from "@mui/material/Button";
import { useNavigate, Route, Routes } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import MarketPlace from "../components/marketPlace.jsx";  
import CatalogUpdate from "../components/CatalogUpdate.jsx";
import AddProduct from "../components/addProduct.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAdmin = true;

  return (
    <div className="flex flex-col gap-6 items-center">
      <ErrorBoundary>
        <StatusBar />
      </ErrorBoundary>
      <MarketPlace isAdmin={isAdmin}/>
    </div>
  );
};

export default AdminDashboard;
