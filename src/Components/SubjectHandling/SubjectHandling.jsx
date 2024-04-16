import React, { useContext, useEffect, useState } from "react";
import { server } from "../../Constants/Constant";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
function SubjectHandling() {
    const { setispageloading } = useContext(UserContext);
    const { componentname } = useParams();
    const [fetchdata, setfetchdata] = useState([]);
    const [deletesubject, setdeletesubject] = useState({
        class: "",
        subject: "",
    });
    const [subjectfilter, setsubjectfilter] = useState([]);
    const [addsubject, setaddsubject] = useState({
        name: "",
        class: "",
    });
    const handlesubjectinput = (name, value) => {
        setaddsubject({ ...addsubject, [name]: value });
    };
    const handlesubjectsubmit = async (e) => {
        e.preventDefault();
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/${componentname}/add-subject`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(addsubject),
                }
            );
            console.log(response);
            if (response.ok) {
                setaddsubject({ name: "", class: "" });
                getsubjectdata();
                setispageloading(false);
                toast.success("Added subject successfully");
            } else {
                const error = await response.json();
                setispageloading(false);
                toast.error(error.err);
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    const getsubjectdata = async () => {
        const response = await fetch(
            `${server}/admin/${componentname}/get-subject-data`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setfetchdata(data);
        } else {
            toast.error("Failed to load subject data ");
        }
    };
    const handledeleteclassinput = (name, value) => {
        console.log(value);
        setdeletesubject({ ...deletesubject, [name]: value });
        const classsubject = fetchdata.filter((Object) => {
            if (Object.class === value) {
                return Object;
            }
        });
        setsubjectfilter(classsubject[0].subjects);
        console.log(classsubject[0].subjects);
    };
    const handledeletesubjectinput = (name, value) => {
        setdeletesubject({ ...deletesubject, [name]: value });
    };
    const handlesubjectdelete = async (e) => {
        e.preventDefault();
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/${componentname}/delete-subject`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deletesubject),
                }
            );
            if (response.ok) {
                setdeletesubject({ class: "", subject: "" });
                getsubjectdata();
                setispageloading(false);
                toast.success("Deleted subject Successfully");
            } else {
                setispageloading(false);
                toast.success("Failed to Delete subject");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getsubjectdata();
    }, []);

    return (
        <div>
            {/* Add subject */}

            <section class="bg-gray-50 dark dark:bg-gray-900 pt-10 min-h-100 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                    <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add Subject
                            </h1>
                            <form
                                onSubmit={handlesubjectsubmit}
                                class="space-y-4 md:space-y-6"
                            >
                                <div className="my-2 ">
                                    <label
                                        for="name"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name of subject
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        class="px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Name"
                                        required="true"
                                        onChange={(e) => {
                                            handlesubjectinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={addsubject.name}
                                    />
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
                                            handlesubjectinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={addsubject.class}
                                        name="class"
                                        class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected="">
                                            Select the class
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="+1">+1</option>
                                        <option value="+2">+2</option>
                                    </select>
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
            </section>

            {/*  */}
            {/*  */}
            {/*  */}
            {/*  Delete Subject*/}
            <section class="bg-gray-50 dark dark:bg-gray-900 pt-10 min-h-100 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                    <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Delete Subject
                            </h1>
                            <form
                                onSubmit={handlesubjectdelete}
                                class="space-y-4 md:space-y-6"
                            >
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
                                            handledeleteclassinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={deletesubject.class}
                                        name="class"
                                        class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected="">
                                            Select the class
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="+1">+1</option>
                                        <option value="+2">+2</option>
                                    </select>
                                </div>
                                {/* subject */}
                                <div className="my-2 ">
                                    <label
                                        for="subject"
                                        class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Subject
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            handledeletesubjectinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={deletesubject.subject}
                                        name="subject"
                                        class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected="">
                                            Select the Subject
                                        </option>
                                        {subjectfilter.map((obj) => {
                                            obj;
                                            return (
                                                <option value={obj.subjectname}>
                                                    {obj.subjectname}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                {/* submit */}
                                <button
                                    type="submit"
                                    class="w-full btn btn-danger text-white font-bold focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SubjectHandling;
