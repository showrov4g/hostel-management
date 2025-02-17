import React from 'react';
import MealByCategory from '../components/MealByCategory';
import Subscription from '../components/Subscription';
import Newsletter from '../components/Newsletter';
import Banner from '../components/Banner';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
            <MealByCategory></MealByCategory>
            <Subscription></Subscription>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;