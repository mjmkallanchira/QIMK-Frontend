import React, { useContext, useEffect, useState } from "react";
import "./About.css";
import { UserContext } from "../../Context/UserContext";
import { server } from "../../Constants/Constant";
import { toast } from "react-toastify";
function About() {
    const { user, setispageloading } = useContext(UserContext);
    const [studentdata, setstudentdata] = useState({
        boys: [],
        girls: [],
    });
    const [educatorsdata, seteducatorsdata] = useState([]);

    const getallstudentdata = async () => {
        try {
            setispageloading(true);
            const response = await fetch(`${server}/getallstudentdata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log(response);
            if (response.ok) {
                // boys
                let data = await response.json();
                let boys = data.find((element) => {
                    return element.gender === "male";
                });
                delete boys.gender;
                delete boys._id;
                delete boys.__v;
                boys = Object.values(boys);
                // console.log(boys);
                // boys
                let girls = data.find((element) => {
                    return element.gender === "female";
                });
                delete girls.gender;
                delete girls._id;
                delete girls.__v;
                girls = Object.values(girls);
                // console.log(girls);
                // console.log(girls);
                setstudentdata({ boys: boys, girls: girls });
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("failed to load students tab");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    const geteducatordata = async () => {
        try {
            setispageloading(true);
            const response = await fetch(`${server}/get-educator-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log(response);
            if (response.ok) {
                const data = await response.json();
                seteducatorsdata(data);
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("Failed to load educators tab");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getallstudentdata();
        geteducatordata();
    }, []);

    return (
        <>
            <div className="about-page">
                <section className="about-section">
                    <div className="wishing-user">
                        <span className="text-xl md:text-4xl ">
                            {user ? user.username : "User"}
                        </span>{" "}
                        أسلم عليكم
                    </div>
                    <div className="description-on-qimk md:w-1/2 ">
                        <div>
                            <span>Quwwat-ul-Islam Madrasa</span> is an
                            educational institution that plays a vital role in
                            nurturing Islamic knowledge and values among its
                            students. Here are some key aspects of
                            Quwwat-ul-Islam Madrasa
                        </div>
                    </div>
                    <div className="points-about-qimk">
                        <div> 1.Importance of the Madrasa</div>
                        <div> 2.Curriculum and Objectives </div>
                        <div> 3.Structured Programs</div>
                        <div> 4.Qualified Staff and Safe Environment</div>
                    </div>
                </section>
                {/* students and members details */}
                <section className="students-section">
                    <div className="heading">Educators of QIMK</div>
                    <div className="container">
                        <div className="row">
                            {educatorsdata.map((obj, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="students-column mt-4 col-12 mx-auto col-md-6 col-lg-4 col-xl-3"
                                    >
                                        <div className="student ">
                                            <img
                                                src={obj.image}
                                                className="students-image rounded-3xl"
                                                alt=""
                                            />
                                            <div className="student-details ">
                                                <span className="students-name   text-xl font-bold ">
                                                    {obj.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="heading mt-4">Students Of QIMK</div>
                    <div className="container">
                        <div className="row">
                            <div className="boys col-12 ">
                                <div className="boys-heading text-center">
                                    Boys
                                </div>
                                {studentdata.boys.map((obj, index) => {
                                    index = index + 1;
                                    return (
                                        <div key={index}>
                                            <div className="text-xl font-bold text-white mt-3 text-center">
                                                class:
                                                {index < 11 ? index : ""}
                                                {index > 11 ? "+" + 2 : ""}
                                                {index < 12 && index > 10
                                                    ? "+" + 1
                                                    : ""}
                                            </div>
                                            <div className="students-card row  ">
                                                {obj.map((obj2, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="students-column mt-4 col-12 mx-auto col-md-6 col-lg-4 col-xl-3"
                                                        >
                                                            <div className="student ">
                                                                <img
                                                                    src={
                                                                        obj2.image
                                                                    }
                                                                    className="students-image rounded-3xl"
                                                                    alt=""
                                                                />
                                                                <div className="student-details">
                                                                    <span className="students-name">
                                                                        {
                                                                            obj2.name
                                                                        }
                                                                    </span>
                                                                    <span className="students-class">
                                                                        Class :
                                                                        {
                                                                            obj2.class
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="girls col-12 ">
                                <div className="girls-heading text-center ">
                                    Girls
                                </div>
                                {studentdata.girls.map((obj, index) => {
                                    index = index + 1;
                                    return (
                                        <div key={index}>
                                            <div className="text-xl font-bold text-white mt-3 text-center">
                                                class:
                                                {index < 11 ? index : ""}
                                                {index > 11 ? "+" + 2 : ""}
                                                {index < 12 && index > 10
                                                    ? "+" + 1
                                                    : ""}
                                            </div>
                                            <div className="students-card row  ">
                                                {obj.map((obj2, index) => {
                                                    // console.log(obj2);
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="students-column mt-4 col-12 mx-auto col-md-6 col-lg-4 col-xl-3"
                                                        >
                                                            <div className="student ">
                                                                <img
                                                                    src={
                                                                        obj2.image
                                                                    }
                                                                    className="students-image rounded-3xl"
                                                                    alt=""
                                                                />
                                                                <div className="student-details">
                                                                    <span className="students-name">
                                                                        {
                                                                            obj2.name
                                                                        }
                                                                    </span>
                                                                    <span className="students-class font-bold text-sm">
                                                                        Class :
                                                                        {
                                                                            obj2.class
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default About;
