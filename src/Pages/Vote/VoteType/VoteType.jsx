import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import Loading from "../../../Components/Loading/Loading";

function VoteType() {
    const { user, ispageloading, fetchloading, token } =
        useContext(UserContext);

    if (!token) {
        return <Navigate to="/signin" />;
    }
    if (fetchloading) {
        return <Loading />;
    }

    if (!user.isadmin) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <div className="container">
                <div className="row " style={{ paddingBlock: "5em" }}>
                    <div className="books-and-guide-heading">Vote Type</div>
                    <div className="col-12 col-md-6 mx-auto">
                        <Link className="linktonotes" to="/vote/male-1">
                            <div className="arabimalayalam-notes">
                                <img src="/man (1).png" alt="" />

                                <span>Boys First-Leader</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6 mx-auto">
                        <Link className="linktonotes" to="/vote/male-2">
                            <div className="arabimalayalam-notes">
                                <img src="/man (1).png" alt="" />

                                <span>Boys Second-Leader</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6 mx-auto">
                        <Link className="linktonotes" to="/vote/female-1">
                            <div className="madrasa-guide">
                                <img src="/hijab.png" alt="" />
                                <span>Girls First-Leader</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6 mx-auto">
                        <Link className="linktonotes" to="/vote/female-2">
                            <div className="madrasa-guide">
                                <img src="/hijab.png" alt="" />
                                <span>Girls Second-Leader</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoteType;
