import React, { useContext, useEffect, useState } from "react";
import { server } from "../../Constants/Constant";
import "./EventUpdates.css";
import { UserContext } from "../../Context/UserContext";
function EventUpdates() {
    const [eventdata, seteventdata] = useState([]);
    const { setispageloading } = useContext(UserContext);
    const geteventdata = async () => {
        try {
            setispageloading(true);
            const response = await fetch(`${server}/get-event-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                seteventdata(data);
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("Failed to load event tab");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        geteventdata();
    }, []);

    return (
        <div>
            <div className="event-updates">
                <div className="container event-updates-container">
                    <div className="row">
                        <div className="col-12 event-updates-heading ">
                            Event Updates
                        </div>
                        {eventdata &&
                            eventdata.map((obj, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="col-12 col-md-8 mx-auto mt-3 event-column "
                                    >
                                        <div className="single-event">
                                            <img src={obj.image} alt="" />
                                            <div className="events-contents">
                                                <div className="description-of-events md:text-sm">
                                                    {obj.description}
                                                    <br />
                                                </div>
                                                <span className="date-of-event">
                                                    Posted On :{obj.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventUpdates;
