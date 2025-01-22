import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../context/AuthProvider';

const AdminProfile = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = useContext(AuthContext);
    const {data: admin} = useQuery({
        queryKey:['admin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/admin/${user?.email}`)
            return  res.data;
        }
    })
    // get all data 
    const {data: meals}= useQuery({
        queryKey: ['meals'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/meals/${user?.email}`)
            return res.data;
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