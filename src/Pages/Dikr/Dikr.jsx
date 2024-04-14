import React, { useEffect, useState } from "react";
import { server } from "../../Constants/Constant";
import { NavLink } from "react-router-dom";
function Dikr() {
    const [data, setdata] = useState([]);
    const getalldikr = async () => {
        try {
            const response = await fetch(`${server}/get-dikr-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setdata(data);
            } else {
                toast.error("Failed to load dikr tab");
            }
        } catch (error) {
            console.log(error);
        }
    };
    function debugBase64(base64URL, name) {
        var win = window.open();
        win.document.write("<html><head><title>" + name + "</title></head>");
        win.document.write(
            '<body style="margin:0px;padding:0px;" ><iframe src="' +
                base64URL +
                '" frameborder="0" style="border:0;margin:0px; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen ></iframe></body>'
        );
    }
    useEffect(() => {
        getalldikr();
    }, []);

    return (
        <div>
            <div className="column-component">
                <div className="container column-container">
                    <div className="row mx-auto mt-3 ">
                        <div className="col-12 column-heading ">Dikr Pdfs</div>
                        {data.map((obj) => {
                            return (
                                <div className="col-12 mx-auto col-md-7 mt-3">
                                    <NavLink
                                        onClick={() => {
                                            debugBase64(obj.file, obj.name);
                                        }}
                                        className="single-column text-decoration-none text-white  "
                                    >
                                        {obj.name}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dikr;
