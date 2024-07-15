import React, { useState , useRef, useEffect} from "react";
// import vid from './post/VID-20240616-WA0001.mp4'
import { peopleImgs } from "./SuggestionData";
import Following from "./Following";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { Link } from "react-router-dom";
// import vid1 from './post/VID-20240616-WA0001.mp4'
import useIntersectionObserver from './useIntersectionObserver';
import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
const Center = () => {
 
  return (
    <div
      className="center align-items-center position-relative" style={{zIndex:"4"}}
    >
      <Following />
    </div>
  );
};
const VideoComponent = ({ src, vol ,setVol }) => {
 
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
      <div className="position-absolute fs-3 rounded-circle d-flex align-items-center justify-content-center " onClick={()=>setVol(!vol)} style={{zIndex:"2", background:"rgba(0, 0, 0, 0.763)", bottom:"10px",right:"50px", height:"35px", width:"35px"}}>{vol ?<IoVolumeHigh size={26} color="white"/> :<IoVolumeMute size={26} color="white"/> }</div>
      <video ref={videoRef} src={src} controls={false} {...(vol ? {} : {muted: true})}  className="position-relative" style={{zIndex:'1'}} />
    </div>
  );
};

const PostData = () => {
  const [vol,setVol]= useState(false)
  const [randomNo, setRandomNo]= useState([])
  const dataLength= peopleImgs.length;

  const [likeNo, setLikeNo]= useState(Array(dataLength).fill(false))
  const generateUniqueRandomNumbers = () =>{
    const numbers = [];
    while (numbers.length < dataLength) {
      const randomNumber =Math.floor(Math.random() * dataLength); // Generates numbers from 0 to 6
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    setRandomNo(numbers)
  } 
  useEffect(() => {
    generateUniqueRandomNumbers();
}, []);
useEffect(() => {
  console.log("no here",like
  )
}, [randomNo]);
const [like,setLikes]= useState(randomNo.map(val=>peopleImgs[val].likes)) 

  const likeHandler = (index) => {
    console.log(index)
    setLikes((prevLikes) => 
      prevLikes.map((like, i) => (i === index ? (likeNo[index] ? like - 1 : like + 1) : like))
    );

    setLikeNo((prevLikeNo) => 
      prevLikeNo.map((likeState, i) => (i === index ? !likeState : likeState))
    );
  };
  // console.log("likeO",peopleImgs.length)
    return (
    <div className="postData w-100 d-flex flex-column align-items-center justify-content-center">
{/* <VideoComponent src={vid1}  vol={vol} setVol={setVol}/> */}
{/* <VideoComponent src={vid1}  vol={vol} setVol={setVol} /> */}

      {randomNo.map((val,ind) => {
        const isVideo = (src) => {
          const videoExtensions = ['mp4'];
          const extension = src.split('.').pop();
          return videoExtensions.includes(extension);
        };
        return (
          <div className="position-relative" key={ind}>
            <div
              className="position-relative d-flex p-2 mt-3 "
              style={{ width: "464px" }}
            >
              <Link to="/insta-app/profile" onClick={() => console.log("hello")}>
                <img
                  className="rounded-circle border border-dark"
                  style={{ width: "32px", height: "32px" }}
                  src={peopleImgs[val].img}
                  alt=""
                />
              </Link>
              <div
                className="d-flex flex-column text-dark ms-2"
                style={{ fontSize: "13px" }}
              >
                <Link to="/insta-app/profile" className="text-decoration-none text-reset"><p className="m-0 p-0 d-flex flex-row">
                <p className="p-0 m-0">{peopleImgs[val].id}</p>
                  
                    <p className="ms-2 text-primary m-0 p-0">Follow</p>
                 
                </p> </Link>
                <p className="p-0 m-0">Suggested for you</p>
              </div>
              <div className="position-absolute" style={{ right: "0px" }}>
                <BsThreeDotsVertical size={20} />
              </div>
            </div>
            {isVideo(peopleImgs[val].post) ? <VideoComponent src={peopleImgs[val].post}  vol={vol} setVol={setVol} /> : <img className="" src={peopleImgs[val].post} alt="" /> }
            
            <div>
            {likeNo[ind] ? <FaHeart color="red" className="m-2" size={22} onClick={()=>likeHandler(ind)}/> : <FaRegHeart  className="m-2" size={22} onClick={()=>likeHandler(ind)}/> }
              <BiMessageRounded className="m-2" size={23} />
              <LuSend className="m-2" size={23} />
              <FaRegBookmark
                className=""
                style={{ marginLeft: "325px" }}
                size={20}
              />
            </div>
            <div className="text-dark" style={{ fontSize: "12px" }}>
              <p className="m-0">{like[val]} likes</p>
              <p className="m-0">
                cars_universe.tiktok #vutruxe #catagram
              </p>{" "}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgb(115 115 115)",
                borderBottom: "1px solid rgb(219 219 219)",
                padding: "2px 0 15px 0",
              }}
            >
              <p className="m-0">View all 345 comments</p>
              <p className="m-0">Add a comment</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export { Center, PostData };
