import React, { useContext } from "react";
import SlideBar from "../Components/SlideBar/SlideBar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
function AdminLayout() {
    const { user, ispageloading, fetchloading, token } = useContext(UserContext);

    if (!token) {
        return <Navigate to="/signin" />;
    }
    if (fetchloading) {
        return <Loading />;
    }

    if (!user.isadmin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {ispageloading ? <Loading /> : ""}
            <SlideBar Outlet={Outlet} />
        </div>
    );
}

export default AdminLayout;
