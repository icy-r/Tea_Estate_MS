import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";

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