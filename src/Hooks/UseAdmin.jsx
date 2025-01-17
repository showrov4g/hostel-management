import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UseAdmin = () => {
    const{loading} = useContext(AuthContext)
  const axiosSecure = UseAxiosSecure();
  const { data: adminUser, isPending: adminLoading } = useQuery({
    
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin");
      return res.data;
    },
  });

  return [adminUser,adminLoading];
};

export default UseAdmin;
