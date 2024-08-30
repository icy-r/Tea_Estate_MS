import { useState } from 'react';
import Menubar from '@components/MenuBar/Menubar'
import {Route, RouterProvider, Routes} from "react-router-dom";
import Header from "@components/navbar/Header.jsx";
import Form from '@components/testD/Form.jsx'
import './App.css'
import Design from './components/testD/Design';

function App() {
    const [open, setOpen] = useState(false);
    return (
        <>
        <div className='w-full'>
            <Header props={setOpen} />
            <Menubar props={[open, setOpen]} />
            
            
            <br></br>
            <Design/>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/about" element={<div>About</div>} />
            </Routes>
            </div>
        </>
    )
}

export default App
