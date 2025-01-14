import React from 'react'; 
import { Outlet } from 'react-router-dom'; 
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className='font-roboto'>
            <NavBar></NavBar>
            <Outlet></Outlet> 
        </div>
    );
};

export default MainLayout;