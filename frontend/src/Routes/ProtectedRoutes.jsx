import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({user, children}) => {
    if (!user) return <Navigate to="/admin/auth/login"/>
    return children
}

export default ProtectedRoute