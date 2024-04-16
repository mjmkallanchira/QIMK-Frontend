import React, { useContext } from "react";

import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Loading from "../Components/Loading/Loading";
import { UserContext } from "../Context/UserContext";

function UserLayout() {
    const { ispageloading } = useContext(UserContext);

    return (
        <>
            {ispageloading ? <Loading /> : ""}
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default UserLayout;
