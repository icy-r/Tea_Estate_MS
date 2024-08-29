import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./Admin.jsx";

const router = createBrowserRouter([
    {
        path: "/",
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