import axios from "../../../services/axios.js";
import { useEffect, useState } from "react";
import StatusCard from "../../divs/StatusCard.jsx";

const StatusMain = () => {
    const [invoices, setInvoices] = useState([]);
    const [orders, setOrders] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const [InvoicesRes, OrdersRes, AuctionsRes] = await Promise.all([
                axios.get("/invoices"),
                axios.get("/orders"),
                axios.get("/auctions")
            ]);

            setInvoices(InvoicesRes.data);
            setOrders(OrdersRes.data);
            setAuctions(AuctionsRes.data);
        };
        fetchDetails().then(r =>
            console.log("Data fetched")
        );
        const getCount = () => [
            { "title": "Invoice", "count": invoices.length },
            { "title": "Orders", "count": orders.length },
            { "title": "Auctions", "count": auctions.length }
        ];  
        setCount(getCount());
    }, [invoices.length, orders.length, auctions.length]);

    return (
        <div className='w-full flex items-center bg-color_extra justify-between p-2'>
            <StatusCard data={count} />
        </div>
    );
}

export default StatusMain;