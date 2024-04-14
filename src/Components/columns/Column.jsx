import React from "react";
import { NavLink } from "react-router-dom";
import "./Column.css";
function Column({ heading, data }) {
    console.log(data);
    return (
        <>
            <div className="column-component">
                <div className="container column-container">
                    <div className="row mx-auto mt-3 ">
                        <div className="col-12 column-heading ">{heading}</div>
                        {data.map((obj) => {
                            let name = "";
                            if (heading === "chapter") {
                                name = obj.name;
                            } else if (heading === "Subject") {
                                console.log("hai");
                                name = obj.subjectname;
                            }
                            return (
                                <div className="col-12 mx-auto col-md-7 mt-3">
                                    <NavLink
                                        to={`${obj.href}`}
                                        className="single-column text-decoration-none text-white  "
                                    >
                                        {name}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Column;
