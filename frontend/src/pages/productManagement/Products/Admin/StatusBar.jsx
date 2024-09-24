import axios from "../../../../services/axios.js";
import { useEffect, useState } from "react";
import StatusCard from "../../../../components/divs/StatusCard";

const StatusBar = () => {
    const [products, setProducts] = useState([]);
    const [Buyers, setBuyers] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const [productsRes, BuyersRes] = await Promise.all([
                axios.get("/products"),
                axios.get("/Buyers")
            ]);

            setProducts(productsRes.data);
            setBuyers(BuyersRes.data);
        };

        fetchDetails().then(r =>
            console.log("Data fetched")
        );

        const getCount = () => [
            { "title": "Products", "count": products.length },
            { "title": "Buyers", "count": Buyers.length }
        ];

        setCount(getCount());
    }, [products.length, Buyers.length]);

    return (
        <div className='w-full flex items-center bg-color_extra justify-between p-2'>
            <StatusCard data={count} />
        </div>
    );  
}

export default StatusBar;