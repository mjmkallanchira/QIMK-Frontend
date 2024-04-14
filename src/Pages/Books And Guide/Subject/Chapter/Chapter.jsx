import React, { useEffect, useState } from "react";
import Column from "../../../../Components/columns/Column";
import { useParams } from "react-router-dom";
import { server } from "../../../../Constants/Constant";
function Chapter() {
    const params=useParams()
    const studentclass=params.class
    const type = params.type;
    const subject=params.subject
    const [chapterdata, setchapterdata] = useState([]);
    
    // const data = [
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    //     { title: "Chapter1" ,href:`/booksandguide/${type}/${studentclass}/${subject}/chapter1`},
    // ];

    const getchapterdata = async () => {
        try {
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
                data = data[0].subjects
                data=data.filter((obj)=>{
                    return obj.subjectname===subject
                })
                data=data[0].chapters
                data.forEach((element) => {
                    element.href = `/booksandguide/${type}/${studentclass}/${subject}/${element.name}`;
                });
                console.log(data);
                setchapterdata(data)
            } else {
                toast.error("chapter not Found");
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        getchapterdata();
    }, []);



    return (
        <>
            <Column heading="chapter" data={chapterdata} />
        </>
    );
}

export default Chapter;
