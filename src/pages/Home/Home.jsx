import React from 'react';
import HeroBanner from './HeroBanner/HeroBanner';
import AvailableLoans from './AvailableLoans/AvailableLoans';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <AvailableLoans></AvailableLoans>
        </div>
    );
};

export default Home;