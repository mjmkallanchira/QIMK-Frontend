import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../Constants/Constant";
import { UserContext } from "../../../Context/UserContext";
import { toast } from "react-toastify";

function UserDetails() {
    const { setispageloading } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const [alluser, setalluser] = useState([]);
    const getallusers = async () => {
        try {
            setispageloading(true);

            const response = await fetch(`${server}/admin/get-all-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log(response)
            if (response.ok) {
                // console.log(response);
                const data = await response.json();
                setalluser(data);
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("Failed to load users tab");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    const changeadminstate = async (isadmin, userid) => {
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/changeadmin/${!isadmin}/${userid}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            if (response.ok) {
                setispageloading(false);

                toast.success(
                    `converted ${isadmin ? "Admin" : "User"} to ${
                        isadmin ? "User" : "Admin"
                    }`
                );
                getallusers();
            } else {
                setispageloading(false);

                toast.error(
                    `Failed to change  ${isadmin ? "Admin" : "User"} to ${
                        isadmin ? "User" : "Admin"
                    }`
                );
            }
        } catch (error) {
            setispageloading(false);
            console.error(error);
        }
    };
    useEffect(() => {
        getallusers();
    }, []);

    return (
        <>
            <div className="flex flex-col dark  pb-4 ">
                <span className="mx-auto font-bold text-3xl mb-6 ">Users</span>
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
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                                        >
                                            Phone
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                                        >
                                            Admin
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
                                    {alluser &&
                                        alluser.map((obj, index) => {
                                            let admindetail = false;
                                            if (obj._id === user._id) {
                                                admindetail = true;
                                            }

                                            const admin = `${obj.isadmin}`;
                                            return (
                                                <tr
                                                    key={index}
                                                    className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                        {obj.username}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                        {obj.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                        {obj.phone}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                        {admin}
                                                    </td>
                                                    {admindetail ? (
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-info dark:text-gray-200">
                                                            You'r logined with
                                                            this accout
                                                        </td>
                                                    ) : (
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                            {obj.isadmin ? (
                                                                <button
                                                                    onClick={() => {
                                                                        if (
                                                                            window.confirm(
                                                                                `Are you Sure You want to Change ${obj.username} to User`
                                                                            )
                                                                        ) {
                                                                            changeadminstate(
                                                                                obj.isadmin,
                                                                                obj._id
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="btn btn-warning"
                                                                >
                                                                    Make User
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        if (
                                                                            window.confirm(
                                                                                `Are you Sure You want to Change ${obj.username} to Admin`
                                                                            )
                                                                        ) {
                                                                            changeadminstate(
                                                                                obj.isadmin,
                                                                                obj._id
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="btn btn-danger"
                                                                >
                                                                    Make Admin
                                                                </button>
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDetails;
