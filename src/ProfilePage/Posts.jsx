import React, { useEffect, useState } from "react";
import { useFirebase } from "../Firebase";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
const Posts = () => {
  const firebase = useFirebase();
  const { userId } = useParams();
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    if (userId) {
      const getall = async () => {
        const userdata = await firebase.getUserData(userId);
        if (userdata && userdata.video) {
          setAllVideos(userdata.video); // Set the 'video' array in the state
        }
      };
      getall();
    }
  }, [firebase, userId]);
  return (
    <div className="container row d-flex align-items-center justify-content-center m-0 postpage p-0">
      {allVideos.length > 0 ? (
        <div className="row d-flex col-12 col-md-11 row-cols-3 m-0 p-0">
          {allVideos.map((item, index) => (
            <div
              key={index}
              className="col p-0 position-relative"
              style={{
                display: "flex",
                flexWrap: "wrap",
                border: "3px solid white",
              }}
            >
              <div
                className="position-absolute top-0 end-0"
                style={{ marginRight: "3px", cursor: "pointer" }}
              >
                <VideoSvg />
              </div>
              <div
                className="post-hover position-absolute h-100 w-100 "
                style={{zIndex:"5"}}
              >
                <div className="h-100 w-100 posthover2 align-items-center flex-column gap-2 justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, .2)" }}>
                  <div className="d-flex align-items-center"><FaHeart color="white" size={26} /><div className="ms-2 " style={{fontWeight:"700", fontSize:"20px"}}>3</div></div>
                  <div className="d-flex align-items-center"> <Comment1 backgroundColor="white" size={26} /><div className="ms-2 " style={{fontWeight:"700", fontSize:"20px"}}>7</div></div>
                </div>
              </div>
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={`Post ${index}`}
                  className="img-fluid"
                  style={{
                    margin: "0 1px 0 1px",
                    background: "cover",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              ) : (
                <video
                  src={item.src}
                  muted
                  className="img-fluid"
                  style={{
                    margin: "0 1px 0 1px",
                    background: "cover",
                    objectFit: "fill",
                    aspectRatio: "1 / 1",
                    width: "100%",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="w-100 DALJU d-flex align-items-center justify-content-center flex-column text-center"
          style={{ height: "227px" }}
        >
          <Camera />
          <span
            style={{ fontSize: "30px", color: "#000000", fontWeight: "800" }}
          >
            Share photos
          </span>
          <span
            style={{ fontSize: "14px", color: "#000000", fontWeight: "400" }}
          >
            When you share photos, they will appear on your profile.
          </span>
          <div className="share_text">Share your first photo</div>
        </div>
      )}
    </div>
  );
};

export default Posts;
const Camera = () => (
  <svg
    aria-label="Camera"
    class="x1lliihq x1n2onr6 x5n08af"
    fill="currentColor"
    height="62"
    role="img"
    viewBox="0 0 96 96"
    width="62"
  >
    <title>Camera</title>
    <circle
      cx="48"
      cy="48"
      fill="none"
      r="47"
      stroke="currentColor"
      stroke-miterlimit="10"
      stroke-width="2"
    ></circle>
    <ellipse
      cx="48.002"
      cy="49.524"
      fill="none"
      rx="10.444"
      ry="10.476"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="2.095"
    ></ellipse>
    <path
      d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z"
      fill="none"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="2"
    ></path>
  </svg>
);
const VideoSvg = () => (
  <svg
    aria-label="Clip"
    class="x1lliihq x1n2onr6 x9bdzbf"
    fill="currentColor"
    height="20"
    role="img"
    viewBox="0 0 24 24"
    width="20"
  >
    <title>Clip</title>
    <path
      d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z"
      fill-rule="evenodd"
    ></path>
  </svg>
);
const Comment1 = ({ height = 24, width = 24 }) => (
  <svg
    aria-label="Comment"
    className="clrs x1lliihq x1n2onr6 xyb1xck"
    fill="currentColor"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
     // Ensuring transparency
  >
    <title>Comment</title>
    <path
      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      fill="white"
      stroke="currentColor"
      strokeLinejoin="round" // Using camelCase in JSX
      strokeWidth="2"
    ></path>
  </svg>
);
export {Comment1};