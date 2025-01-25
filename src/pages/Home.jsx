import React from 'react';
import Banner from '../components/banner';
import MealByCategory from '../components/MealByCategory';
import Subscription from '../components/Subscription';
import Newsletter from '../components/Newsletter';

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