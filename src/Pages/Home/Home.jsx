import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import PrayerTimeDetails from "../../Components/PrayerTimeDetails/PrayerTimeDetails";
import { NavLink, json } from "react-router-dom";
import { useRef } from "react";
import { server } from "../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";
import Services from "../Services/Services";

function Home() {
    const [prayertime, setprayertime] = useState();
    // console.log(prayertime);
    const shouldlog = useRef(true);

    const addview = async () => {
        fetch(`${server}/add-views`, {
            method: "GET",
            Headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            // console.log(response);
            toast.dark("أسلم عليكم  Welcome To QIMK");
        });
    };
    const getprayertime = () => {
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        if (date < 10) date = "0" + date;
        if (month < 10) month = "0" + month;
        let todaysdate = year + "-" + month + "-" + date;
        // console.log(todaysdate);

        fetch(`${server}/get-prayer-time/${todaysdate}`, {
            method: "GET",
            Headers: {
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setprayertime(data);
            } else {
                toast.error(
                    "Something went wrong Failed to get the prayer time"
                );
            }
        });
    };

    useEffect(() => {
        if (shouldlog.current) {
            addview();
            getprayertime();
            shouldlog.current = false;
        }
    }, []);

    return (
        <>
            <div className="home-page">
                {/* hero section */}
                <section className="hero-section">
                    <div className="quote-box-wrapper">
                        <div className="quote-box">
                            <div className="quote">
                                Allah Will Help Him Who Moves In The Way Of
                                Allah
                            </div>
                            <NavLink
                                to="/prayer"
                                className="prayer-button text-decoration-none "
                            >
                                Prayer Time
                            </NavLink>
                        </div>
                        <div className="shadowformosque"></div>
                    </div>
                </section>
                {/* services */}
                <Services home={true} />
                {/* prayer timeing */}
                {prayertime ? (
                    <section className="prayer-timing">
                        <div className="container pb-5">
                            <div className="prayer-timing-heading">
                                Prayer Timing
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-7 mb-3">
                                    <PrayerTimeDetails data={prayertime} />
                                </div>
                                {prayertime.jumma ? (
                                    <div className="col-12 col-md-5">
                                        <div className="khatib-of-jumma w-72">
                                            <div className="khatib-of-jumma-heading">
                                                khatib of jumma khutbha
                                            </div>
                                            <img
                                                src={prayertime.imageofkhatib}
                                                alt=""
                                                className="image-of-khatib  "
                                            />
                                            <div className="name-of-khatib">
                                                {prayertime.nameofkhatib}
                                            </div>
                                            <div className="khutuba-details">
                                                <div className="khutuba-begins-heading">
                                                    Jumma khudba Begin At
                                                </div>
                                                <div className="time-of-jumma-khutuba">
                                                    {prayertime.timeofkhutba} PM
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </section>
                ) : (
                    ""
                )}
                {/* madrasa description section */}
                <section className="madrasa-description-section">
                    <div className="container ">
                        <div className="row ">
                            <p className=" col-md-6 col-12 text-center text-xl flex items-center my-4 description-of-institution">
                                Quwvathul Islam Madrasa, A reliable Islamic
                                Center to follow Quran & Sunah by easy and
                                faster way.
                            </p>
                            <img
                                src="/Memorize-Quran-Fast.jpg"
                                alt=""
                                className="quarn-reading-image col-md-6 col-12"
                            />
                        </div>
                    </div>
                </section>
                {/* namaz-quote */}
                <section className="namaz-quote  ">
                    <div className="container">
                        <div className="row justify-center  ">
                            <img
                                src="/hand-drawn-salat-illustration_23-2149265394.jpg"
                                className="namaz-image col-md-6 col-12"
                                alt=""
                            />
                            <p className="quote-on-namaz col-md-6 col-12   ">
                                Namaz in Islam is a sacred act that allows you
                                to connect with Allah and elevate your prayer
                                experience like never before!
                            </p>
                        </div>
                    </div>
                </section>
                {/* holy places images collash */}
                <section className="holy-places">
                    <div className="container">
                        <div className="images row mx-auto">
                            <img
                                src="/mecca.jpg"
                                alt=""
                                className="img-1 col-6 col-md-3  h-28  mt-2 md:h-36  "
                            />
                            <img
                                src="/mosque-615415_1280.jpg"
                                alt=""
                                className="img-2 col-6 col-md-3  h-28  mt-2 md:h-36 "
                            />
                            <img
                                src="/masjid nabawi.jpg"
                                alt=""
                                className="img-3 col-6 col-md-3  h-28 mb-4 mt-2 md:h-36"
                            />
                            <img
                                src="/medina.jpg"
                                alt=""
                                className="img-4 col-6 col-md-3  h-28 mb-4 mt-2 md:h-36 "
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
