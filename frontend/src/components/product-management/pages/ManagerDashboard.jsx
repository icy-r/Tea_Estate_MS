import React from "react";
import StatusBar from "../component/StatusBar.jsx";
import QualityPie from "../component/productPieChart.jsx";
import UnitPriceBarGraph from "../component/PriceBarchart.jsx";

const ManagerDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <StatusBar />
            <div className="flex justify-between p-4">
                <div className="w-3/4 p-2">
                    <UnitPriceBarGraph />
                </div>
                <div className="w-1/2 p-2">
                    <QualityPie />
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
