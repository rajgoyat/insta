import React from "react";
import { SideBottombars } from "./Insta";
import { useRef, useEffect, useState, useContext } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { DataContext } from "./Context/DataContext";
import "./insta.css";
import "./ProfilePage/profile.css";
import { Comment, Share, Saved, More, Song, Saved2 } from "./AllIconsSvgs/IconsSvg";
import useIntersectionObserver from "./useIntersectionObserver";
import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
import { useFirebase } from "./Firebase";

const Reels = () => {
  const [vol, setVol] = useState(false);
  const { allUsers, savedpost,handleSavedPost,deleteSaved,deleteLiked,handleLikedPost,likedpost,totalLikes } = useContext(DataContext);
  const [allPosts, setAllPosts] = useState([]);
  const [followState, setFollowState] = useState(''); // Store follow state for each user
  const firebase = useFirebase();
  const { userdata } = firebase;
  useEffect(() => {
    const getAllPosts = () => {
      if (allUsers && Array.isArray(allUsers)) {
        // Combine video posts with the user's username, userId, and proimg
        const posts = allUsers.flatMap((user) => {
          if (Array.isArray(user.videos)) {
            return user.videos
              .filter((videos) => videos.type !== "image" && user.userId !== userdata.userId)  // Filter out videos where video.userId === userdata.userId
              .map((videos) => ({
                ...videos, // Spread video properties (src, type, etc.)
                username: user.username,
                userId: user.userId,
                proimg: user.proimg,
              }));
          }
          return []; // If user.video is not an array, return an empty array
        }).filter((post) => post.src); // Filter out any posts that do not have a src
  
        // Set the filtered posts in the state
        setAllPosts(posts);
      }
    };
  
    getAllPosts();
  }, [allUsers, userdata]);
  
  // Follow/Unfollow logic
  const handleFollow = async (userId) => {
    try {
      if (followState[userId] === "Follow") {
        await firebase.followuser(userId);
        setFollowState((prevState) => ({
          ...prevState,
          [userId]: "Unfollow",
        }));
      } else {
        await firebase.unfollowuser(userId);
        setFollowState((prevState) => ({
          ...prevState,
          [userId]: "Follow",
        }));
      }
    } catch (error) {
      console.error("Error in following/unfollowing user:", error);
    }
  };

  useEffect(() => {
    // Check follow state when posts are loaded
    if(allUsers&&userdata){
    allUsers.forEach((post) => {
      if(userdata&&post.userId){
      if (userdata?.followings?.includes(post.userId)) {
        setFollowState((prevState) => ({
          ...prevState,
          [post.userId]: "Unfollow",
        }));
      } else {
        setFollowState((prevState) => ({
          ...prevState,
          [post.userId]: "Follow",
        }));
      }
    }})
  }}, [allUsers, userdata]);

  return (
    <>
      <div>
        <SideBottombars />
      </div>
      <div className="mainReels d-flex align-items-center justify-content-center flex-column">
        {allPosts.map((val, ind) => {
          return (
            <div key={ind} className="position-relative m-2 d-flex">
              <div
                className="soundBtnReels position-absolute fs-3 rounded-circle d-flex align-items-center justify-content-center"
                onClick={() => setVol(!vol)}
                style={{
                  zIndex: "2",
                  borderRadius:"50%",
                  background: "rgba(0, 0, 0, 0.763)",
                  height: "31px",
                  width: "31px",
                }}
              >
                {vol ? (
                  <IoVolumeHigh size={16} color="white" />
                ) : (
                  <IoVolumeMute size={16} color="white" />
                )}
              </div>

              <div
                className="position-absolute reelData text-white"
                style={{ zIndex: "2" }}
              >
                <div className=" d-flex flex-row">
                  <img
                    className="rounded-circle"
                    src={val.proimg}
                    alt=""
                    style={{ height: "32px", width: "32px" }}
                  />
                  <div
                    className="ms-2 me-1 container"
                    style={{ fontSize: "15px" }}
                  >
                    {val.username}
                  </div>
                  <div
                    className="container text-white"
                    style={{
                      height: "33px",
                      width: "100px",
                      border: "1px solid white",
                      borderRadius: "8px",
                    }}
                    onClick={() => handleFollow(val.userId)}
                  >
                    {followState[val.userId] || "Follow"}
                  </div>
                </div>
                <div style={{ fontSize: "15px" }}>{val.desc} ...more</div>
                <div className="blurdiv mt-2 mb-2">
                  <div>
                    <Song /> {"val.songName"}
                  </div>
                </div>
              </div>
              <VideoComponent src={val.src} vol={vol} setVol={setVol} />
              <div className="d-flex flex-column align-items-center justify-content-end reelIcons">
                <div className="m-2 mb-3">
                  {likedpost.includes(val.userId) ? (
                    <FaHeart
                      color="red"
                      className="m-2"
                      size={22}
                      onClick={()=>deleteLiked(val.userId)}
                    />
                  ) : (
                    <FaRegHeart
                      className="m-2 clrs"
                      size={22}
                      onClick={()=>handleLikedPost(val.username,val.userId,val.proimg,"like")}
                    />
                  )}
                  <p
                    className="w-100 mb-0 text-center"
                    style={{ fontSize: "12px" }}
                  >
                    {totalLikes?.filter(vals=>vals===val.src).length}
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
                <div className="m-2 mb-3" onClick={()=>savedpost?.some(item=>item.link===val.src)?deleteSaved(val.src,val.userId,val.type):handleSavedPost(val.src,val.userId,val.type)}>
                  {savedpost?.some(item=>item.link===val.src)?<Saved2/>:<Saved height={24} width={24} />}
                  
                </div>
                <div className="m-2 mb-3">
                  <More />
                </div>
                <div className="m-2">
                  <img
                    className="mb-md-0"
                    src={val.proimg}
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

const VideoComponent = ({ src, vol, setVol }) => {
  const videoRef = useRef(null);
  const [videoContainerRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.5,
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
