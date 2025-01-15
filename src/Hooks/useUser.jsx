import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { AuthContext } from '../Provider/AuthProvider';

const useUser = () => {
    const { user } = useContext(AuthContext)
    const axiosPub = useAxiosPublic()
    const [dbUser, setDbuser] = useState([])
    useEffect(() => {
        axiosPub.get(`/users?email=${user?.email}`)
            .then(res => setDbuser(res.data))
    }, [user?.email, axiosPub])
    return [{ dbUser }]
};

export default useUser;