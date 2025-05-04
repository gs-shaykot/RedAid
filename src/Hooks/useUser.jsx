// where to use setLoader(false) in tenstack query ? this setLoader does stop loading 
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useSecure from './useSecure';
import useAxiosPublic from './useAxiosPublic';

const useUser = () => {
    const { user, setLoader } = useContext(AuthContext)
    // const axiosSec = useSecure()
    const axiosPub = useAxiosPublic()
    const { data: dbUser = [], isPending, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPub.get(`/users/filter?email=${user?.email}`,{withCredentials:true})
            return res.data
        }
    })
    if (isPending)
        <span className="loading loading-ring loading-lg"></span>
    return [{ dbUser, isPending, refetch }]
};

export default useUser;