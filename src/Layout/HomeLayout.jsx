import React from 'react';
import Banner from '../Components/Banner';
import WTDonate from '../Components/WTDonate';
import How from '../Components/How';
import HomeRequests from '../Components/Requests';
import BlogsCard from '../Components/Blogs'; 
import ContactSection from './../Components/ContactSection';

const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <WTDonate></WTDonate>
            <How></How>
            <HomeRequests></HomeRequests>
            <BlogsCard/>
            <ContactSection/>
        </div>
    );
};

export default HomeLayout;