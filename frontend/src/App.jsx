import { useState } from 'react';
import Menubar from '@components/MenuBar/Menubar'   
import {Route, RouterProvider, Routes} from "react-router-dom";
import Header from "./components/navbar/Header.jsx";
import Test from "./components/test/test.jsx";

import './App.css'
import SupplierDetails from './pages/supplyManagement/SupplierDetails.jsx';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
        <Header />
        <Test/>
        <AddSupplierForm/>

        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
        </Routes>
    </>
  )
}

export default App
