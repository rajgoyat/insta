import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "../Context/DataContext";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import useIntersectionObserver from "../useIntersectionObserver";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import Loader from "../Component/Loader";
import CaughtUpBox from "../Component/CaughtUpBox";
import { useFirebase } from "../Firebase";
import EditProLayout from "../Layout/EditProLayout";
// Video Component
const VideoComponent = ({ src, vol, setVol }) => {
  const videoRef = useRef(null);
  const [videoContainerRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (isIntersecting) {
      video.play().catch((error) => {
        console.error("Error trying to play video:", error);
      });
    } else {
      video.pause();
    }
  }, [isIntersecting]);

  return (
    <div
      ref={videoContainerRef}
      className="video-container position-relative col-12 row  m-0 p-0"
    >
      <div
        className="position-absolute fs-3 rounded-circle d-flex align-items-center col-12 row justify-content-center  m-0 p-0"
        onClick={() => setVol(!vol)}
        style={{
          zIndex: "2",
          height: "578px",
          background: "rgba(0, 0, 0, 0.763)",
          bottom: "10px",
          right: "10px",
          height: "35px",
          width: "35px",
        }}
      >
        {vol ? <IoVolumeHigh size={26} color="white" /> : <IoVolumeMute size={26} color="white" />}
      </div>
      <video ref={videoRef} src={src} controls={false} {...(vol ? {} : { muted: true })} className="position-relative col-12  m-0 p-0" style={{ zIndex: "1" }} />
    </div>
  );
};

// Main NavigatePost Component
const NavigatePost = () => {
  const [vol, setVol] = useState(false);
  const [like, setLikes] = useState([]);
  const { userId, postorreel } = useParams(); // Get the post/reel type and index from URL
  const [likeNo, setLikeNo] = useState(false);
  const { user, navigateSrc} = useContext(DataContext);
  const [allPosts, setAllPosts] = useState([]);
  const [allReels, setAllReels] = useState([]);
  const [followstate, setfollowstate] = useState("");
  const firebase = useFirebase();
  const contentRefs = useRef([]);
  const navigate = useNavigate();
  let content = postorreel === "post" ? allPosts : allReels; // Determine if it's posts or reels

  // Fetch follow state
  useEffect(() => {
    if (user?.followings?.includes(user.userId)) {
      setfollowstate("Unfollow");
    } else {
      setfollowstate("Follow");
    }
  }, [user]);

  // Handle follow/unfollow action
  const handleFollow = async () => {
    try {
      if (followstate === "Follow") {
        await firebase.followuser(user.userId);
        setfollowstate("Unfollow");
      } else {
        await firebase.unfollowuser(user.userId);
        setfollowstate("Follow");
      }
    } catch (error) {
      console.error("Error in following/unfollowing user:", error);
    }
  };

  // Fetch all posts
  useEffect(() => {
    if (userId) {
      const getall = async () => {
        const userdata = await firebase.getUserData(userId);
        if (userdata && userdata.videos) {
          const imageVideos = userdata.videos.filter((video) => video.type === "image");
          setAllPosts(imageVideos);  if (allPosts.length > 0) {
          }

        }
      };
      getall();
    }
  }, [userId]);

  // Fetch all reels
  useEffect(() => {
    if (userId) {
      const getall = async () => {
        const userdata = await firebase.getUserData(userId);
        if (userdata && userdata.videos) {
          const imageVideos = userdata.videos.filter((video) => video.type === "video");
          setAllReels(imageVideos);
          if (allReels.length > 0) {
          }
       
        }
      };
      getall();
    }
  }, [firebase, userId]);

  const handleProfile = (id) => {
    navigate(`/insta/profile/${id}`);
  };
  const [move,setMove]= useState(-1)
  useEffect(() => {
    if (navigateSrc && content.length > 0) {    
      setTimeout(() => {
        const foundIndex = content.findIndex((item) => item.src === navigateSrc);
        setMove(foundIndex);
        if (foundIndex !== -1 && contentRefs.current[foundIndex]) {
          contentRefs.current[foundIndex].scrollIntoView({
            behavior: "auto",
            block: "start"
          });
      }
      }, 1000); //
    }},[navigateSrc,content,move])
      return (
    <EditProLayout>
      
      <div  className="postData w-100 d-flex flex-column align-items-center justify-content-center row pe-0 mt-5 mt-md-auto">
        {content.length > 0 && move!== -1 ?  (
          <>
            {content.map((val, index) => {
              const isVideo = (type) => type === "video";

              return (
                <div ref={(el) => (contentRefs.current[index] = el)}
                  className="position-relative row col-12 m-0 pe-0"
                  key={index}
                  style={{ width: "468px" }}
                >
                  <div className="position-relative d-flex p-2 mt-3 col-12  m-0 p-0">
                    <img
                      onClick={() => handleProfile(val.userId)}
                      className="rounded-circle border border-dark"
                      style={{ width: "32px", height: "32px", cursor: "pointer" }}
                      src={val.proimg}
                      alt=""
                      
                    />
                    <div className="d-flex flex-column text-dark ms-2" style={{ fontSize: "13px" }}>
                      <p className="m-0 p-0 d-flex flex-row">
                        <p className="p-0 m-0">{val.username}</p>
                        <p
                          className="ms-2 text-primary m-0 p-0"
                          style={{ cursor: "pointer" }}
                          onClick={handleFollow}
                        >
                          {followstate}
                        </p>
                      </p>
                      <p className="p-0 m-0">Suggested for you</p>
                    </div>
                    <div className="position-absolute" style={{ right: "0px" }}>
                      <BsThreeDotsVertical size={20} />
                    </div>
                  </div>
                  {isVideo(val.type) ? (
                    <VideoComponent src={val.src} vol={vol} setVol={setVol} />
                  ) : (
                    <img src={val.src} alt="" className="col-12 m-0 p-0" />
                  )}
                  <div className="col-12 position-relative">
                    {likeNo[index] ? (
                      <FaHeart color="red" className="m-2" size={22} onClick={() => console.log(index)} />
                    ) : (
                      <FaRegHeart className="m-2" size={22} onClick={() => console.log(index)} />
                    )}
                    <BiMessageRounded className="m-2" size={23} />
                    <LuSend className="m-2" size={23} />
                    <div className="position-absolute end-0  top-0 mt-1 me-1">
                      <FaRegBookmark size={20} />
                    </div>
                  </div>
                  <div className="text-dark"  style={{ fontSize: "12px" }}>
                    <p className="m-0">{like[index]} likes</p>
                    <p className="m-0 p-0">{val.desc}</p>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgb(115 115 115)",
                      borderBottom: "1px solid rgb(219 219 219)",
                      padding: "2px 15px 0 10px",
                    }}
                  >
                    <p className="m-0">View all 345 comments</p>
                    <p className="m-0">Add a comment</p>
                  </div>
                </div>
              );
            })}
            <CaughtUpBox />
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <Loader />
          </div>
        )}
      </div>
      
    </EditProLayout>
  );
};

export default NavigatePost;
