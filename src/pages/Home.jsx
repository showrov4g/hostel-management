import React from 'react';
import MealByCategory from '../components/MealByCategory';
import Subscription from '../components/Subscription';
import Newsletter from '../components/Newsletter';
import Banner from '../components/Banner';
import Upcoming from '../components/Upcoming';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
            <MealByCategory></MealByCategory>
            <Upcoming></Upcoming>
            <Subscription></Subscription>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;