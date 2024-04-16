import React, { useContext, useEffect, useState } from "react";
import { server } from "../../Constants/Constant";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
function ChapterHandling() {
    const { setispageloading } = useContext(UserContext);
    const { componentname } = useParams();
    const [subjectdata, setsubjectdata] = useState([]);
    const [subjectfilterdata, setsubjectfilterdata] = useState([]);
    const [submitdata, setsubmitdata] = useState({
        name: "",
        file: "",
        class: "",
        subject: "",
    });
    const [deletedetails, setdeletedetails] = useState({
        class: "",
        subject: "",
        chapter: "",
    });
    const [fetchdata, setfetchdata] = useState([]);
    const [filterdata, setfilterdata] = useState({
        subject: [],
        chapter: [],
    });
    const getalldata = async () => {
        const response = await fetch(
            `${server}/admin/${componentname}/getbookdata`,
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
            setfetchdata(data);
        }
    };
    const getsubjectdata = async () => {
        try {
            const response = await fetch(
                `${server}/admin/${componentname}/get-subject-data`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();

                setsubjectdata(data);
            } else {
                toast.error("Failed to load subject data ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleclassinput = (name, value) => {
        setsubmitdata({ ...submitdata, [name]: value });
        const classsubject = subjectdata.filter((Object) => {
            if (Object.class === value) {
                return Object;
            }
        });
        setsubjectfilterdata(classsubject[0].subjects);
        console.log(classsubject[0].subjects);
    };
    const handleinput = (name, value) => {
        setsubmitdata({ ...submitdata, [name]: value });
    };
    const handleimagesubmit = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            setsubmitdata({
                ...submitdata,
                file: reader.result,
            });
        };
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        setispageloading(true);
        try {
            const response = await fetch(
                `${server}/admin/${componentname}/add-chapter`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(submitdata),
                }
            );
            console.log(response);
            if (response.ok) {
                setsubmitdata({ name: "", file: "", class: "", subject: "" });
                getalldata();
                setdeletedetails({ chapter: "", class: "", subject: "" });
                setispageloading(false);
                toast.success("Added chapter successfully");
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

    const handledeleteclassinput = async (value) => {
        setdeletedetails({
            subject: "",
            chapter: "",
            class: value,
        });

        const subjectfilter = await fetchdata.filter((obj) => {
            return obj.class === value;
        });
        setfilterdata({ ...filterdata, subject: subjectfilter[0].subjects });
    };
    const handldeletesubjectinput = async (value) => {
        setdeletedetails({ ...deletedetails, subject: value });
        const classfilter = await filterdata.subject.filter((obj) => {
            return obj.subjectname === value;
        });
        // console.log(classfilter[0].chapters);
        setfilterdata({ ...filterdata, chapter: classfilter[0].chapters });
    };
    const handldeletechapterinput = async (value) => {
        setdeletedetails({ ...deletedetails, chapter: value });
    };
    const handledeletesubmit = async () => {
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/${componentname}/delete-chapter`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deletedetails),
                }
            );
            console.log(response);
            if (response.ok) {
                getsubjectdata();
                setsubmitdata({ name: "", file: "", class: "", subject: "" });
                setdeletedetails({ chapter: "", class: "", subject: "" });
                setispageloading(false);
                toast.success("Deleted Chapter Successfully");
            } else {
                setispageloading(false);
                toast.error("Failed Deleting  Chapter ");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getsubjectdata();
        getalldata();
    }, []);

    return (
        <div>
            {/* add chapter */}
            <section class="bg-gray-50 dark dark:bg-gray-900 pt-10 min-h-100 ">
                <h1 className="text-3xl text-center font-black leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Add {componentname}{" "}
                </h1>
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                    <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add Chapter
                            </h1>
                            <form
                                onSubmit={handlesubmit}
                                class="space-y-4 md:space-y-6"
                            >
                                <div className="my-2 ">
                                    <label
                                        for="name"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name of Chapter
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
                                        value={submitdata.name}
                                    />
                                </div>
                                {/* file of chapter */}
                                <div>
                                    <label
                                        htmlFor="file-of-chapter"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        File of chapter
                                    </label>
                                    <input
                                        type="file"
                                        name="fileofchapter"
                                        id="file-of-chapter"
                                        placeholder="Image"
                                        required
                                        onChange={(e) => {
                                            handleimagesubmit(
                                                e.target.files[0]
                                            );
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                            handleclassinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={submitdata.class}
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
                                {/* gender */}
                                <div className="my-2 ">
                                    <label
                                        for="gender"
                                        class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Subject
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={submitdata.subject}
                                        name="subject"
                                        class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected="">
                                            Select the Subject
                                        </option>
                                        {subjectfilterdata.map((obj) => {
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
                                    class="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div className="">
                <section class="bg-gray-50 dark dark:bg-gray-900 pt-10 min-h-100 ">
                    <h1 className="text-3xl text-center font-black leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Delete {componentname}{" "}
                    </h1>
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                        <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Delete Chapter
                                </h1>
                                <form class="space-y-4 md:space-y-6">
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
                                                    e.target.value
                                                );
                                            }}
                                            value={deletedetails.class}
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
                                    {/* gender */}
                                    <div className="my-2 ">
                                        <label
                                            for="gender"
                                            class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Subject
                                        </label>
                                        <select
                                            onChange={(e) => {
                                                handldeletesubjectinput(
                                                    e.target.value
                                                );
                                            }}
                                            value={deletedetails.subject}
                                            name="subject"
                                            class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected="">
                                                Select the Subject
                                            </option>
                                            {filterdata.subject.map((obj) => {
                                                return (
                                                    <option
                                                        value={obj.subjectname}
                                                    >
                                                        {obj.subjectname}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {/* chapter name */}
                                    <div className="my-2 ">
                                        <label
                                            for="chapter"
                                            class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Select the chapter
                                        </label>
                                        <select
                                            onChange={(e) => {
                                                handldeletechapterinput(
                                                    e.target.value
                                                );
                                            }}
                                            value={deletedetails.chapter}
                                            name="chapter"
                                            class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected="">
                                                Select the chapter
                                            </option>
                                            {filterdata.chapter.map((obj) => {
                                                return (
                                                    <option value={obj.name}>
                                                        {obj.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {/* submit */}
                                </form>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Are You Sure you want to delete chapter"
                                            )
                                        ) {
                                            handledeletesubmit();
                                        }
                                    }}
                                    class="w-full btn btn-danger  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ChapterHandling;
