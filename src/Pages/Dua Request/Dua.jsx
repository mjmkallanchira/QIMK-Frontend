import React, { useContext, useState } from "react";
import { server } from "../../Constants/Constant";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";

function Dua() {
    const [userdata, setuserdata] = useState(true);
    const { user, setispageloading } = useContext(UserContext);
    const [duadetails, setduadetails] = useState({
        name: "",
        email: "",
        reason: "",
    });

    const handleinput = (name, value) => {
        setduadetails({ ...duadetails, [name]: value });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        setispageloading(true);
        try {
            const response = await fetch(`${server}/add-dua-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(duadetails),
            });
            console.log(response);
            if (response.ok) {
                setispageloading(false);
                toast.success("Sended Dua request Successfully");
            } else {
                setispageloading(false);
                toast.error("Failed Sending Dua request Please try again");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    if (user && userdata) {
        setduadetails({
            name: user.username,
            email: user.email,
            reason: "",
        });

        setuserdata(false);
    }

    return (
        <div>
            <div className="contact-page">
                <div className="container contact-page-container ">
                    <div className="row ">
                        <div className="col-12 col-md-6 row mt-5 items-center md:content-start ">
                            <div className="Contactus-heading text-center  ">
                                Dua Request
                            </div>
                            <div className="contact-description text-xs text-center">
                                Certainly! Here's a sentence that conveys the
                                idea of praying to Allah upon filling out and
                                submitting a form: *"As you complete and submit
                                the form, our hearts turn to Allah in prayer."*
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
                                    value={duadetails.name}
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
                                    value={duadetails.email}
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
                                    placeholder="Reason of dua"
                                    className="contact-message"
                                    name="reason"
                                    value={duadetails.reason}
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
                                    value="Send"
                                    className="contact-submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dua;
