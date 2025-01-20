import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import MealCart from '../components/MealCart';

const UpcomingMEals = () => {
    const axiosPublic = UseAxiosPublic()
    const {data: upcoming}= useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/upcoming-meal')
            return res.data;
        }
    })
    console.log(upcoming);
    return (
        <div>
            <h1>Your Upcoming meals</h1>
            <div className='grid md:grid-cols-4 gap-4 '>
                {
                    upcoming?.map(item=><MealCart item={item} key={item?._id}></MealCart>)
                }
            </div>
        </div>
    );
};

export default UpcomingMEals;