import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Employee from "./pages/Employee.jsx";
import Login from "./pages/productManagement/Login.jsx";
import Marketplace from "./pages/productManagement/marketPlace.jsx";
import TransportManagementDashboard from "./pages/transportManagement/TransportManagementDashboard.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/admin/*",
        element: <Admin />,
    },
    {
        path: "/marketplace/*",
        element: <Marketplace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/transportManagement/",
        element: <TransportManagementDashboard />,
    },
    {
        path: "*",
        element: <div>Not Found</div>,
    },
    {
        path: "/employee/*",
        element: <Employee />,
    },


    
]);

export default function Routes() {
    return (
        <RouterProvider router={router}>
            {router}
        </RouterProvider>
    )
}