import React from 'react';
import Banner from '../Components/Banner';
import WTDonate from '../Components/WTDonate';
import How from '../Components/How';

const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <WTDonate></WTDonate>
            <How></How>
        </div>
    );
};

export default HomeLayout;