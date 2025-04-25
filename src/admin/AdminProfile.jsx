import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../context/AuthProvider";

const AdminProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: admin } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/${user?.email}`);
      return res.data;
    },
  });
  // Get all data
  const { data: meals } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-10">
      <div className="w-11/12 mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-5xl font-semibold text-[#111827] text-center mb-8">
          Welcome, <span className="text-[#06B6D4]">{admin?.name}</span>
        </h2>
        <div className="flex flex-col gap-4 items-center justify-center mb-10">
          <img
            className="w-32 h-32 rounded-full border-4 border-[#6366F1]"
            src={admin?.profilePhoto}
            alt="Profile"
          />
          <p className="text-2xl text-[#111827]">Email: {admin?.email}</p>
          <p className="text-2xl text-[#111827]">
            You have added{" "}
            <span className="font-semibold text-[#F43F5E]">{meals?.length}</span> meals
          </p>
          <button className="btn bg-[#6366F1] text-white hover:bg-[#4F56C0] mt-5 rounded-full px-8 py-2 text-xl">
            Edit your profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
