import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import UseAdmin from '../Hooks/UseAdmin';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext)
    const [adminUser] = UseAdmin();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>;
    }

    if(user && adminUser){
        return children
    }



    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;