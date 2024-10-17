


import axios from "../../../services/axios.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatusCard from "./StatusCard.jsx";
import { set } from "mongoose";

const StatusMain = (supplierid) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [count, setCount] = useState([]);
    const [route, setRoute] = useState([]);
    const [transport, setTransport] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const orders = await axios.get("/ordersSup");
                const routesRes = await axios.get("/routes");
                const transportsRes = await axios.get("/transports");

                setOrderDetails(orders.data);
                setRoute(routesRes.data);
                setTransport(transportsRes.data);

                // Set the count after fetching vehicle data
                setCount([
                    { "title": "Orders", "count": orders.data.length },
                  
                ]);
               
            } catch (error) {
                console.error("Error fetching vehicle data", error);
            }
        };

        fetchDetails();
    }, []);

    return (
        <motion.div
            className='w-full flex items-center bg-color_extra justify-between p-4'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <StatusCard data={count} />
        </motion.div>
    );
};

export default StatusMain;
