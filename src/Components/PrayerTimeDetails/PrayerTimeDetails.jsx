import React from "react";

function PrayerTimeDetails({ data }) {
    return (
        <>
            {data ? (
                <div className="flex flex-col  ">
                    <div className="-m-1.5 overflow-x-auto ">
                        <div className="p-1.5 min-w-full inline-block align-middle ">
                            <div className="overflow-hidden">
                                <table className="min-w-full divideblackide-slate-text-slate-950 dark:divide-gray-700">
                                    <thead>
                                        <tr className="bg-slate-800 ">
                                            <th
                                                scope="col"
                                                className=" text-center px-6 py-3  text-xs font-medium text-gray-300 uppercase"
                                            >
                                                Name Of salah
                                            </th>
                                            <th
                                                scope="col"
                                                className=" text-center px-6 py-3  text-xs font-medium text-gray-300 uppercase"
                                            >
                                                Begins
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr className="bg-white">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                Fajr
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-black">
                                                {data.fajr} AM
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                Zuhr
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-black">
                                                {data.zuhr} PM
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                Asr
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-black">
                                                {data.asr} PM
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                Maghrib
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-black">
                                                {data.maghrib} PM
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-slate-950">
                                                Isha
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-black">
                                                {data.isha} PM
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default PrayerTimeDetails;
