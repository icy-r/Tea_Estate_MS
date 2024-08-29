import {Route, RouterProvider, Routes} from "react-router-dom";
import Header from "./components/navbar/Header.jsx";
import './App.css'

function Admin() {

  return (
    <>
        <Header />
        <Routes>
            <Route  path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="/repair">
                <Route index element={<div>Repair Home</div>} />
                <Route path="requests/:id" element={<div>Repair ID</div>} />
            </Route>
        </Routes>
    </>
  )
}

export default Admin
