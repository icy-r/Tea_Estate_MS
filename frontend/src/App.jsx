import { useState } from 'react';
import Menubar from './components/MenuBar/Menubar'   
import {Route, RouterProvider, Routes} from "react-router-dom";
import Header from "./components/navbar/Header.jsx";
import './App.css'

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
        <Header props={setOpen} />
        <Menubar props={[open, setOpen]} />
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
        </Routes>
    </>
  )
}

export default App
