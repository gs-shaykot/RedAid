import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useisAdmin";
import useVolunteer from "../Hooks/useisVolunteer";


const AdminRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const [isAdmin, isPending] = useAdmin();
    const [isVolunteer, isLoading] = useVolunteer()
    const location = useLocation();

    if (loader || isPending || isLoading) {
        return <progress className="progress w-56"></progress>
    }

    if ((user && isAdmin) || isVolunteer) {
        return children;
    }



    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;