import { useQuery } from "@tanstack/react-query";
import useSecure from "./useSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";


const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosPub = useAxiosPublic()
    const { data: isAdmin, isPending } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosPub.get(`/users/admin/${user?.email}`); 
            console.log(res.data)
            return res.data?.admin;
        }
    })
    return [isAdmin, isPending]
};

export default useAdmin;