import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../context/AuthProvider';
import UseAdmin from '../Hooks/UseAdmin';
import UseMeals from '../Hooks/UseMeals';

const AdminProfile = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = useContext(AuthContext);
    const {meals} = UseMeals()
    const {data: admin} = useQuery({
        queryKey:['admin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/admin/${user?.email}`)
            return  res.data;
        }
    })



    return (
        <div>
            <h2>Welcome ! {admin?.name}</h2>
            <img src={admin?.profilePhoto} alt="" />
            <p>Email : {admin?.email}</p>
            <p>You have added {meals?.length} meals</p>
        </div>
    );
};

export default AdminProfile;