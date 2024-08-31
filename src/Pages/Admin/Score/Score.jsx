import React from "react";
import { Link } from "react-router-dom";

function Score() {
    return (
        <div>
            <div className="container w-100">
                <div className=" text-center text-slate-900  text-4xl font-extrabold uppercase line-clamp-6 mt-20">
                    Score
                </div>
                <div className="row ">
                    <div className="col-12 col-lg-6 mt-4">
                        <Link
                            to="/admin/add-team"
                            className=" text-decoration-none   guides p-2 h-32  flex justify-evenly items-center w-full    bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl"
                        >
                            <div className="text-white text-md font-bold text-center ">
                                Add Team
                            </div>
                        </Link>
                    </div>
                    <div className="col-12  col-lg-6 mt-4">
                        <Link
                            to="/admin/add-score"
                            className="  text-decoration-none notes p-2 h-32  flex justify-evenly items-center w-full    bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl"
                        >
                            <div className="text-white text-md font-bold text-center ">
                                Add Score
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Score;
