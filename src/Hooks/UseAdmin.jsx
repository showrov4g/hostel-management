import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";

const UseAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: adminUser } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin");
      return res.data;
    },
  });

  return [adminUser];
};

export default UseAdmin;
