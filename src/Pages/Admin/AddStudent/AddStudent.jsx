import React, { useContext, useState } from "react";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
function AddStudent() {
    const navigate = useNavigate();
    const { setispageloading } = useContext(UserContext);
    const [studentdata, setstudentdata] = useState({
        name: "",
        class: "",
        gender: "",
        image: "",
    });
    const handleinput = (name, value) => {
        setstudentdata({ ...studentdata, [name]: value });
    };
    const handleimagesubmit = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            setstudentdata({
                ...studentdata,
                image: reader.result,
            });
        };
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            setispageloading(true);
            const response = await fetch(`${server}/admin/add-student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentdata),
            });
            console.log(response);
            if (response.ok) {
                setstudentdata({ name: "", gender: "", class: "", image: "" });
                setispageloading(false);
                toast.success("student added successfully");
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
    return (
        <div className="">
            <section class="bg-gray-50 dark dark:bg-gray-900 pt-10 min-h-100 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                    <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add student
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
                                        value={studentdata.name}
                                    />
                                </div>
                                {/* image of student */}
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
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={studentdata.class}
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
                                        Gender
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            handleinput(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        value={studentdata.gender}
                                        name="gender"
                                        class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected="">
                                            Select the gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
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
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <Link
                                to="/admin/delete-student"
                                className="w-full btn btn-danger"
                            >
                                Delete Student
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddStudent;
