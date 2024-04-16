import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";

function DeleteStudent() {
    const [alldata, setalldata] = useState([]);
    const { token } = useContext(UserContext);
    const { setispageloading } = useContext(UserContext);

    const [deletesubmit, setdeletesubmit] = useState({
        gender: "",
        class: "",
        name: "",
    });
    const [fetchdataselect, setfetchdataselect] = useState({
        gender: [],
        class: [],
        name: [],
    });
    const fetchstudentdata = async (e) => {
        try {
            const response = await fetch(`${server}/admin/getstudentdata`, {
                method: "GET",
                headers: {
                    token: token,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setalldata(data);
            } else {
                toast.error("Failed to fetch student data");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlegender = async (value) => {
        console.log(deletesubmit.class);

        const genderresponse = await alldata.filter((obj) => {
            return obj.gender === value;
        });
        setdeletesubmit({ ...deletesubmit, class: "", gender: value });
        setfetchdataselect({
            ...fetchdataselect,
            class: [],
            gender: genderresponse,
        });
    };
    const handleclass = (value) => {
        console.log(fetchdataselect.gender);
        if (deletesubmit.gender === "") {
            return toast.warning("First select the gender ");
        } else {
            setdeletesubmit({ ...deletesubmit, class: value });
            setfetchdataselect({
                ...fetchdataselect,
                class: fetchdataselect.gender[0][value],
            });
        }
        // console.log(fetchdataselect.gender[0][value]);
    };
    const handlename = (value) => {
        setdeletesubmit({ ...deletesubmit, name: value });
    };
    const handlesubmit = async () => {
        try {
            setispageloading(true);
            const response = await fetch(`${server}/admin/delete-student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deletesubmit),
            });
            console.log(response);
            if (response.ok) {
                setfetchdataselect({
                    gender: [],
                    class: [],
                    name: [],
                });
                setdeletesubmit({ gender: "", class: "", name: "" });
                fetchstudentdata();
                setispageloading(false);
                toast.success("Student Deleted Successfully");
            } else {
                setispageloading(false);
                toast.error("Failed to delete Student");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        fetchstudentdata();
    }, []);

    return (
        <div>
            <section class="bg-gray-50 dark dark:bg-gray-900 pt-10 min-h-100 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                    <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Delete student
                            </h1>
                            <form
                                // onSubmit={}
                                class="space-y-4 md:space-y-6"
                            >
                                {/* gender */}
                                <div className="my-2 ">
                                    <label
                                        for="gender"
                                        class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            handlegender(e.target.value);
                                        }}
                                        value={deletesubmit.gender}
                                        name="gender"
                                        required="true"
                                        class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected value="">
                                            Select The gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                {/* class */}
                                <div className="my-2 ">
                                    <label
                                        for="class"
                                        class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Class
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            handleclass(e.target.value);
                                        }}
                                        name="class"
                                        required="true"
                                        value={deletesubmit.class}
                                        class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select The class
                                        </option>
                                        <option value="1"> Class: 1st</option>
                                        <option value="2"> Class: 2nd</option>
                                        <option value="3"> Class: 3rd</option>
                                        <option value="4"> Class: 4th</option>
                                        <option value="5"> Class: 5th</option>
                                        <option value="6"> Class: 6th</option>
                                        <option value="7"> Class: 7th</option>
                                        <option value="8"> Class: 8th</option>
                                        <option value="9"> Class: 9th</option>
                                        <option value="10"> Class: 10th</option>
                                        <option value="+1"> Class: +1</option>
                                        <option value="+2"> Class: +2</option>
                                    </select>
                                </div>
                                {/* NAME OF student */}
                                <div className="my-2 ">
                                    <label
                                        for="name"
                                        class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name of Student
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            handlename(e.target.value);
                                        }}
                                        name="class"
                                        required="true"
                                        class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected="">
                                            Select the class
                                        </option>
                                        {fetchdataselect.class.map((obj) => {
                                            return (
                                                <option value={obj.name}>
                                                    {obj.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </form>
                            {/* submit */}
                            <button
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            "Are you sure you want to delete from the Student list"
                                        )
                                    ) {
                                        console.log("hai");
                                        handlesubmit();
                                    } else {
                                        return null;
                                    }
                                }}
                                class="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DeleteStudent;
