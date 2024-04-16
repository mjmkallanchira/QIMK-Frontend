import React from "react";
import { ColorRing } from "react-loader-spinner";
import './Loading.css'
function Loading() {
    return (
        <div className="loading-container" >
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{ margin: "auto" }}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
        </div>
    );
}

export default Loading;
