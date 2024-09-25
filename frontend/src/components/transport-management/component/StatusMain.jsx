import axios from "../../../services/axios.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatusCard from "./StatusCard.jsx";

const StatusMain = () => {
    const [vehicle, setVehicle] = useState([]);
    const [count, setCount] = useState([]);
    const [route, setRoute] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const vehiclesRes = await axios.get("/vehicles");
                const routesRes = await axios.get("/routes");

                setVehicle(vehiclesRes.data);
                setRoute(routesRes.data);

                // Set the count after fetching vehicle data
                setCount([
                    { "title": "Vehicles", "count": vehiclesRes.data.length },
                    { "title": "Routes", "count": routesRes.data.length }
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
