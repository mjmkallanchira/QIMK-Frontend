import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../../Context/UserContext";

function AddEducator() {
    const { setispageloading } = useContext(UserContext);
    const [educatordetails, seteducatordetails] = useState({
        name: "",
        image: "",
    });
    const [educatorfetchdata, seteducatorfetchdata] = useState([]);
    const handleinput = (name, value) => {
        seteducatordetails({ ...educatordetails, [name]: value });
    };
    const handleimagesubmit = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log(reader.result);
            seteducatordetails({
                ...educatordetails,
                image: reader.result,
            });
        };
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            setispageloading(true);

            const response = await fetch(`${server}/admin/add-educator`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(educatordetails),
            });
            console.log(response);
            if (response.ok) {
                seteducatordetails({ name: "", image: "" });
                setispageloading(false);
                toast.success("Educator Added Successfully");
            } else {
                setispageloading(false);
                toast.error(" Failed to Add Educator ");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    const geteducatordata = async () => {
        try {
            const response = await fetch(`${server}/admin/get-educator-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                seteducatorfetchdata(data);
            } else {
                toast.error("failed to load educator list ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const deleteeducator = async (id) => {
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/delete-educator/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            if (response.ok) {
                geteducatordata();
                setispageloading(false);
                toast.success("Deleted Educator Successfully");
            } else {
                setispageloading(false);
                toast.error("Failed to Delete Educator");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        geteducatordata();
    }, []);

    return (
        <>
            <section class="bg-gray-50 dark dark:bg-gray-900 pt-10 min-h-100 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                    <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add Educator
                            </h1>
                            <form
                                onSubmit={handlesubmit}
                                class="space-y-4 md:space-y-6"
                            >
                                {/* name of educator */}
                                <div className="my-2 ">
                                    <label
                                        for="name"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name of student
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        class="px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Name"
                                        required="true"
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={educatordetails.name}
                                    />
                                </div>
                                {/* image of educator */}
                                <div>
                                    <label
                                        htmlFor="image-of-student"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Image of Student (it should be in square
                                        resolution)
                                    </label>
                                    <input
                                        type="file"
                                        name="imageofkhatib"
                                        id="image-of-student"
                                        placeholder="Image"
                                        required="true"
                                        onChange={(e) => {
                                            handleimagesubmit(
                                                e.target.files[0]
                                            );
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>

                                {/* submit */}
                                <button
                                    type="submit"
                                    class="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* table */}
                <div className="p-6 w-full text-center shadow-2xl mb-1 mt-10  space-y-4 md:space-y-6 sm:p-8">
                    <span className="text-2xl font-medium ">
                        Delete Educator
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
                                                    Name of Educator
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
                                            {educatorfetchdata &&
                                                educatorfetchdata.map(
                                                    (obj, index) => {
                                                        return (
                                                            <tr
                                                                key={index}
                                                                className="bg-white"
                                                            >
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                                    {obj.name}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-black">
                                                                    <button
                                                                        onClick={() => {
                                                                            if (
                                                                                window.confirm(
                                                                                    "are you sure you want to delete"
                                                                                )
                                                                            ) {
                                                                                deleteeducator(
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
            </section>
        </>
    );
}

export default AddEducator;
