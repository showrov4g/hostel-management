import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const Overview = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: stats, refetch } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/stats");
      refetch();
      return res.data;
    },
  });

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <div className="stat">
        <div className="stat-title">Total Users</div>
        <div className="stat-value">{stats?.totalUsers}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Meals</div>
        <div className="stat-value">{stats?.totalMeals}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Requests</div>
        <div className="stat-value">{stats?.totalRequests}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Total Reviews </div>
        <div className="stat-value">{stats?.totalReviews}</div>
      </div>
    </div>
  );
};

export default Overview;
