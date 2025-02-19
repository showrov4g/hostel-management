import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Overview = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: stats, refetch } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/stats");
      return res.data;
    },
  });
  console.log(stats);

  return (
    <div>
      {/* <div>
        <h2>Dashboard Statistics</h2>
        <p>Total Users: {stats?.totalUsers}</p>
        <p>Total Meals: {stats?.totalMeals}</p>
        <p>Total Requests: {stats?.totalRequests}</p>
        <p>Total Reviews: {stats?.totalReviews}</p>
      </div> */}
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
 


    </div>
  );
};

export default Overview;
