import React from 'react';
import Banner from '../components/banner';
import MealByCategory from '../components/MealByCategory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealByCategory></MealByCategory>
        </div>
    );
};

export default Home;