import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../context/AuthProvider";

const UseAdmin = () => {
  const {user} = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const {data: isAdmin, isPending: isAdminLoading} = useQuery({
    queryKey:[user?.email , "isAdmin"],
    queryFn: async()=>{
      const res = await axiosSecure.get(`/users/admin/${user?.email}`)
     
      return res.data.admin
    }
  })  
    return [isAdmin,isAdminLoading]
};

export default UseAdmin;