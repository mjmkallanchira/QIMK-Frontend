import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Player from "../../Components/Player/Player";
import { ColorRing } from "react-loader-spinner";

function Quran() {
    const [isloading, setisloading] = useState(true);
    const [quranfetchdata, setquranfetchdata] = useState({
        surah: [],
        reciter: [],
    });
    const [quranaudiosubmit, setquranaudiosubmit] = useState({
        reciter: 123,
        surah: null,
    });
    const [quranplaydetails, setquranplaydetails] = useState({
        link: null,
    });
    const getalldata = async () => {
        try {
            setisloading(true);
            const reciter = await fetch(
                "https://www.mp3quran.net/api/v3/reciters?language=eng"
            );
            const reciterdata = await reciter.json();
            reciterdata.reciters.sort(function (a, b) {
                if (a.letter < b.letter) {
                    return -1;
                }
                if (a.letter > b.letter) {
                    return 1;
                }
                return 0;
            });
            const surah = await fetch(
                " https://mp3quran.net/api/v3/suwar?language=eng",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            const surahdata = await surah.json();
            const Reciterfilter = reciterdata.reciters.filter((obj) => {
                return obj.id === 123;
            });
            Reciterfilter.moshaf = Reciterfilter[0].moshaf.filter(
                (obj) => obj.id === Reciterfilter[0].id
            );
            Reciterfilter.moshaf[0].surah_list =
                Reciterfilter.moshaf[0].surah_list.split(",");
            console.log(Reciterfilter.moshaf[0].surah_list);
            let quranfilter = surahdata.suwar.filter((item) => {
                item.id = "" + item.id;
                return Reciterfilter.moshaf[0].surah_list.includes(item.id);
            });
            console.log(quranfilter);
            setquranfetchdata({
                surah: quranfilter,
                reciter: reciterdata.reciters,
            });
            setisloading(false);
        } catch (error) {
            setisloading(false);

            console.error(error);
        }
    };
    const handlesurah = async (value) => {
        value = parseInt(value);
        setquranaudiosubmit({ ...quranaudiosubmit, reciter: value });
        try {
            const surah = await fetch(
                " https://mp3quran.net/api/v3/suwar?language=eng",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            console.log(value);
            const surahdata = await surah.json();
            const Reciterfilter = quranfetchdata.reciter.filter((obj) => {
                return obj.id === value;
            });
            Reciterfilter.moshaf = Reciterfilter[0].moshaf.filter(
                (obj) => obj.id === Reciterfilter[0].id
            );
            Reciterfilter[0].moshaf[0].surah_list =
                Reciterfilter[0].moshaf[0].surah_list.split(",");
            let quranfilter = surahdata.suwar.filter((item) => {
                item.id = "" + item.id;
                return Reciterfilter[0].moshaf[0].surah_list.includes(item.id);
            });

            setquranfetchdata({
                ...quranfetchdata,
                surah: quranfilter,
            });
        } catch (error) {
            console.error(error);
        }
    };
    const handlesurahinput = (value) => {
        setquranaudiosubmit({ ...quranaudiosubmit, surah: value });
    };
    function pad(n, length) {
        let len = length - ("" + n).length;
        return (len > 0 ? new Array(++len).join("0") : "") + n;
    }
    const play = () => {
        const reciter = quranfetchdata.reciter.filter((obj) => {
            return obj.id === quranaudiosubmit.reciter;
        });
        reciter.moshaf = reciter[0].moshaf.filter(
            (obj) => obj.id === reciter[0].id
        );
        let surahid = pad(quranaudiosubmit.surah, 3);
        setquranplaydetails({
            link: reciter.moshaf[0].server + surahid + ".mp3",
        });
        // setquranplaydetails({
        //     link:reciter.moshaf.server
        // })
    };

    useEffect(() => {
        getalldata();
    }, []);

    return (
        <div>
            <div className="">
                <section
                    style={{ paddingTop: "5em" }}
                    class="pb-5  bg-gray-50 dark dark:bg-gray-900  min-h-100 "
                >
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                        <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-950 border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Quran
                                </h1>
                                {isloading ? (
                                    <ColorRing
                                        visible={true}
                                        height="80"
                                        width="80"
                                        ariaLabel="color-ring-loading"
                                        wrapperStyle={{ margin: "auto" }}
                                        wrapperClass="color-ring-wrapper"
                                        colors={[
                                            "#e15b64",
                                            "#f47e60",
                                            "#f8b26a",
                                            "#abbd81",
                                            "#849b87",
                                        ]}
                                    />
                                ) : (
                                    <form class="space-y-4 md:space-y-6">
                                        {/* reciter */}
                                        <div className="my-2 ">
                                            <label
                                                for="reciter"
                                                class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Reciter
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    handlesurah(e.target.value);
                                                }}
                                                value={quranaudiosubmit.reciter}
                                                name="reciter"
                                                class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option selected="">
                                                    Select the reciter
                                                </option>
                                                {quranfetchdata.reciter &&
                                                    quranfetchdata.reciter.map(
                                                        (obj, index) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        obj.id
                                                                    }
                                                                >
                                                                    {obj.name}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                        {/* class */}
                                        <div className="my-2 ">
                                            <label
                                                for="surah"
                                                class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Surah
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    handlesurahinput(
                                                        e.target.value
                                                    );
                                                }}
                                                value={quranaudiosubmit.surah}
                                                name="Surah"
                                                class="py-3 dark px-4 pe-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option selected="">
                                                    Select the Surah
                                                </option>

                                                {quranfetchdata.surah &&
                                                    quranfetchdata.surah.map(
                                                        (obj, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        obj.id
                                                                    }
                                                                >
                                                                    {obj.name}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>

                                        {/* submit */}
                                    </form>
                                )}
                                <button
                                    type="submit"
                                    onClick={() => {
                                        play();
                                    }}
                                    class="w-full btn btn-danger font-black text-3xl  focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Play
                                </button>
                                {quranplaydetails.link && (
                                    <Player link={quranplaydetails.link} />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Quran;
