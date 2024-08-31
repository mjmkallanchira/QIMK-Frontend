import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../../Constants/Constant";
import { UserContext } from "../../../../Context/UserContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function AddScore() {
    const { setispageloading } = useContext(UserContext);
    const [teamfetchdata, setteamfetchdata] = useState([]);
    const [pointchange, setpointchange] = useState(null);
    const getteamdata = async () => {
        try {
            setispageloading(true);
            const response = await fetch(`${server}/admin/get-team-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setteamfetchdata(data);
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("failed to load team list ");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getteamdata();
    }, []);
    return (
        <div className="my-auto min-h-screen  ">
            <div className="container pt-5 w-100">
                <div className=" text-center text-slate-900  text-4xl font-extrabold uppercase line-clamp-6 mt-20">
                    Score Board
                </div>
                <div className="row  justify-center ">
                    {teamfetchdata.map((obj) => {
                        return (
                            <div className="col-12 my-5 col-lg-5 ">
                                <div className="  text-decoration-none notes p-2   flex flex-col flex-nowrap content-center justify-around items-center w-full    bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                                    <img
                                        src="/books.png"
                                        alt=""
                                        className="w-25 my-2"
                                    />
                                    <div className="text-white text-2xl  font-bold text-center  mt-2 ">
                                        {obj.name}
                                    </div>
                                    <div className="text-info text-md font-bold text-center   ">
                                        Points :{" "}
                                        <span className="text-lime-400">
                                            {obj.point}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/admin/add-score/change-score/${obj._id}/${obj.name}/${obj.point}`}
                                        class="w-full text-decoration-none text-center bg-yellow-400 col-8 hover:bg-slate-900  hover:text-white  transition   border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        Add Score
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AddScore;
