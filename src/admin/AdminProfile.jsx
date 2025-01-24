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
            <h2 className='text-5xl font-semibold'>Welcome ! <span className='text-gray-500'>{admin?.name}</span></h2>
            <img className='w-28 h-28 rounded-full' src={admin?.profilePhoto} alt="" />
            <p className='text-3xl'>Email : {admin?.email}</p>
            <p className='text-3xl'>You have added {meals?.length} meals</p>
        </div>
    );
};

export default AdminProfile;