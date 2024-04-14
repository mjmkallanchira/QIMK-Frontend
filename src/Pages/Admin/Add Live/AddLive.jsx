import React, { useEffect, useState } from "react";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";

function AddLive() {
    const [alllive, setalllive] = useState([]);
    const [livedata, setlivedata] = useState({
        title: "",
        url: "",
        date: "",
    });
    const handleinput = (name, value) => {
        setlivedata({ ...livedata, [name]: value });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${server}/admin/addlive`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(livedata),
            });
            console.log(response);
            if (response.ok) {
                setlivedata({
                    title: "",
                    url: "",
                    date: "",
                });
                getalllive();
                toast.success("Added Live succesfully");
            } else {
                toast.error("Failed to add Live ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getalllive = async () => {
        try {
            const response = await fetch(`${server}/admin/get-all-live`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setalllive(data);
            } else {
                toast.error("Failed to fetch live data");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const deletelive = async (id) => {
        try {
            const response = await fetch(`${server}/admin/delete-live/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                getalllive();
                toast.success("Deleted live succesfully");
            } else {
                toast.error("Failed to deleted live ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getalllive();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="w-full col-12 mx-auto col-md-8 mt-5 dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add new Live
                            </h1>
                            <form
                                onSubmit={handlesubmit}
                                className="space-y-4 md:space-y-6"
                            >
                                {/* date of posted */}
                                <div>
                                    <label
                                        htmlFor="date"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Date of Posted
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="date"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={livedata.date}
                                        required="true"
                                    />
                                </div>
                                {/* name of live*/}
                                <div>
                                    <label
                                        htmlFor="live-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name of Live
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="live-name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Name"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={livedata.title}
                                    />
                                </div>
                                {/* url */}
                                <div>
                                    <label
                                        htmlFor="live-url"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Url of Live
                                    </label>
                                    <input
                                        type="text"
                                        name="url"
                                        id="live-url"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="https://youtube.com"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={livedata.url}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Add Live
                                </button>
                            </form>
                        </div>
                    </div>
                    {/*  live table */}
                    <div className="col-12 col-md-12  mt-5 px-4   rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="live-table w-full h-full   bg-gray-800 border-gray-700 ">
                            <div className="p-6 w-full text-center shadow-2xl   space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex flex-col  ">
                                    <div className="-m-1.5 overflow-x-auto ">
                                        <div className="p-1.5 min-w-full inline-block align-middle ">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full divideblackide-slate-text-slate-950 dark:divide-gray-700">
                                                    <thead>
                                                        <tr className="bg-slate-800 ">
                                                            <th
                                                                scope="col"
                                                                className=" text-center px-6 py-3  text-xs font-medium text-gray-300 uppercase"
                                                            >
                                                                Date Of live
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" text-center px-6 py-3  text-xs font-medium text-gray-300 uppercase"
                                                            >
                                                                Title of live
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" text-center px-6 py-3  text-xs font-medium text-gray-300 uppercase"
                                                            >
                                                                Delete
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                        {alllive &&
                                                            alllive.map(
                                                                (obj) => {
                                                                    return (
                                                                        <tr className="bg-white">
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                                                {
                                                                                    obj.date
                                                                                }
                                                                            </td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                                                {
                                                                                    obj.title
                                                                                }
                                                                            </td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-black">
                                                                                <button
                                                                                    onClick={() => {
                                                                                        if (
                                                                                            window.confirm(
                                                                                                "are you sure you want to delete"
                                                                                            )
                                                                                        ) {
                                                                                            deletelive(
                                                                                                obj._id
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                    className=" btn btn-danger text-white bg-red-600  text-decoration-none "
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddLive;
