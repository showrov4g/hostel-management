import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const AdminRoute = () => {
    const {user, loading}= useContext(AuthContext)
    const [isAdmin, isAdminLoading] = ()
    return (
        <div>
            
        </div>
    );
};

export default AdminRoute;