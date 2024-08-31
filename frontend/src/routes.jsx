import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Error404 from "./pages/error404.jsx";
import TransportManagementDashboard from "./pages/transportManagement/transportManagementDashboard.jsx";

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
        path: "/transportManagement/",
        element: <TransportManagementDashboard />,
    },
    {
        path: "/error404",
        element: <Error404/>,
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