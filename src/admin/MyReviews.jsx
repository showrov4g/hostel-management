import React, { useContext } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthProvider';

const MyReviews = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = useContext(AuthContext);
    const {data: reviews} = useQuery({
        queryKey:['reviews'],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/meals/review/${user?.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <h1>My total reviews:{reviews?.length||0}</h1>
            {/* table  */}
            <div>

            </div>
        </div>
    );
};

export default MyReviews;