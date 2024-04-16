import React, { useContext, useState } from "react";
import "./ContactUs.css";
import { server } from "../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";

function ContactUs() {
    const [userdata, setuserdata] = useState(true);
    const { user, setispageloading } = useContext(UserContext);
    const [contactdetails, setcontactdetails] = useState({
        name: "",
        email: "",
        message: "",
    });
    const handleinput = (name, value) => {
        setcontactdetails({ ...contactdetails, [name]: value });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        setispageloading(true)
        const response = await fetch(`${server}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactdetails),
        });
        if (response.ok) {
            setcontactdetails({
                name: "",
                email: "",
                message: "",
            });
            setispageloading(false)
            toast.success("message sent successfully");
        } else {
            setispageloading(false)
            toast.error(" Failed to sent the message ");
        }
    };
    if (user && userdata) {
        setcontactdetails({
            name: user.username,
            email: user.email,
            message: "",
        });

        setuserdata(false);
    }
    return (
        <>
            <div className="contact-page">
                <div className="container contact-page-container ">
                    <div className="row ">
                        <div className="col-12 col-md-6 row mt-5 items-center md:content-start ">
                            <div className="Contactus-heading text-center  ">
                                Contact Us
                            </div>
                            <div className="contact-description text-xs text-center">
                                Need to get in touch with us? Either fill out
                                the form with your inquiry or find the
                                department email you'd like to contact below
                            </div>
                        </div>
                        <div className="col-12 col-md-6 my-3  ">
                            <form
                                className="contactus-form"
                                onSubmit={handlesubmit}
                            >
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="contact-username"
                                    name="name"
                                    value={contactdetails.name}
                                    onChange={(e) => {
                                        handleinput(
                                            e.target.name,
                                            e.target.value
                                        );
                                    }}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="contact-email"
                                    name="email"
                                    value={contactdetails.email}
                                    onChange={(e) => {
                                        handleinput(
                                            e.target.name,
                                            e.target.value
                                        );
                                    }}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Message"
                                    className="contact-message"
                                    name="message"
                                    value={contactdetails.message}
                                    onChange={(e) => {
                                        handleinput(
                                            e.target.name,
                                            e.target.value
                                        );
                                    }}
                                    required
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="contact-submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;
