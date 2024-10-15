import axios from "axios";
import { useEffect, useState } from "react";
import StatusCard from "../../../components/divs/StatusCard.jsx";

const StatusBar = () => {
    const [catalogs, setCatalog] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [catalogsRes, buyersRes] = await Promise.all([
                    axios.get("/catalogs"),
                    axios.get("/buyers"),
                ]);

                const catalogsData = catalogsRes.data;
                const buyersData = buyersRes.data;

                setCatalog(catalogsData);
                setBuyers(buyersData);

                // Calculate stats and format them for StatusCard
                const catalogsCount = catalogsData.length;
                const buyersCount = buyersData.length;

                // Create formatted data for StatusCard
                setCount([
                    { title: "Products", count: catalogsCount },
                    { title: "Buyers", count: buyersCount },
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDetails();
    }, []);

    return (
        <div className='w-full flex items-center bg-color_extra justify-between p-2'>
            <StatusCard data={count} />
        </div>
    );
}
export default StatusBar;
