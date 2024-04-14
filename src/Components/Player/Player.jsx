import React from "react";
import ReactAudioPlayer from "react-audio-player";


function Player({ link }) {
    return (
        <div className="">
            <ReactAudioPlayer
                autoPlay
                src={link}
                style={{ width: "100%" }}
                controls
            />
        </div>
    );
}

export default Player;
