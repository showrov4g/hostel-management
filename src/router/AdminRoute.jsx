import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const AdminRoute = () => {
    const {user, loading}= useContext(AuthContext)
    
    return (
        <div>
            
        </div>
    );
};

export default AdminRoute;