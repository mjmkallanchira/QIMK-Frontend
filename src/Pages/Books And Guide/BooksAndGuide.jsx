import React, { useState } from "react";
import "./BooksAndGuide.css";
import { Link } from "react-router-dom";

function BooksAndGuide() {
    const [state, setstate] = useState("1");
    const selectclass = (data) => {
        setstate(data.target.value);
    };
    return (
        <>
            <div className="books-and-guide-page">
                <div className="container">
                    <div className="row items-center  ">
                        <div className="col-12  ">
                            <div className="books-and-guide-heading">
                                Books And Guide
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="select-container">
                                <select
                                    className="classselect "
                                    name="class"
                                    id=""
                                    onChange={selectclass}
                                >
                                    <option value="1">class :1</option>
                                    <option value="2">class :2</option>
                                    <option value="3">class :3</option>
                                    <option value="4">class :4</option>
                                    <option value="5">class :5</option>
                                    <option value="6">class :6</option>
                                    <option value="7">class :7</option>
                                    <option value="8">class :8</option>
                                    <option value="9">class :9</option>
                                    <option value="10">class :10</option>
                                    <option value="11">class :11</option>
                                    <option value="12">class :12</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mx-auto">
                            <Link
                                className="linktonotes"
                                to={`/booksandguide/arabimalayalamnotes/${state}`}
                            >
                                <div className="arabimalayalam-notes">
                                    <img src="/books.png" alt="" />

                                    <span>Arabimalayama Notes</span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-md-6 mx-auto">
                            <Link
                                className="linktonotes"
                                to={`/booksandguide/madrasaguide/${state}`}
                            >
                                <div className="madrasa-guide">
                                    <img src="/guide-book.png" alt="" />
                                    <span>madrasa guide</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BooksAndGuide;
