import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";

import { UserContext } from "../../../Context/UserContext";
function ViewContact() {
    const { setispageloading } = useContext(UserContext);
    const { token } = useContext(UserContext);

    const [contactdetails, setcontactdetails] = useState([]);
    const getcontactdetails = async () => {
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/get-contact-details`,
                {
                    method: "GET",
                    headers: {
                        token: token,
                    },
                }
            );
            // console.log(response);
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setcontactdetails(data);
                setispageloading(false);
            } else {
                setispageloading(false);
                console.log(response);
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    const deletecontact = async (id) => {
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/delete-contact/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        token: token,
                    },
                }
            );
            console.log(response);
            if (response.ok) {
                setispageloading(false);
                toast.success("Deleted contact successfully");
                getcontactdetails();
            } else {
                setispageloading(false);
                toast.error(" Failed to deleted contact");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getcontactdetails();
    }, []);

    return (
        <div className="text-center pt-3">
            <span className=" font-bold text-4xl ">Contact Details</span>
            <div className="relative mt-3 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactdetails.map((obj, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {obj.name}
                                    </th>
                                    <td className="px-6 py-4">{obj.email}</td>
                                    <td className="px-6 py-4">{obj.message}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "are you sure you want to delete"
                                                    )
                                                ) {
                                                    deletecontact(obj._id);
                                                }
                                            }}
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
    );
}

export default ViewContact;
