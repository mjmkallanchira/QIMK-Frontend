import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../../../Context/UserContext";
function AddRepresentative() {
    const { setispageloading } = useContext(UserContext);
    const [fetchdata, setfetchdata] = useState([]);
    const [filterdata, setfilterdata] = useState([]);
    const [Representativedetails, setRepresentativedetails] = useState({
        name: "",
        image: "",
        type: "",
    });
    const [deleteRepresentativedetails, setdeleteRepresentativedetails] =
        useState({
            type: "",
            name: "",
        });
    const getrepresentaivedata = async () => {
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/get-all-representative`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                setfetchdata(await response.json());
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("Failed to Get representative data");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            setispageloading(true);
            const response = await fetch(`${server}/admin/add-Representative`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Representativedetails),
            });
            if (response.ok) {
                setRepresentativedetails({ name: "", image: "", type: "" });
                setispageloading(false);
                toast.success("Added successfully");
                getrepresentaivedata();
            } else {
                const error = await response.json();
                if (error.err) {
                    toast.error(error.err)
                    setispageloading(false);
                } else {
                    toast.error("Failed Adding");
                    setispageloading(false);
                }
            }
        } catch (error) {
            console.error(error);
            setispageloading(false);
        }
    };
    const handleinput = async (name, value) => {
        setRepresentativedetails({ ...Representativedetails, [name]: value });
    };
    const handledeletenameinput = async (value) => {
        setdeleteRepresentativedetails({
            ...deleteRepresentativedetails,
            name: value,
        });
    };
    const handledeletetypeinput = async (value) => {
        console.log(value);
        setdeleteRepresentativedetails({
            ...deleteRepresentativedetails,
            type: value,
        });
        const filteredname = fetchdata.filter((obj) => obj.type === value);
        setfilterdata(filteredname[0].Representative);
    };
    const handleimageinput = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setRepresentativedetails({
                ...Representativedetails,
                image: reader.result,
            });
        };
    };
    const handledeletesubmit = async (e) => {
        e.preventDefault();
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/delete-representatives`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deleteRepresentativedetails),
                }
            );
            if (response.ok) {
                setdeleteRepresentativedetails({ name: "", type: "" });
                setispageloading(false);
                toast.success("Deleted representatives Successfully");
                getrepresentaivedata();
            } else {
                setispageloading(false);
                toast.error("Failed to Delete representative");
            }
        } catch (error) {
            setispageloading(false);
            console.error(error);
        }
    };
    useEffect(() => {
        getrepresentaivedata();
    }, []);

    return (
        <div>
            <section className="bg-gray-50 dark dark:bg-gray-900 pt-20 pb-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add Representative
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handlesubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name"
                                        required
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={Representativedetails.name}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="event-image"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        image of Symbol
                                    </label>
                                    <input
                                        required
                                        type="file"
                                        name="image"
                                        placeholder="image"
                                        id="event-image"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => {
                                            handleimageinput(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                <div className="my-2 ">
                                    <label
                                        for="class"
                                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Type
                                    </label>
                                    <select
                                        required
                                        placeholder="Type"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={Representativedetails.type}
                                        name="type"
                                        className="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="male-1">
                                            Boys First-Leader
                                        </option>
                                        <option value="male-2">
                                            Boys Second-Leader
                                        </option>
                                        <option value="female-1">
                                            Girls First-Leader
                                        </option>
                                        <option value="female-2">
                                            Girls Second-Leader
                                        </option>
                                    </select>
                                </div>
                                <input
                                    type="submit"
                                    value="Add"
                                    className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                />
                                Add
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/* Delete representatives */}
            <section className="bg-gray-50 dark dark:bg-gray-900 pt-20 pb-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className=" text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Delete Representative
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handledeletesubmit}
                            >
                                <div className="my-2 ">
                                    <label
                                        for="class"
                                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Type
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            handledeletetypeinput(
                                                e.target.value
                                            );
                                        }}
                                        value={deleteRepresentativedetails.type}
                                        name="type"
                                        className="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option>Select Type</option>
                                        <option value="male-1">
                                            Boys First-Leader
                                        </option>
                                        <option value="male-2">
                                            Boys Second-Leader
                                        </option>
                                        <option value="female-1">
                                            Girls First-Leader
                                        </option>
                                        <option value="female-2">
                                            Girls Second-Leader
                                        </option>
                                    </select>
                                </div>
                                <div className="my-2 ">
                                    <label
                                        for="class"
                                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            handledeletenameinput(
                                                e.target.value
                                            );
                                        }}
                                        value={deleteRepresentativedetails.name}
                                        name="name"
                                        className="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Select name</option>
                                        {filterdata.map((obj, index) => {
                                            return (
                                                <option key={index}>
                                                    {obj.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <input
                                    type="submit"
                                    value="Delete"
                                    className="w-full btn btn-danger text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddRepresentative;
