import React, { useEffect, useRef, useState } from "react";
import PrayerTimingTable from "../../../Components/PrayerTimeDetails/PrayerTimeDetails";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";
import PrayerTimeDetails from "../../../Components/PrayerTimeDetails/PrayerTimeDetails";

function AdminHome() {
    const [views, setviews] = useState();
    const [users, setusers] = useState();
    const [prayertimedata, setprayertimedata] = useState();
    const [studentsnumber, setstudentsnumber] = useState(0);
    const shouldlog = useRef(true);

    const getuserviews = async () => {
        try {
            const response = await fetch(`${server}/admin/get-user-views`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data.response[0].views);
                setviews(data.response[0].views);
            } else {
                toast.error("Failed to load views tab");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getusernumber = async () => {
        try {
            const response = await fetch(`${server}/admin/get-all-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log(response)
            if (response.ok) {
                // console.log(response);
                const data = await response.json();
                setusers(data.length);
            } else {
                toast.error("Failed to load users tab");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchstudentdata = async (e) => {
        try {
            const response = await fetch(`${server}/admin/getstudentdata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();

                if (data !=null) {
                    const classmodel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, +1, +2];

                    let boys = data.find((element) => {
                        if (element.gender === "male") {
                            delete element.gender;
                            delete element._id;
                            delete element.__v;
                            return element;
                        }
                    });
                    let girls = data.find((element) => {
                        if (element.gender === "female") {
                            delete element.gender;
                            delete element._id;
                            delete element.__v;
                            return element;
                        }
                    });
                    boys = Object.values(boys);
                    girls = Object.values(girls);
                    const getLength = (arr) => {
                        let a = arr.flat(Infinity);
                        //console.log(a);
                        let b;
                        if ((arr.length = 0)) {
                            b = 0;
                        } else b = a.length;
                        return b;
                    };
                    setstudentsnumber(getLength(boys) + getLength(girls));
                }
                // console.log(data[0]);
            } else {
                toast.error("Failed to fetch student data");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getprayertime = async () => {
        try {
            let today = new Date();
            let date = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            if (date < 10) date = "0" + date;
            if (month < 10) month = "0" + month;
            let todaysdate = year + "-" + month + "-" + date;
            const response = await fetch(
                `${server}/admin/get-prayer-time/${todaysdate}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                // console.log(data.jumma);
                setprayertimedata(data);
            } else {
                toast.error("Failed to load prayer time tab");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (shouldlog.current) {
            getuserviews();
            getusernumber();
            getprayertime();
            fetchstudentdata();
            shouldlog.current = false;
        }
    }, []);

    return (
        <>
            <div className="admin-home-page">
                <div className="statistics container ">
                    <div className="row">
                        <div className="col-12 mt-3 col-md-6 mx-auto">
                            <div className="p-4 flex flex-row justify-evenly items-center relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                                <div className="text-3xl text-center  text-gray-100 font-medium leading-8 ">
                                    {views ? views : ""}
                                </div>
                                <div className=" text-center text-2xl text-gray-500">
                                    Views
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3 col-md-6 mx-auto">
                            <div className="p-4 flex flex-row justify-evenly items-center relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                                <div className="text-3xl text-center  text-gray-100 font-medium leading-8 ">
                                    {users ? users : ""}
                                </div>
                                <div className=" text-center text-2xl text-gray-500">
                                    Users
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3 col-md-6 mx-auto ">
                            <div className="p-4 flex flex-row justify-evenly items-center relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                                <div className="text-3xl text-center  text-gray-100 font-medium leading-8 ">
                                    {studentsnumber ? studentsnumber : ""}
                                </div>
                                <div className=" text-center text-2xl text-gray-500">
                                    Students
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="todays-prayer-time pt-5 text-center pb-32">
                    {/* <span
                        className="text-xl text-gray-800 "
                        style={{ fontWeight: "800" }}
                    >
                        Today's prayer Time{" "}
                    </span>
                    <div>
                        <PrayerTimingTable data={prayertimedata} />
                    </div> */}
                    {prayertimedata && (
                        <section className="">
                            <div className="container pb-5">
                                <div className="prayer-timing-heading">
                                    Prayer Timing
                                </div>
                                <div className="row">
                                    <div className="col-12 shadow-xl col-md-12 mb-3">
                                        <PrayerTimeDetails
                                            data={prayertimedata}
                                        />
                                    </div>
                                    {prayertimedata.jumma && (
                                        <div className="col-12 col-md-6 col-lg-4 mx-auto ">
                                            <div className="khatib-of-jumma shadow-2xl">
                                                <div className="khatib-of-jumma-heading">
                                                    khatib of jumma khutbha
                                                </div>
                                                <img
                                                    src={
                                                        prayertimedata.imageofkhatib
                                                    }
                                                    alt=""
                                                    className="image-of-khatib  "
                                                />
                                                <div className="name-of-khatib">
                                                    {
                                                        prayertimedata.nameofkhatib
                                                    }
                                                </div>
                                                <div className="khutuba-details">
                                                    <div className="khutuba-begins-heading">
                                                        Jumma khudba Begin At
                                                    </div>
                                                    <div className="time-of-jumma-khutuba">
                                                        {
                                                            prayertimedata.timeofkhutba
                                                        }{" "}
                                                        PM
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminHome;
