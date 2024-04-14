import React, { useEffect, useState } from "react";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";

function DikrPdf() {
    const [dikrdetails, setdikrdetails] = useState({
        name: "",
        file: "",
    });
    const [fetchdata, setfetchdata] = useState([]);
    const handleinput = (name, value) => {
        setdikrdetails({ ...dikrdetails, [name]: value });
    };
    const handlefile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            setdikrdetails({
                ...dikrdetails,
                file: reader.result,
            });
        };
    };
    const getalldikrs = async () => {
        try {
            const response = await fetch(`${server}/admin/get-dikr-pdf`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setfetchdata(await response.json());
            } else {
                toast.error("Failed loading  pdf  ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${server}/admin/add-dikr-pdf`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dikrdetails),
            });
            if (response.ok) {
                setdikrdetails({ name: "", file: "" });
                getalldikrs();
                toast.success("added pdf successfully");
            } else {
                toast.error("Dikr Already Exist ");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deletedikr = async (id) => {
        try {
            const response = await fetch(
                `${server}/admin/delete-dikr-pdf/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                getalldikrs();
                set;
                toast.success("Deleted Dikr pdf successfully  ");
            } else {
                toast.error("Failed deleting  pdf  ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getalldikrs();
    }, []);

    return (
        <div>
            <section className="bg-gray-50 dark dark:bg-gray-900 pt-20 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mb-5 mt-5 mx-auto  lg:py-0">
                    <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add Dikr Pdf
                            </h1>
                            <form
                                onSubmit={handlesubmit}
                                className="space-y-4 md:space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name for Pdf
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Name"
                                        required
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={dikrdetails.name}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="file"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        File
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        placeholder="File"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={(e) => {
                                            handlefile(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col dark  pb-4 ">
                <span className="mx-auto font-bold text-3xl mb-6 ">Pdfs</span>
                <div className="-m-1.5 overflow-x-auto ">
                    <div className="p-1.5 min-w-full inline-block align-middle ">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y  bg-slate-500   divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchdata &&
                                        fetchdata.map((obj, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                        {obj.name}
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                        <button
                                                            onClick={() => {
                                                                if (
                                                                    window.confirm(
                                                                        `Are you Sure You want to delete pdf`
                                                                    )
                                                                ) {
                                                                    deletedikr(
                                                                        obj._id
                                                                    );
                                                                }
                                                            }}
                                                            className="btn btn-danger"
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
    );
}

export default DikrPdf;
