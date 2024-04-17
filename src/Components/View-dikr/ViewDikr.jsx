import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
import { server } from "../../Constants/Constant";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

function ViewDikr() {
    const params = useParams();
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const [filedata, setfiledata] = useState();
    const getalldikr = async () => {
        try {
            const response = await fetch(`${server}/get-dikr-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                let data = await response.json();
                data = data.filter((obj) => obj.name === params.name);
                console.log(data[0]);
                setfiledata(data[0]);
            } else {
                toast.error("Failed to load dikr tab");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getalldikr();
    }, []);
    return (
        <div>
            {filedata && (
                <>
                    <Document
                        file={filedata.file}
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

export default ViewDikr;
