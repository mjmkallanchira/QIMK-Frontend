import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../../Context/UserContext";
function AddPrayerTime() {
    const navigate = useNavigate();
    const [isjumma, setisjumma] = useState(false);
    const [allprayertime, setallprayertime] = useState([]);
    const [prayertimedata, setprayertimedata] = useState({
        date: "",
        fajr: "",
        zuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
        jumma: false,
        nameofkhatib: "",
        imageofkhatib: "",
        timeofkhutba: "",
    });
    const handleinput = (name, value) => {
        setprayertimedata({ ...prayertimedata, [name]: value });
    };
    const handleimagesubmit = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setprayertimedata({
                ...prayertimedata,
                imageofkhatib: reader.result,
            });
        };
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            fetch(`${server}/admin/add-prayer-time`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(prayertimedata),
            }).then((response) => {
                if (response.ok) {
                    setprayertimedata({
                        date: "",
                        fajr: "",
                        zuhr: "",
                        asr: "",
                        maghrib: "",
                        isha: "",
                        jumma: false,
                        nameofkhatib: "",
                        imageofkhatib: "",
                        timeofkhutba: "",
                    });
                    toast.success("Added prayer time seccessfully");
                    getallprayertime();
                } else {
                    toast.error("The prayer time already exist ");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getallprayertime = async () => {
        try {
            const response = await fetch(
                `${server}/admin/get-all-prayer-time`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log(response);
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setallprayertime(data);
            } else {
                toast.error("Failed to Load all prayer time");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const deleteprayertime = async (id) => {
        try {
            const response = await fetch(
                `${server}/admin/delete-prayer-time/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },

                }
            );
            if (response.ok) {
                getallprayertime();
                toast.success("Deleted prayer time succesfully ");
            } else {
                toast.error("Failed to delete prayer time ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getallprayertime();
    }, []);

    return (
        <>
            <section className="bg-gray-50 dark dark:bg-gray-900 min-h-full ">
                <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto  lg:py-0">
                    <div
                        style={{ marginTop: "1em" }}
                        className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700"
                    >
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add new Prayer Time
                            </h1>
                            <form
                                onSubmit={handlesubmit}
                                className="space-y-4 md:space-y-6"
                                action="#"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Date of Prayer
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
                                        value={prayertimedata.date}
                                        required="true"
                                    />
                                </div>
                                {/* fajr */}
                                <div>
                                    <label
                                        htmlFor="fajr"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Time of Fajr
                                    </label>
                                    <input
                                        type="text"
                                        name="fajr"
                                        id="fajr"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="hh-mm"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={prayertimedata.fajr}
                                    />
                                </div>
                                {/* zuhr */}
                                <div>
                                    <label
                                        htmlFor="zuhr"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Time of Zuhr
                                    </label>
                                    <input
                                        type="text"
                                        name="zuhr"
                                        id="zuhr"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="hh-mm"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={prayertimedata.zuhr}
                                    />
                                </div>
                                {/* asr */}
                                <div>
                                    <label
                                        htmlFor="asr"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Time of Asr
                                    </label>
                                    <input
                                        type="text"
                                        name="asr"
                                        id="asr"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="hh-mm"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={prayertimedata.asr}
                                    />
                                </div>
                                {/* maghrib */}
                                <div>
                                    <label
                                        htmlFor="maghrib"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Time of Maghrib
                                    </label>
                                    <input
                                        type="text"
                                        name="maghrib"
                                        id="maghrib"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="hh-mm"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={prayertimedata.maghrib}
                                    />
                                </div>
                                {/* Isha */}
                                <div>
                                    <label
                                        htmlFor="isha"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Time of Isha
                                    </label>
                                    <input
                                        type="text"
                                        name="isha"
                                        id="isha"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="hh-mm"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={prayertimedata.isha}
                                    />
                                </div>
                                {/* jumma */}
                                <div>
                                    <label
                                        htmlFor="jumma"
                                        className="  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Jumma
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="jumma"
                                        id="jumma"
                                        placeholder="jumma"
                                        onChange={(e) => {
                                            setisjumma(e.target.checked);
                                            handleinput(
                                                e.target.name,
                                                e.target.checked
                                            );
                                        }}
                                        value={prayertimedata.jumma}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                {isjumma ? (
                                    <div className="jummua-form-section space-y-4 md:space-y-6">
                                        {/* name of Khatib */}
                                        <div>
                                            <label
                                                htmlFor="name-of-kathib"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Name of Jumma Khatib
                                            </label>
                                            <input
                                                type="text"
                                                name="nameofkhatib"
                                                id="name-of-kathib"
                                                placeholder="Name"
                                                onChange={(e) => {
                                                    handleinput(
                                                        e.target.name,
                                                        e.target.value
                                                    );
                                                }}
                                                value={
                                                    prayertimedata.nameofkhatib
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        {/* image of Khatib */}
                                        <div>
                                            <label
                                                htmlFor="image-of-kathib"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Image of khatib (it should be in
                                                square resolution)
                                            </label>
                                            <input
                                                type="file"
                                                name="imageofkhatib"
                                                id="image-of-kathib"
                                                placeholder="Image"
                                                onChange={(e) => {
                                                    handleimagesubmit(
                                                        e.target.files[0]
                                                    );
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        {/* image of Khatib */}
                                        <div>
                                            <label
                                                htmlFor="time-of-khutba"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Time of Khutuba
                                            </label>
                                            <input
                                                type="text"
                                                name="timeofkhutba"
                                                id="time-of-khutba"
                                                placeholder="Time"
                                                onChange={(e) => {
                                                    handleinput(
                                                        e.target.name,
                                                        e.target.value
                                                    );
                                                }}
                                                value={
                                                    prayertimedata.timeofkhutba
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <button
                                    type="submit"
                                    className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Add Time
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* table */}
                    <div className="p-6 w-full text-center shadow-2xl mb-1 mt-10  space-y-4 md:space-y-6 sm:p-8">
                        <span className="text-2xl font-medium ">
                            Prayer Timing{" "}
                        </span>
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
                                                        Date Of salah Time
                                                        (yyyy-mm-dd)
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
                                                {allprayertime &&
                                                    allprayertime.map((obj,index) => {
                                                        return (
                                                            <tr key={index} className="bg-white">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                                    {obj.date}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-black">
                                                                    <button
                                                                        onClick={() => {
                                                                            if (
                                                                                window.confirm(
                                                                                    "are you sure you want to delete"
                                                                                )
                                                                            ) {
                                                                                deleteprayertime(
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
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddPrayerTime;
