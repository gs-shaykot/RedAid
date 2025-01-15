import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Footer from './../Components/Footer';

const MainLayout = () => {
    const location = useLocation();
    const noHeader = location.pathname.includes('dashboard');
    return (
        <div className="font-roboto ">
            {noHeader || <NavBar />}
            <Outlet />
            {noHeader || <Footer />}
        </div>
    );
};

export default MainLayout;
