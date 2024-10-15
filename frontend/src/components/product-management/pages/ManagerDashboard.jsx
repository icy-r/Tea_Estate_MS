import React from "react";
import StatusBar from "../component/StatusBar.jsx";
import QualityPie from "../component/productPieChart.jsx";
import UnitPriceBarGraph from "../component/PriceBarchart.jsx";
import TeaPriceBarGraph from "../component/worldTea.jsx";
import Footer from "../../footer/Footer.jsx";
const ManagerDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <StatusBar />
           
            <UnitPriceBarGraph />
                <TeaPriceBarGraph />
              
        <QualityPie />
            <Footer />
                
        </div>
    );
};

export default ManagerDashboard;
