import FieldRoutes from "../components/field-management/FieldRoutes.jsx";
import TransportHome from '../components/transport-management/pages/TransportHome.jsx';
import RepairRoutes from "../components/repair-management/repair-routes.jsx";
import '../App.css';
import Error404 from "./error404.jsx";
import {Route, Routes} from "react-router-dom";
import {createContext, useState} from "react";
import * as authService from "../services/auth-service.js";
import ProtectedRoutes from "../Routes/ProtectedRoutes.jsx";
import AdminLogin from "./login/AdminLogin.jsx";
import LandingPage from "./landingPage/LandingPage.jsx";

let UserContext;

function App() {
    const [user, setUser] = useState(authService.getUser());
    //context for user to pass the setUser function to other components
    UserContext = createContext({user, setUser});

    const handleAuthEvt = () => {
        setUser(authService.getUser())
    }

    return (
        <>
            <UserContext.Provider value={{user, setUser}}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="auth/login" element={<AdminLogin handleAuthEvt={handleAuthEvt}/>}/>
                    <Route path="/about" element={<div>About</div>}/>
                    <Route path="/" element={
                        <ProtectedRoutes user={user}>
                            <LandingPage user={user}/>
                        </ProtectedRoutes>
                    }/>

                    {/* Protected Routes */}
                    <Route
                        path="/repair/*"
                        element={
                            <ProtectedRoutes user={user}>
                                <RepairRoutes/>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/field/*"
                        element={
                            <ProtectedRoutes user={user}>
                                <FieldRoutes/>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/transport/*"
                        element={
                            <ProtectedRoutes user={user}>
                                <TransportHome/>
                            </ProtectedRoutes>
                        }
                    />

                    {/* Catch-all route */}
                    <Route path="/*" element={<Error404/>}/>
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export {UserContext};
export default App;