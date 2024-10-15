import { useState } from 'react';
import Menubar from '@components/MenuBar/Menubar'   
import {Route, RouterProvider, Routes} from "react-router-dom";
import Header from "./components/navbar/Header.jsx";
import Test from "./components/test/test.jsx";

import Header from "@components/navbar/Header.jsx";

import Login from "./pages/productManagement/Login.jsx";
import Catalog from "../src/components/product-management/pages/Catalog.jsx";
import CareerVacancy from './components/employee-management/pages/careersPage.jsx';
import './App.css'
import Form  from 'react-router-dom';



function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
        
        

        <Header props={setOpen} />
        
        <Menubar props={[open, setOpen]} />
        <Header />
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="/login" component={Login} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/add-applicant" element={<CareerVacancy/>} />
        </Routes>
    </>
  )
}

export default App
