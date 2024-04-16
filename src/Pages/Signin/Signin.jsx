import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";
function Signin() {
    const navigate = useNavigate();
    const { storetokeninlokalstorage, setispageloading } =
        useContext(UserContext);
    const [usersignin, setusersignin] = useState({
        email: "",
        password: "",
    });
    const handleinput = (name, value) => {
        setusersignin({ ...usersignin, [name]: value });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            setispageloading(true);
            const response = await fetch(`${server}/signin`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(usersignin),
            });
            // console.log(await response.json());
            if (response.ok) {
                const data = await response.json();
                storetokeninlokalstorage(data.token);
                setusersignin({
                    email: "",
                    password: "",
                });
                setispageloading(false);
                toast.success("login succesfull");
                navigate("/");
            } else {
                const { err } = await response.json();
                setispageloading(false);
                toast.error(err);
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    return (
        <>
            <div className="signin  ">
                <section className="bg-gray-50 dark dark:bg-gray-900 pt-20 ">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mb-5 mt-5 mx-auto  lg:py-0">
                        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form
                                    onSubmit={handlesubmit}
                                    className="space-y-4 md:space-y-6"
                                    action="#"
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required
                                            onChange={(e) => {
                                                handleinput(
                                                    e.target.name,
                                                    e.target.value
                                                );
                                            }}
                                            value={usersignin.email}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            onChange={(e) => {
                                                handleinput(
                                                    e.target.name,
                                                    e.target.value
                                                );
                                            }}
                                            value={usersignin.password}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Sign in
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{" "}
                                        <Link
                                            to="/signup"
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Signin;
