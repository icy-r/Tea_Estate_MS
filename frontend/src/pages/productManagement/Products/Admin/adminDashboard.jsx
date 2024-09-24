import React from "react";
import BuyerDetails from "../../Buyers/BuyerDetails";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import StatusMain from "../../../../components/repair-management/components/StatusMain";
import AddProduct from "../../Products/Admin/AddProduct";
import StatusBar from "./StatusBar";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const isAdmin = true;

    return (
        <div className='flex flex-col gap-6 items-center'>
            <ErrorBoundary>
                <StatusBar />
            </ErrorBoundary>
            <Button variant="contained" color="primary" onClick={() => {
                    navigate('/addProduct');
                }}>
                Add new Product
            </Button>

            {/* Navigate to /marketplace and pass state to handle isAdmin */}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => {
                    navigate("/marketplace", { state: { isAdmin } });
                }}>
                Admin Market Place
            </Button>

            <BuyerDetails />
        </div>
    );
}

export default AdminDashboard;
