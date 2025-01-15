import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

// const useUser = () => {
//     const { user } = useContext(AuthContext)
//     const axiosPub = useAxiosPublic()
//     const [dbUser, setDbuser] = useState([])
//     useEffect(() => {
//         axiosPub.get(`/users?email=${user?.email}`)
//             .then(res => setDbuser(res.data))
//     }, [user?.email, axiosPub])
//     return [{ dbUser }]
// };

const useUser = () => {
    const { user } = useContext(AuthContext)
    const axiosPub = useAxiosPublic()
    const { data: dbUser = [], isPending, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPub.get(`/users?email=${user?.email}`)
            return res.data
        }
    })
    return [{ dbUser, isPending, refetch }]
};

export default useUser;