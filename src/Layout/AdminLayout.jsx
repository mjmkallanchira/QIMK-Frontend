import React, { useContext } from "react";
import SlideBar from "../Components/SlideBar/SlideBar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
function AdminLayout() {
    const { user, ispageloading, token } = useContext(UserContext);

    if (!token) {
        return <Navigate to="/signin" />;
    }
    if (ispageloading) {
        return <h1>Loading.....</h1>;
    }

    if (!user.isadmin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <SlideBar Outlet={Outlet} />
        </div>
    );
}

export default AdminLayout;
