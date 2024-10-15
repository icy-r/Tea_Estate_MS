import axios from "axios";
import { useEffect, useState } from "react";
import StatusCard from "../../../components/divs/StatusCard.jsx";

const StatusBar = () => {
    const [catalogs, setCatalog] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [count, setCount] = useState(null); // To handle loading state

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Use correct API URLs
                const [catalogsRes, buyersRes] = await Promise.all([
                    axios.get("http://localhost:3001/api/catalog/"),  // Corrected catalog URL
                    axios.get("http://localhost:3001/api/buyers/"),   // Corrected buyers URL
                ]);

                console.log("Catalogs Response:", catalogsRes.data); // Debugging response
                console.log("Buyers Response:", buyersRes.data);     // Debugging response

                const catalogsData = catalogsRes.data;
                const buyersData = buyersRes.data;

                setCatalog(catalogsData);
                setBuyers(buyersData);

                // Calculate stats and format them for StatusCard
                const catalogsCount = catalogsData.length;
                const buyersCount = buyersData.length;

                console.log("Catalogs Count:", catalogsCount); // Debugging count
                console.log("Buyers Count:", buyersCount);     // Debugging count

                // Set the formatted data for StatusCard
                setCount([
                    { title: "Products", count: catalogsCount },
                    { title: "Buyers", count: buyersCount },
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
                setCount([]); // Handle error by setting an empty count or an error state
            }
        };

        fetchDetails();
    }, []);

    if (!count) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className='w-full flex items-center bg-color_extra justify-between p-2'>
            {count.length > 0 ? (
                <StatusCard data={count} />
            ) : (
                <div>Error loading data</div> // Fallback in case of error
            )}
        </div>
    );
}
export default StatusBar;
