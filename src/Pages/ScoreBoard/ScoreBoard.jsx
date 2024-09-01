import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../../Constants/Constant";
import { UserContext } from "../../Context/UserContext";

function ScoreBoard() {
    const [teamfetchdata, setteamfetchdata] = useState([]);
    const { setispageloading } = useContext(UserContext);
    const getteamdata = async () => {
        try {
            setispageloading(true);
            const response = await fetch(`${server}/get-team-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                //descending
                data.sort((a, b) => b.point - a.point);
                console.log(data);
                //
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
    let same = "";
    let sameposition = "";
    let samecolour = {
        bg: "",
        text: "",
    };
    useEffect(() => {
        getteamdata();
    }, []);
    return (
        <div className="my-auto min-h-screen  ">
            <div className="container  py-14   lg:pt-52 w-100">
                <div className=" text-center text-violet-950  text-4xl font-extrabold uppercase line-clamp-6 mt-20">
                    Score Board
                </div>
                <div className="row  justify-center ">
                    {teamfetchdata.map((obj, index) => {
                        let position = null;
                        let colour = {
                            bg: "",
                            text: "",
                        };

                        if (same == obj.point) {
                            position = sameposition;
                            colour = samecolour;
                        } else {
                            if (index == 0) {
                                position = "1st";
                                colour.bg = "success";
                                colour.text ='white'
                                sameposition = position;
                                same = obj.point;
                                samecolour = colour;
                            } else if (index == 1) {
                                position = "2nd";
                                colour.bg = "warning";
                                colour.text="black"
                                sameposition = position;
                                same = obj.point;
                                samecolour = colour;
                            } else if (index == 2) {
                                position = "3rd";
                                colour.bg = "danger";
                                colour.text="white"
                                sameposition = position;
                                same = obj.point;
                                samecolour = colour;
                            }
                        }

                        return (
                            <div className="col-12 my-5 col-lg-5 flex ">
                                <div
                                    type="button"
                                    class="relative min-w-full inline-flex items-center text-sm mx-auto  font-medium text-center text-white  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <div className="  text-decoration-none notes p-2   flex flex-col flex-nowrap content-center justify-around items-center w-full    bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                                        <img
                                            src={obj.image}
                                            alt=""
                                            className=" w-24  my-2 rounded-full"
                                        />
                                        <div className="text-white text-3xl  font-bold text-center  mt-2 ">
                                            {obj.name}
                                        </div>
                                        <div className="text-green-400 text-2xl font-bold text-center mt-3 ">
                                            Points :{" "}
                                            <span className="text-teal-500">
                                                {obj.point}
                                            </span>
                                        </div>
                                    </div>
                                    {/*  */}
                                    {/*  */}
                                    {/*  */}

                                    <span class="sr-only">Notifications</span>
                                    {position?<div
                                        class={`absolute inline-flex items-center bg-${colour.bg} text-${colour.text}  justify-center w-11 h-11 text-xl font-bold  border-2 border-white rounded-full -top-3 -start-3 dark:border-gray-900`}
                                    >
                                        {position}
                                    </div>:''}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard;
