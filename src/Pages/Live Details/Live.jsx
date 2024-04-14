import React, { useEffect, useState } from "react";
import "./Live.css";
import Youtube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import { server } from "../../Constants/Constant";
function Live() {
    const [livedata, setlivedata] = useState([]);
    const getlivedata = async () => {
        try {
            const response = await fetch(`${server}/get-live-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setlivedata(data);
            } else {
                toast.error("Failed to load live tab");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    useEffect(() => {
        getlivedata();
    }, []);

    return (
        <>
            <div className="live-page pt-32 ">
                <div className="live-details-heading">Live Details </div>
                <div className="container live-container">
                    <div className=" row youtube-lives pb-4">
                        {livedata &&
                            livedata.map((obj, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="col-10 col-md-6 mt-3 mx-auto col-lg-4- "
                                    >
                                        <div className="live">
                                            <Youtube
                                                videoId={getYouTubeID(obj.url)}
                                                opts={opts}
                                            />
                                            <span className="name-of-live">
                                                {obj.title}
                                            </span>
                                            <br />
                                            <span className="date-of-posted">
                                                Posted : {obj.date}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Live;
