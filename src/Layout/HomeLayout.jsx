import React from 'react';
import Banner from '../Components/Banner';
import WTDonate from '../Components/WTDonate';
import How from '../Components/How';
import HomeRequests from '../assets/Requests';
import BlogsCard from '../Components/Blogs';
import ContactSection from '../Components/Form';

const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <WTDonate></WTDonate>
            <How></How>
            <HomeRequests></HomeRequests>
            <BlogsCard/> 
        </div>
    );
};

export default HomeLayout;