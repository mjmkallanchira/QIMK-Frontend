import React from "react";
import { Link } from "react-router-dom";

function VoteList() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3 col-md-6 mx-auto">
                        <Link
                            to={"/admin/view-score"}
                            className=" text-decoration-none p-4 flex flex-row justify-evenly items-center relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl"
                        >
                            <div className=" text-center text-2xl text-gray-100">
                                View Score
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 mt-3 col-md-6 mx-auto">
                        <Link
                            to={"/admin/add-Representative"}
                            className=" text-decoration-none p-4 flex flex-row justify-evenly items-center relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl"
                        >
                            <div className=" text-center text-2xl text-gray-100">
                                Add Representative
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoteList;
