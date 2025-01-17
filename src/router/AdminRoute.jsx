import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import UseAdmin from "../Hooks/UseAdmin";
import { Navigate, useLocation, useNavigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [adminUser,adminLoading] = UseAdmin();
  const [admin, setAdmin]= useState()
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(()=>{
    {
        adminUser?.map(item=>setAdmin(item))
    }
  },[adminUser])
  if (loading || adminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && admin) {
    return children;
  }

  return (navigate(location?.state ? location.state :''));
};

export default AdminRoute;
