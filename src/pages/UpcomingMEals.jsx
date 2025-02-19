import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import MealCart from '../components/MealCart';

const UpcomingMeals = () => {
    const axiosPublic = UseAxiosPublic()
    const {data: upcoming, isLoading}= useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/upcoming-meal')
            return res.data;
        }
    })
    if(isLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    return (
        <div>
            <h1 className='text-4xl text-center font-bold my-10'>Upcoming meals</h1>
            <div className='grid md:grid-cols-3 gap-5 '>
                {
                    upcoming?.map(item=><MealCart item={item} key={item?._id}></MealCart>)
                }
            </div>
        </div>
    );
};

export default UpcomingMeals;