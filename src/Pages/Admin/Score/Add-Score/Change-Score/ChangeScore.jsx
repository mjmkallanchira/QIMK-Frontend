import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../../../Context/UserContext";
import { server } from "../../../../../Constants/Constant";
function ChangeScore() {
    const { setispageloading } = useContext(UserContext);
    const { id, name, point } = useParams();
    const [newPoint, setnewpoint] = useState();
    const navigate = useNavigate();
    const handleinput = (typedpoint) => {
        setnewpoint(typedpoint);
    };
    const handlesubmit = async () => {
        let oldpoint = parseInt(point);
        let addedPoint = parseInt(newPoint);
        const totalpoint = oldpoint + addedPoint;
        console.log(totalpoint);

        // /
        //
        //
        //
        try {
            setispageloading(true);

            const response = await fetch(`${server}/admin/add-points/${totalpoint}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.ok) {
                setnewpoint(0);
                setispageloading(false);
                toast.success("Points Added Successfully");
                navigate("/admin/add-score");
            } else {
                setispageloading(false);
                toast.error(" Failed to Add points ");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };
    return (
        <div>
            <div className="w-full col-12 mx-auto col-md-8 mt-5 dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Add Points for {name}
                    </h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (
                                window.confirm(
                                    `Are you sure you want to add points for ${name} `
                                )
                            ) {
                                handlesubmit();
                            } else {
                                toast.warning(
                                    "You had disagreed to add points"
                                );
                                navigate("/admin/add-score");
                            }
                        }}
                        className="space-y-4 md:space-y-6"
                    >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Points to be added
                            </label>
                            <input
                                type="number"
                                name="points"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Points"
                                required="true"
                                onChange={(e) => {
                                    handleinput(e.target.value);
                                }}
                                value={newPoint}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Add Points
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangeScore;
