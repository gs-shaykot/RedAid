import { useQuery } from "@tanstack/react-query";
import useSecure from "./useSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useSecure()
    const { data: isAdmin, isPending } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`); 
            return res.data?.admin;
        }
    })
    return [isAdmin, isPending]
};

export default useAdmin;