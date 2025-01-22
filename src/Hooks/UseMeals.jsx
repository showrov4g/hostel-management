import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const UseMeals = () => {
    const {user} = useContext(AuthContext)
    const {data: meals, refetch}= useQuery({
        queryKey: ['meals'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/meals/${user?.email}`)
            return res.data;
        }
    })
    return [meals, refetch];
};

export default UseMeals;