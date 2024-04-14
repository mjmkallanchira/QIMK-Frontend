import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";

function SignUp() {
    const navigate = useNavigate();

    const { storetokeninlokalstorage } = useContext(UserContext);
    const [userdetails, setuserdetails] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        isadmin: false,
    });
    const handleinput = (name, value) => {
        setuserdetails({ ...userdetails, [name]: value });
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        fetch(`${server}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userdetails),
        }).then(async (result) => {
            if (result.ok) {
                const { response, token } = await result.json();
                storetokeninlokalstorage(token);
                setuserdetails({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    isadmin: false,
                });
                toast.success("Sign up Succesfull");
                navigate("/signin");
            } else {
                const error = await result.json();
                toast.error(error.err);
            }
        });
    };
    return (
        <>
            <div className="signup">
                <section className="bg-gray-50 dark dark:bg-gray-900 pt-20 pb-5">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create a new account
                                </h1>
                                <form
                                    className="space-y-4 md:space-y-6"
                                    onSubmit={handlesubmit}
                                    action="#"
                                >
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
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
                                            value={userdetails.username}
                                        />
                                    </div>
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
                                            value={userdetails.email}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            type="number"
                                            name="phone"
                                            id="phone"
                                            placeholder="1234567890"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            onChange={(e) => {
                                                handleinput(
                                                    e.target.name,
                                                    e.target.value
                                                );
                                            }}
                                            value={userdetails.phone}
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
                                            value={userdetails.password}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Sign Up"
                                        className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    />
                                    Sign up
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account ?
                                        <Link
                                            to="/signin"
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Sign in
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

export default SignUp;
