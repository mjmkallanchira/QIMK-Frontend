import React, { useEffect, useState } from "react";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";

function AddEvents() {
    const [allevents, setallevents] = useState([]);
    const [eventdata, seteventdata] = useState({
        description: "",
        image: "",
        date: "",
    });

    const handleinput = (name, value) => {
        seteventdata({ ...eventdata, [name]: value });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${server}/admin/addevent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventdata),
            });
            console.log(response);
            if (response.ok) {
                seteventdata({
                    description: "",
                    Image: "",
                    date: "",
                });
                getallevent();
                toast.success("Added event succesfully");
            } else {
                toast.error("Failed to add event ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getallevent = async () => {
        try {
            const response = await fetch(`${server}/admin/get-all-events`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setallevents(data);
            } else {
                toast.error("Failed to fetch Event data");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const deletelevent = async (id) => {
        try {
            const response = await fetch(`${server}/admin/delete-event/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                getallevent();
                toast.success("Deleted Event succesfully");
            } else {
                toast.error("Failed to deleted event ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleimageinput = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            seteventdata({
                ...eventdata,
                image: reader.result,
            });
        };
    };
    useEffect(() => {
        getallevent();
    }, []);
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="w-full col-12 mx-auto col-md-8 mt-5 dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add new Event
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
                                        value={eventdata.date}
                                        required="true"
                                    />
                                </div>
                                {/* name of event*/}
                                <div>
                                    <label
                                        htmlFor="event-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description On Event
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="event-name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Name"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={eventdata.description}
                                    />
                                </div>
                                {/* image */}
                                <div>
                                    <label
                                        htmlFor="event-image"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        image of event
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="event-image"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required="true"
                                        onChange={(e) => {
                                            handleimageinput(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Add event
                                </button>
                            </form>
                        </div>
                    </div>
                    {/*  event table */}
                    <div className="col-12 col-md-12  mt-5 px-4   rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="event-table w-full h-full   bg-gray-800 border-gray-700 ">
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
                                                                Date Of Event
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" text-center px-6 py-3  text-xs font-medium text-gray-300 uppercase"
                                                            >
                                                                description of
                                                                event
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
                                                        {allevents &&
                                                            allevents.map(
                                                                (
                                                                    obj,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <tr
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="bg-white"
                                                                        >
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                                                {
                                                                                    obj.date
                                                                                }
                                                                            </td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                                                {
                                                                                    obj.description
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
                                                                                            deletelevent(
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

export default AddEvents;
