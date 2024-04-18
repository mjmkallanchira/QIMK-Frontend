import React, { useContext, useEffect, useState } from "react";
import { server } from "../../Constants/Constant";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
function Dikr() {
    const [data, setdata] = useState([]);
    const { setispageloading } = useContext(UserContext);
    const getalldikr = async () => {
        try {
            setispageloading(true);
            const response = await fetch(`${server}/get-dikr-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setdata(data);
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("Failed to load dikr tab");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getalldikr();
    }, []);

    return (
        <div>
            <div className="column-component">
                <div className="container column-container">
                    <div className="row mx-auto mt-3 ">
                        <div className="col-12 column-heading ">Dikr Pdfs</div>
                        {data.map((obj) => {
                            return (
                                <div className="col-12 mx-auto col-md-7 mt-3">
                                    <NavLink
                                        to={`/dikr/${obj.name}`}
                                        className="single-column text-decoration-none text-white  "
                                    >
                                        {obj.name}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dikr;
