import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Login from "./pages/productManagement/Login.jsx";
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
        path: "*",
        element: <div>Not Found</div>,
    },
]);

export default function Routes() {
    return (
        <RouterProvider router={router}>
            {router}
        </RouterProvider>
    )
}