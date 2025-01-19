import React, { useContext } from "react";
import UseAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = UseAdmin();
  const location = useLocation();
  const token = localStorage.getItem('access-token')

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if(token){
    return children;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
