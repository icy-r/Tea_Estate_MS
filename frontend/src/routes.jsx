import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Admin from "./Admin.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/admin",
        element: <App />,
        element: <div>user </div>
    },
    {
        path: "/admin/*",
        element: <Admin />,
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