import React from 'react';
import "../components/Banner.css"
const Banner = () => {
    return (
        <div className="header bg-no-repeat bg-contain relative h-[34vw] w-auto mx-auto">
            <div>
                <h2>Take your desire meals</h2>
                <p>Meal collections provide an easy way for students to enjoy a variety of food without the hassle of cooking.</p>
                <div>
                    <form>
                        <input type="text" placeholder='Search meals' />
                        <input type="submit" value={"Submit"} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;