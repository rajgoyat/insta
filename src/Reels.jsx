import React from "react";
import { SideBottombars } from "./Insta";
import { useRef, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import "./insta.css";
import "./ProfilePage/profile.css";
import { Comment, Share, Saved, More, Song } from "./AllIconsSvgs/IconsSvg";
import useIntersectionObserver from "./useIntersectionObserver";
import { reels } from "./SuggestionData";
import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
const Reels = () => {
  const [vol, setVol] = useState(false);
  const [like, setLikes] = useState(reels.map((val) => val.likes));
  const dataLength = reels.length;

  const [likeNo, setLikeNo] = useState(Array(dataLength).fill(false));
  const likeHandler = (index) => {
    // console.log(index)
    setLikes((prevLikes) =>
      prevLikes.map((like, i) =>
        i === index ? (likeNo[index] ? like - 1 : like + 1) : like
      )
    );

    setLikeNo((prevLikeNo) =>
      prevLikeNo.map((likeState, i) => (i === index ? !likeState : likeState))
    );
  };
  return (
    <>
      <div>
        <SideBottombars />
      </div>
      <div className="mainReels d-flex align-items-center justify-content-center flex-column">
        {reels.map((val, ind) => {
          return (
            <div key={ind} className="position-relative m-2 d-flex">
              <div
                className="soundBtnReels position-absolute fs-3 rounded-circle d-flex align-items-center justify-content-center "
                onClick={() => setVol(!vol)}
                style={{
                  zIndex: "2",
                  background: "rgba(0, 0, 0, 0.763)",
                  height: "35px",
                  width: "35px",
                }}
              >
                {vol ? (
                  <IoVolumeHigh size={26} color="white" />
                ) : (
                  <IoVolumeMute size={26} color="white" />
                )}
              </div>

              <div
                className="position-absolute reelData text-white"
                style={{ zIndex: "2" }}
              >
                <div className=" d-flex flex-row">
                  <img
                    className="rounded-circle"
                    src={val.img}
                    alt=""
                    style={{ height: "32px", width: "32px" }}
                  />
                  <div
                    className="ms-2 me-1 container"
                    style={{ fontSize: "15px" }}
                  >
                    {val.channelName}
                  </div>
                  <div
                    className="container text-white"
                    style={{
                      height: "33px",
                      width: "100px",
                      border: "1px solid white",
                      borderRadius: "8px",
                    }}
                  >
                    Follow
                  </div>
                </div>
                <div style={{ fontSize: "15px" }}>{val.videoName} ...more</div>
                <div className="blurdiv mt-2 mb-2">
                  <div>
                    <Song /> {val.songName}
                  </div>
                </div>
              </div>
              {/* <video
            className="position-relative"
            src={val.reel}
            style={{
              zIndex: "1",
              borderRadius: "10px",
            }}
          ></video> */}
              <VideoComponent src={val.reel} vol={vol} setVol={setVol} />
              <div className="d-flex flex-column align-items-center justify-content-end reelIcons">
                <div className="m-2 mb-3">
                  {likeNo[ind] ? (
                    <FaHeart
                      color="red"
                      className="m-2"
                      size={22}
                      onClick={() => likeHandler(ind)}
                    />
                  ) : (
                    <FaRegHeart
                      className="m-2 clrs"
                      size={22}
                      onClick={() => likeHandler(ind)}
                    />
                  )}
                  <p
                    className="w-100 mb-0 text-center"
                    style={{ fontSize: "12px" }}
                  >
                    {like[ind]}
                  </p>
                </div>
                <div className="m-2 mb-3">
                  <Comment />
                  <p
                    className="w-100 mb-0 text-center"
                    style={{ fontSize: "12px" }}
                  >
                    {val.comments}
                  </p>
                </div>
                <div className="m-2 mb-3">
                  <Share />
                </div>
                <div className="m-2 mb-3">
                  <Saved height={24} width={24} />
                </div>
                <div className="m-2 mb-3">
                  <More />
                </div>
                <div className="m-2">
                  <img
                    className="mb-md-0"
                    src={val.img}
                    alt=""
                    style={{
                      marginBottom: "35px",
                      height: "24px",
                      width: "24px",
                      borderRadius: "5px",
                      border: "1px solid black",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
// 623 350 max-800
const VideoComponent = ({ src, vol, setVol }) => {
  const videoRef = useRef(null);
  const [videoContainerRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.5, // Adjust as needed
  });

  useEffect(() => {
    const video = videoRef.current;
    if (isIntersecting && video.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isIntersecting]);

  return (
    <div ref={videoContainerRef} className="video-container position-relative">
      {/* <div className="position-absolute fs-3 rounded-circle d-flex align-items-center justify-content-center " onClick={()=>setVol(!vol)} style={{zIndex:"2", background:"rgba(0, 0, 0, 0.763)", bottom:"10px",right:"50px", height:"35px", width:"35px"}}>{vol ?<IoVolumeHigh size={26} color="white"/> :<IoVolumeMute size={26} color="white"/> }</div> */}
      <video
        ref={videoRef}
        src={src}
        controls={false}
        {...(vol ? {} : { muted: true })}
        className="position-relative"
        style={{ zIndex: "1", borderRadius: "10px" }}
      />
    </div>
  );
};

export { Reels };
