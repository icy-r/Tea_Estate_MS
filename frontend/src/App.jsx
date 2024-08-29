import Menubar from './components/MenuBar/Menubar'   
import {Route, RouterProvider, Routes} from "react-router-dom";
import Header from "./components/navbar/Header.jsx";
import './App.css'

function App() {

  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
        </Routes>
    {/* <Header /> */}
    <Menubar />
    </>
  )
}

export default App
