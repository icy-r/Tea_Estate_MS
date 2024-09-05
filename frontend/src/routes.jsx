import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Error404 from "./pages/error404.jsx";

import Login from "./components/product-management/Login.jsx";
import Marketplace from "./pages/productManagement/marketPlace.jsx";


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
        path: "/error404",
        element: <Error404/>,
    },
   
    {
        path: "*",
        element: <Error404 />,
    }
]);

export default function Routes() {
    return (
        <RouterProvider router={router}>
            {router}
        </RouterProvider>
    )
}