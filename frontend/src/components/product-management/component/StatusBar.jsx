import axios from "axios";
import { useEffect, useState } from "react";
import StatusCard from "../../../components/divs/StatusCard.jsx";

const StatusBar = () => {
    const [products, setProducts] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [productsRes, buyersRes, ordersRes, suppliersRes] = await Promise.all([
                    axios.get("/products"),
                    axios.get("/buyers"),
                    axios.get("/orders"),   
                    axios.get("/suppliers")   
                ]);

                setProducts(productsRes.data);
                setBuyers(buyersRes.data);
                setOrders(ordersRes.data);    
                setSuppliers(suppliersRes.data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDetails().then(() => {
            console.log("Data fetched");
        });
    }, []);  // Empty dependency array ensures this effect runs once on mount

    useEffect(() => {
        // Function to dynamically get counts for all components
        const getCount = () => [
            { "title": "Products", "count": products.length },
            { "title": "Buyers", "count": buyers.length },
            { "title": "Orders", "count": orders.length },      // Added Orders count
            { "title": "Suppliers", "count": suppliers.length }  // Added Suppliers count
        ];

        setCount(getCount());
    }, [products, buyers, orders, suppliers]);  // Dependency array updated for new components

    return (
        <div className='w-full flex items-center bg-color_extra justify-between p-2'>
            <StatusCard data={count} />
        </div>
    );
};

export default StatusBar;
