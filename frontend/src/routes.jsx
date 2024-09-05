import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Error404 from "./pages/error404.jsx";
import Login from "./components/divs/Login.jsx";
import Layouts from "./components/layouts/AdminDashboardLayout.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>
    },
    {
        path: "/admin/*",
        element: <Admin/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "*",
        element: <Error404/>,
    },
    {
        path: "/layouts/*",
        element: <Layouts/>,
    },
]);

export default function Routes() {
    return (
        <RouterProvider router={router}>
            {router}
        </RouterProvider>
    )
}