import React, { useContext, useEffect, useState } from "react";
import Column from "../../../Components/columns/Column";
import { useParams } from "react-router-dom";
import { server } from "../../../Constants/Constant";
import { toast } from "react-toastify";
import { UserContext } from "../../../Context/UserContext";
function Subject() {
    const [subjectdata, setsubjectdata] = useState([]);
    const { setispageloading } = useContext(UserContext);
    const params = useParams();
    console.log(params);
    const studentclass = params.class;
    const type = params.type;
    // const data = [
    //     { title: "subject1", href: `/booksandguide/${type}/${studentclass}/subject1`, chapter: [] },
    //     { title: "subject2", href: `/booksandguide/${type}/${studentclass}/subject2`, chapter: [] },
    //     { title: "subject3", href: `/booksandguide/${type}/${studentclass}/subject3`, chapter: [] },
    // ];
    const getsubjectdata = async () => {
        try {
            setispageloading(true);
            const response = await fetch(
                `${server}/${type}/get-subject-data/${studentclass}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                let data = await response.json();
                data = data[0].subjects;
                data.forEach((element) => {
                    element.href = `/booksandguide/${type}/${studentclass}/${element.subjectname}`;
                });
                setsubjectdata(data);
                setispageloading(false);
            } else {
                setispageloading(false);
                toast.error("Subjects not Found");
            }
        } catch (error) {
            setispageloading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getsubjectdata();
    }, []);

    return (
        <div>
            <Column heading="Subject" data={subjectdata} />
        </div>
    );
}

export default Subject;
