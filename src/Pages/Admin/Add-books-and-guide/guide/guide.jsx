import React from "react";
import {Link} from 'react-router-dom'
function guide() {
    return (
        <div className="container">
            <div className="row">
                <h1 className="text-center font-bold text-gray-800">Guide</h1>
                <div className="col-12 mt-3 col-md-6 mx-auto">
                    <Link
                        to="/admin/add-books-and-guide/guides/addchapter"
                        className=" text-decoration-none p-4 flex flex-row justify-evenly items-center relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl"
                    >
                        <div className=" text-center text-2xl text-white">
                            Add chapter
                        </div>
                    </Link>
                </div>
                <div className="col-12 mt-3 col-md-6 mx-auto">
                    <Link
                        to="/admin/add-books-and-guide/guides/addsubject"
                        className=" text-decoration-none p-4 flex flex-row justify-evenly items-center relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl"
                    >
                        <div className=" text-center text-2xl text-white">
                            Add Subject
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        //  <AddBooksAndguide componentname='guides' />
    );
}

export default guide;
