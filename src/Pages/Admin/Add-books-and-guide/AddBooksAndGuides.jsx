import React from "react";
import { Link } from "react-router-dom";

function AddBooksAndGuides() {
    return (
        <div>
            <div className="container w-100">
                <div className="row ">
                    <div className="col-12 col-lg-6 mt-4">
                        <Link
                            to="/admin/add-books-and-guide/notes"
                            className="  text-decoration-none notes p-2   flex justify-evenly items-center w-full    bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl"
                        >
                            <img
                                src="/books.png"
                                alt=""
                                className="w-25"
                            />
                            <div className="text-white text-md font-bold text-center ">
                                Add Arabimalayalam notes
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-6 mt-4">
                        <Link to='/admin/add-books-and-guide/guides' className=" text-decoration-none   guides p-2   flex justify-evenly items-center w-full    bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                            <img
                                src="/guide-book.png"
                                alt=""
                                className="w-25"
                            />
                            <div className="text-white text-md font-bold text-center ">
                                Add Madrasa Guide
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBooksAndGuides;
