import React from "react";
import "./Footer.css";
import {Link} from 'react-router-dom'
function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="container lg:container-fluid ">
                    <div className="row pb-5">
                        <div className="col-12 col-md-3 about mt-5 sm:mt-0">
                            <span>About</span>
                            <p>
                                Quwwat-ul-Islam Madrasa is <br /> an educational
                                institution <br /> that plays a vital role in{" "}
                                <br /> nurturing Islamic knowledge <br /> and
                                values among its <br /> students.
                            </p>
                            <div className="social-media-icons">
                                <img
                                    src="/facebook.png"
                                    className="facebook"
                                    alt=""
                                />
                                <img
                                    src="/twitter.png"
                                    className="twitter"
                                    alt=""
                                />
                                <img
                                    src="/instagram.png"
                                    className="instagram"
                                    alt=""
                                />
                                <img
                                    src="/youtube.png"
                                    className="youtube"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-3 quicklinks mt-5">
                            <span>Quick Links</span>
                            <div className="links">
                                <Link to='/' >Home</Link>
                                <Link to='/services' >Services</Link>
                                <Link to='/prayer' >Prayer Time</Link>
                                <Link to='/live' >Dua Live</Link>
                                <Link to='/dikr' >Dikr Pdf</Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 information mt-5">
                            <span>Information</span>
                            <div className="informativelinks">
                            <Link to='/about' >About Us</Link>
                            <Link to='/contactus' >Contact Us</Link>
                            <Link to='' >Connect</Link>
                            </div>
                        </div>
                        <div className="col-12  col-md-3 quickcontact mt-5">
                            <span>Quick Contact</span>
                            <Link to='https://maps.app.goo.gl/1JLxiJErUUerCKuN6' className="location text-decoration-none">
                                <img src="/map.png" alt="" />
                                <div>
                                    kallanchira , kasaragod,kerala
                                </div>
                            </Link>
                            <Link className="mail text-decoration-none">
                                <img
                                    src="/gmail.png"
                                    alt=""
                                />
                                <div>mjmkallanchira@gmail.com</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
