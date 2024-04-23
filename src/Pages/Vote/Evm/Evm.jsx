import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Sound from "../../../../public/voting sound.mp3";
import { UserContext } from "../../../Context/UserContext";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading/Loading";
function Evm() {
    const { user, ispageloading, fetchloading, token } =
        useContext(UserContext);

    if (!token) {
        return <Navigate to="/signin" />;
    }
    if (fetchloading) {
        return <Loading />;
    }

    if (!user.isadmin) {
        return <Navigate to="/" />;
    }
    const [fetchdata, setfetchdata] = useState();
    const params = useParams();
    console.log(params);
    const { setispageloading } = useContext(UserContext);
    const handlevote = async (name) => {
        setispageloading(true);
        let snd = new Audio(Sound);
        snd.play();
        const response = await fetch(
            `${server}/add-vote/${name}/${params.type}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            toast.success("Vote Added successfully");
            setTimeout(() => {
                setispageloading(false);
            }, 3000);
        } else {
            setispageloading(false);
            toast.error("Failed  to add Vote ");
        }
    };
    const getvoterepresentative = async () => {
        setispageloading(true);

        try {
            const response = await fetch(
                `${server}/getallrepresentatives/${params.type}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setfetchdata(data.Representative);
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("Failed  Loading Vote members");
            }
        } catch (error) {
            console.error(error);
            setispageloading(false);
        }
    };
    useEffect(() => {
        getvoterepresentative();
    }, []);

    return (
        <div>
            <div className="container" style={{ paddingTop: "5em" }}>
                <div className="row">
                    {fetchdata &&
                        fetchdata.map((obj) => {
                            return (
                                <div className="col-6 mt-3 col-md-3 mx-auto ">
                                    <div className="p-3 flex flex-column justify-evenly items-center relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                                        <div className="text-3xl text-center  text-gray-100 font-medium leading-8 ">
                                            <img src={obj.image} alt="" />{" "}
                                        </div>
                                        <div className=" text-center text-2xl text-gray-50">
                                            {obj.name}
                                        </div>
                                        <button
                                            onClick={() => {
                                                handlevote(obj.name);
                                            }}
                                            className=" mt-2 w-full btn btn-success text-center text-2xl text-gray-500"
                                        >
                                            Vote
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Evm;
