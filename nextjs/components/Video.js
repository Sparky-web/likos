import React from "react"
const Video = ({ videoSrcURL, videoTitle, ...props }) => (
        <video controls>
            <source src={videoSrcURL + "#t=0.1"} type="video/mp4" />
        </video>
)
export default Video