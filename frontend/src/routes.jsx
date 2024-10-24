import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Error404 from "./pages/error404.jsx";
import Login from "./components/divs/Login.jsx";
import UserLogin from "./components/divs/UserLogin.jsx";
import Layouts from "./components/layouts/AdminDashboardLayout.jsx";
// import Signup from "./components/product-management/components/Signup.jsx"
import Register from "./components/divs/Register.jsx";
import CareerVacancy from './components/employee-management/pages/careersPage.jsx';



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
    path: "/loginUser",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <Register />,
  },

 
  {  
    path: "/add-applicant",
     element: <CareerVacancy/>},
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router}>{router}</RouterProvider>;
}
