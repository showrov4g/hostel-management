import React from 'react';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import MealCart from './MealCart';


const Upcoming = () => {

    const axiosPublic = UseAxiosPublic()
    const {data: upcoming}= useQuery({
        queryKey: ['upcoming'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/upcoming-meal?limit=3')
            return res.data;
        }
    })
    console.log(upcoming)

    return (
        <div className='my-20'>
            <div className='my-10'>
                <h1 className='text-2xl md:text-4xl font-semibold text-center'>Next Upcoming Meals</h1>
           
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                        upcoming?.map(item =><MealCart item={item}></MealCart>)
                    }
                </div>
        </div>
    );
};

export default Upcoming;