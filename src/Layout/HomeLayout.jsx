import React from 'react';
import Banner from '../Components/Banner';
import WTDonate from '../Components/WTDonate';
import How from '../Components/How';
import HomeRequests from '../assets/Requests';

const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <WTDonate></WTDonate>
            <How></How>
            <HomeRequests></HomeRequests>
        </div>
    );
};

export default HomeLayout;