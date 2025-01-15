import React from 'react';
import Welcome from './../../Components/Welcome';

const DashBoardMain = () => {
    return (
        <div className='bg-gray-100 px-5'>
            <div>
                <Welcome></Welcome>
            </div>
            <div className='w-full mx-auto bg-white h-[550px] shadow  rounded-md'>
                <div className='liear-bg w-full h-28 rounded-t-md'></div>

            </div>
        </div>
    );
};

export default DashBoardMain;