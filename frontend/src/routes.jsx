import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import TransportManagementDashboard from "./pages/transportManagement/transportManagementDashboard.jsx";
import Admin from "./Admin.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/admin",
        element: <App />,
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