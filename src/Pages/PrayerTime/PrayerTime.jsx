import React, { useContext, useEffect, useState } from "react";
import "./PrayerTime.css";
import { MdLabelImportant } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaMosque } from "react-icons/fa";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";
function PrayerTime(props) {
    const { setispageloading } = useContext(UserContext);
    const [PrayerTime, setPrayerTime] = useState({});
    const [PrayerTimedate, setPrayerTimedate] = useState({
        hijri: "",
        english: "",
    });

    const getlocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                getprayertiming(position.coords);
            });
        } else {
            toast.warning("you have denied the permission for location ");
        }
    };
    const getprayertiming = async (position) => {
        try {
            setispageloading(true);
            const response = await fetch(
                `https://api.aladhan.com/v1/timings?latitude=${position.latitude}&longitude=${position.longitude}&method=3&school=0`
            );
            // console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log();
                // console.log(data);
                const hijridate =
                    data.data.date.hijri.day +
                    "," +
                    data.data.date.hijri.month.en +
                    " " +
                    data.data.date.hijri.year;
                const englishdate =
                    data.data.date.gregorian.weekday.en +
                    ", " +
                    data.data.date.gregorian.day +
                    " " +
                    data.data.date.gregorian.month.en +
                    " " +
                    data.data.date.gregorian.year;

                setPrayerTimedate({
                    english: englishdate,
                    hijri: hijridate,
                });

                setPrayerTime(data.data.timings);
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
    useEffect(() => {
        getlocation();
    }, []);
    return (
        <div className="prayer-time-page ">
            <div className="container">
                <div className="row content-between">
                    <div className="heading-todays-prayer-timing col-12 ">
                        Today's Prayer Timing
                    </div>
                    {PrayerTimedate && (
                        <div className="font-bold col-12 text-center italic ">
                            {PrayerTimedate.english}
                        </div>
                    )}
                    <div className="font-bold col-12 text-center  italic">
                        28,ramadan 1445
                    </div>
                    <div className="todays-prayer-time-table col-12 dark">
                        <div className="flex flex-col">
                            <div className=" overflow-x-auto flex align-middle justify-center">
                                <div className="p-1.5 md:min-w-full w-100 inline-block align-middle ">
                                    <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                                                    >
                                                        Name Of Salah
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                                                    >
                                                        Time
                                                    </th>
                                                </tr>
                                            </thead>
                                            {PrayerTime && (
                                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800 dark:text-white-200">
                                                            Fajr
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-800 dark:text-white-200">
                                                            {PrayerTime.Fajr}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800 dark:text-white-200">
                                                            Sunrise
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-800 dark:text-white-200">
                                                            {PrayerTime.Sunrise}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800 dark:text-white-200">
                                                            Zuhr
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-smtext-black-800 dark:text-white-200">
                                                            {PrayerTime.Dhuhr}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mediumtext-black-800 dark:text-white-200">
                                                            Asr
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-800 dark:text-white-200">
                                                            {PrayerTime.Asr}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mediumtext-black-800 dark:text-white-200">
                                                            Maghrib
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-800 dark:text-white-200">
                                                            {PrayerTime.Maghrib}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mediumtext-black-800 dark:text-white-200">
                                                            Isha
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-800 dark:text-white-200">
                                                            {PrayerTime.Isha}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="caution-on-time">
                        <span className="flex ">
                            1.This time will be on a daily basis{" "}
                        </span>
                        <br />
                        <span>
                            2.This time may vary from the time of your local
                            mosque
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrayerTime;
