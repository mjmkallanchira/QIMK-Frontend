import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Services({ home }) {
    console.log(home);
    const navigate = useNavigate();
    return (
        <div>
            <section className="services-section">
                <div className="services-wrapper">
                    <div
                        className={
                            "service-heading line-clamp-6 mt-20" +
                            (home ? "mt-10" : "")
                        }
                    >
                        Services We Provide
                    </div>
                    <div className="services mt-6">
                        {/* 1 */}
                        <Link
                            to="/prayer"
                            className="service service text-decoration-none"
                        >
                            <img
                                src="/time.png"
                                className="service-image"
                                alt=""
                            />
                            <div className="service-name">Prayer Time</div>
                        </Link>
                        {/* 2 */}
                        <Link
                            to="/booksandguide"
                            className="service service text-decoration-none"
                        >
                            <img
                                src="/quran.png"
                                className="service-image"
                                alt=""
                            />
                            <div className="service-name">Guide</div>
                        </Link>
                        {/* 3 */}
                        <Link
                            to="/live"
                            className="service service text-decoration-none"
                        >
                            <img
                                src="/dua.png"
                                className="service-image"
                                alt=""
                            />
                            <div className="service-name">Live Dua</div>
                        </Link>
                        {/* 4*/}
                        <Link
                            to="/events"
                            className="service text-decoration-none"
                        >
                            <img
                                src="/mosque.png"
                                className="service-image"
                                alt=""
                            />
                            <div className="service-name">Event Updates</div>
                        </Link>
                        {home ? (
                            ""
                        ) : (
                            <Link
                                to="/dikr"
                                className="service text-decoration-none"
                            >
                                <img
                                    src="/pdf (1).png"
                                    className="service-image"
                                    alt=""
                                />
                                <div className="service-name">Dikr Pdf</div>
                            </Link>
                        )}
                        {home ? (
                            ""
                        ) : (
                            <Link
                                to="/quran"
                                className="service text-decoration-none"
                            >
                                <img
                                    src="/man.png"
                                    className="service-image"
                                    alt=""
                                />
                                <div className="service-name">
                                    Quran Recitation
                                </div>
                            </Link>
                        )}
                        {home ? (
                            ""
                        ) : (
                            <Link
                                to="/dua"
                                className="service text-decoration-none"
                            >
                                <img
                                    src="/chat.png"
                                    className="service-image"
                                    alt=""
                                />
                                <div className="service-name">Dua Request</div>
                            </Link>
                        )}
                    </div>
                    {home ? (
                        <button
                            onClick={() => {
                                navigate("/services");
                            }}
                            className="view-more-button"
                        >
                            View More
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </section>
        </div>
    );
}

export default Services;
