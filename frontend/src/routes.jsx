import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Error404 from "./pages/error404.jsx";
import Login from "./components/divs/Login.jsx";
import Register from "./components/divs/Register.jsx";
import SendPdf from './components/employee-management/pages/ApplicantAdd.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/admin/*",
    element: <Admin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {  
    path: "/add-applicant",
     element: <SendPdf/>},
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router}>{router}</RouterProvider>;
}
