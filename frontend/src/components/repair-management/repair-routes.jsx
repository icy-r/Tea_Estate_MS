import {Routes, Route} from "react-router-dom";
import Home from "./pages/home.jsx";

const RepairRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default RepairRoutes;