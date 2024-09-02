import axios from "../../../services/axios.js";
import { useEffect, useState } from "react";
import StatusCard from "../../divs/StatusCard.jsx";

const StatusMain = () => {
    const [machines, setMachines] = useState([]);
    const [request, setRequest] = useState([]);
    const [maintenance, setMaintenance] = useState([]);
    const [vehicle, setVehicle] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const [machinesRes, vehiclesRes, repairsRes, maintenancesRes] = await Promise.all([
                axios.get("/machines"),
                axios.get("/vehicles"),
                axios.get("/repairs"),
                axios.get("/maintenances")
            ]);

            setMachines(machinesRes.data);
            setVehicle(vehiclesRes.data);
            setRequest(repairsRes.data);
            setMaintenance(maintenancesRes.data);
        };

        fetchDetails().then(r =>
            console.log("Data fetched")
        );

        const getCount = () => [
            { "title": "Machines", "count": machines.length },
            { "title": "Vehicles", "count": vehicle.length },
            { "title": "Repair Requests", "count": request.length },
            { "title": "Maintenances", "count": maintenance.length }
        ];

        setCount(getCount());
    }, [machines.length, vehicle.length, request.length, maintenance.length]);

    return (
        <div className='w-full flex items-center bg-color_extra justify-between p-2'>
            <StatusCard data={count} />
        </div>
    );
}

export default StatusMain;