import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Welcome = () => {
    const { user } = useContext(AuthContext)
    const date = new Date()
    return (
        <div className='flex justify-between p-3'>
            <div>
                <h1>Welcome, {user?.displayName}</h1>
                <p>{date.toDateString()}</p>
            </div>
            <div className='w-12 h-12'>
                <img className=' w-full h-full rounded-full' src={`${user?.photoURL}`} alt="" />
            </div>
        </div>
    );
};

export default Welcome; <div></div>