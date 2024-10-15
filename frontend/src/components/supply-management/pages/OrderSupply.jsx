import React from 'react';
import OrderSupplyForm from '../components/OrderSupplyForm.jsx';
import { useNavigate } from 'react-router-dom';


const OrderSupply = () => {
    return (

        <div>
            <h1 className="text-2xl"><b>Supplier Management</b></h1>
        <div>
          
            <OrderSupplyForm />
        </div>
        </div>
    );
};

export default OrderSupply;
