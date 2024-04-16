import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../../Context/UserContext";
function ViewDuas() {
    const {setispageloading}=useContext(UserContext)

    const [Duadetails, setDuadetails] = useState([]);

    const getduadata = async () => {
        try {
            const response = await fetch(`${server}/admin/get-dua-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setDuadetails(await response.json());
            } else {
                toast.error("Failed to load Dua tab");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const deletedua = async (id) => {
        setispageloading(true)
        try {
            const response = await fetch(`${server}/admin/delete-dua/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                getduadata();
                setispageloading(false)
                toast.success("Deleted Dua Successfully ");
            } else {
                setispageloading(false)
                toast.error("Failed Deleting Dua  ");
            }
        } catch (error) {
            setispageloading(false)
            console.error(error);
        }
    };

    useEffect(() => {
        getduadata();
    }, []);

    return (
        <div>
            <div className="text-center pt-3">
                <span className=" font-bold text-4xl ">Dua Details</span>
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
                                    Reason
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Duadetails.map((obj, index) => {
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
                                        <td className="px-6 py-4">
                                            {obj.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.reason}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            "are you sure you want to delete"
                                                        )
                                                    ) {
                                                        deletedua(obj._id);
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
        </div>
    );
}

export default ViewDuas;
