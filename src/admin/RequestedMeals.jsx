import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../context/AuthProvider';

const RequestedMeals = () => {
    const axiosSecure = UseAxiosSecure()
    const {user}= useContext(AuthContext);
    // ---
    const {data: requestMeal, refetch}= useQuery({
        queryKey: ["requested"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/meals/request/${user?.email}`)
            return res.data;
        }
    })
    console.log(requestMeal);
    return (
        <div>
            <h1>My requested Meal: {requestMeal?.length}</h1>
        </div>
    );
};

export default RequestedMeals;