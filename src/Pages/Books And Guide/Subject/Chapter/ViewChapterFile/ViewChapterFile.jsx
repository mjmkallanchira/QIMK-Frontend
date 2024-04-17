import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../../../../Constants/Constant";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import Loading from "../../../../../Components/Loading/Loading";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

function ViewChapterFile() {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const [filedata, setfiledata] = useState();
    const params = useParams();
    const type = params.type;
    const studentclass = params.class;
    const subject = params.subject;
    const chapter = params.chapter;
    const getchapterfiledata = async () => {
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
                data = data[0].subjects;
                data = data.filter((obj) => {
                    return obj.subjectname === subject;
                });
                data = data[0].chapters;
                data = data.filter((obj) => {
                    return obj.name === chapter;
                });
                data = data[0].file;
                setfiledata(data);
            } else {
                toast.error("chapter not Found");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getchapterfiledata();
    }, []);

    return (
        <div style={{ background: "#323639" }} className="pt-20">
            {/* {filedata && (
                <iframe
                    src={filedata}
                    style={{ width: "100%", height: "100vh" }}
                />
            )} */}
            {filedata && (
                <>
                    <Document
                        file={filedata}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<Loading />}
                    >
                        {Array.apply(null, Array(numPages))
                            .map((x, i) => i + 1)
                            .map((page) => {
                                return (
                                    <Page
                                        width={window.screen.width}
                                        pageNumber={page}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                );
                            })}
                    </Document>
                </>
            )}
        </div>
    );
}

export default ViewChapterFile;
