import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { server } from "../../../../Constants/Constant";
import { toast } from "react-toastify";

function ViewScore() {
    const [fetchdata, setfetchdata] = useState([]);
    const { setispageloading } = useContext(UserContext);
    const getrepresentaivedata = async () => {
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/admin/get-all-representative`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                data.map((obj) => {
                    obj.Representative.sort((a, b) => b.vote - a.vote);
                    return obj;
                });
                setfetchdata(data);
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("Failed to Get representative data");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    const clearVote = async (name, type) => {
        try {
            const response = await fetch(
                `${server}/admin/clear-vote/${type}/${name}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                getrepresentaivedata();
                toast.success("Cleared Vote Successfully");
            } else {
                toast.error("Failed to Clear Vote ");
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getrepresentaivedata();
    }, []);

    return (
        <div className="text-center pt-3">
            <span className=" font-bold text-4xl ">Score</span>
            {fetchdata.map((obj) => {
                return (
                    <div className="relative text-center mt-3 overflow-x-auto shadow-md sm:rounded-lg">
                        <span className=" font-bold text-2xl ">
                            {obj.type === "male-1"
                                ? "Boys First-Leader"
                                : obj.type === "male-2"
                                ? "Boys Second-Leader"
                                : obj.type === "female-1"
                                ? "Girls First-Leader"
                                : obj.type === "female-2"
                                ? "Girls Second-Leader"
                                : ""}
                        </span>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Score
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Clear
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {obj.Representative.map((obj2, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {obj2.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {obj2.vote}
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                "are you sure you want to Clear"
                                                            )
                                                        ) {
                                                            clearVote(
                                                                obj2.name,
                                                                obj2.type
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Clear
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}

export default ViewScore;
