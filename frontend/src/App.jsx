import { useState } from 'react';
import Menubar from '@components/MenuBar/Menubar'   
import {Route, RouterProvider, Routes} from "react-router-dom";
import Header from "@components/navbar/Header.jsx";
import Header from "./components/navbar/Header.jsx";
import Login from "./pages/productManagement/Login.jsx";
import MarketPlace from './pages/productManagement/marketPlace.jsx';
import './App.css'

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
            <Route path="/marketplace" component={MarketPlace} />
        </Routes>
    </>
  )
}

export default App
