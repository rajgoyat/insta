import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
import { Saved2, Saved} from './AllIconsSvgs/IconsSvg'
import  { useRef} from "react";
import Following from "./Following";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from './useIntersectionObserver';
import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
import Loader from "./Component/Loader";
import CaughtUpBox from './Component/CaughtUpBox'
import { useFirebase } from "./Firebase";

const Center = () => {
 
  return (
    <div 
      className="center align-items-center d-flex  position-relative col-12" style={{zIndex:"4"}}
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
  const [showWatchAgain, setShowWatchAgain] = useState(false); // Watch Again button state

  useEffect(() => {
    const video = videoRef.current;
  
    if (isIntersecting && !showWatchAgain) {
      // Attempt to play the video when it's in view
      video.play().catch((error) => {
        console.error("Error trying to play video:", error);
      });
    } else {
      // Pause the video if it's out of view
      video.pause();
    }
  }, [isIntersecting, showWatchAgain]);
  const handleWatchAgain = async () => {
    const video = videoRef.current;
    
    // Video ko manually pause karte hain
    video.pause();
    // Video ko reset karte hain start position par
    video.currentTime = 0;
    
    // Thoda delay de kar video ko dobara play karte hain
    setTimeout(() => {
    video.play().then(() => {
    setShowWatchAgain(false); // Watch Again button hide karna
    }).catch((error) => {
    console.error("Play failed", error);
    });
    }, 200); // 200ms ka delay to ensure video is properly paused
    };
    
 
  return (
    <div ref={videoContainerRef} className="video-container position-relative col-12 row  m-0 p-0">
      <div className="position-absolute fs-3 rounded-circle d-flex align-items-center col-12 row justify-content-center  m-0 p-0" onClick={()=>setVol(!vol)} style={{zIndex:"2",height:"578px", background:"rgba(0, 0, 0, 0.763)", bottom:"10px",right:"10px", height:"35px", width:"35px"}}>{vol ?<IoVolumeHigh size={26} color="white"/> :<IoVolumeMute size={26} color="white"/> }</div>
      <video ref={videoRef} src={src}
      onEnded={()=>{setShowWatchAgain(true); console.log('ended')}}
      controls={false} {...(vol ? {} : {muted: true})}
 className="position-relative col-12  m-0 p-0" style={{zIndex:'1'}} />
  {showWatchAgain && (
<button
onClick={handleWatchAgain}
style={{
position: "absolute",
zIndex:"2",
width:"150px",
top: "50%",
left: "50%",
transform: "translate(-50%, -50%)",
backgroundColor: "rgba(0, 0, 0, 0.7)",
color: "white",
border: "none",
padding: "10px 20px",
borderRadius: "5px",
cursor: "pointer",
}}
>
Watch Again
</button>
    )}
      </div>
  );
};

const PostData = () => {
  const [vol,setVol]= useState(false)
  const { allUsers, user,savedpost, setsavedpost,handleSavedPost,totalLikes,setTotalLikes,deleteSaved,likedpost,setlikedpost,handleLikedPost,deleteLiked } = useContext(DataContext);
  const [allPosts, setAllPosts] = useState([]);
const firebase= useFirebase();
const {getAllUser}= firebase;
const navigate= useNavigate();
useEffect(()=>{
if(getAllUser.length>0 && totalLikes.length===0){
  const data= getAllUser.map((val)=>{
    return val.likedBy
  }).filter(val=> val!==undefined).flat();  
  setTotalLikes(data)
}
},[getAllUser])
useEffect(()=>{
 if(user?.saved && savedpost.length===0){
    const hello=  user.saved
      setsavedpost(hello)
    }
    if(user?.likedBy && likedpost.length===0){
      const hello=  user.likedBy
        setlikedpost(hello)
      }
},[user])

const handleFollow=async (followstate)=>{
  try {
    if (followstate === "Follow") {
      await firebase.followuser(user.userId); // Perform follow action
    } else {
      await firebase.unfollowuser(user.userId); // Optionally, perform unfollow action if needed
    }
  } catch (error) {
    console.error("Error in following/unfollowing user:", error);
  }
}
  const getAllPosts = () => {
    if (allUsers && Array.isArray(allUsers) && allPosts.length===0) {
      const data2 = allUsers.filter(u=> user?.followings.includes(u.userId));// Combine video posts with the user's fullname and username
      const posts = data2.flatMap(user => {
        // Check if user.video is a valid array before mapping
        if (Array.isArray(user.videos)) {
          return user.videos.map(videos => ({
            ...videos,           // Spread video properties (src, type, etc.)  // Add the user's fullname
            username: user.username,  
            userId:user.userId,
            proimg:user.proimg// Add the user's username (if needed)
          }));
        }
        return []; // If user.video is not an array, return an empty array
      }).filter(post => post.src); // Filter out any posts that do not have a src
      const shuffledPosts = posts.sort(() => Math.random() - 0.5);
      setAllPosts(shuffledPosts);
    }
  };  
 
useEffect(() => {
  getAllPosts();
}, [allUsers]);
  const handleProfile=(id)=>{
navigate(`/insta/profile/${id}`)
  }
    return (
    <div className="postData p-0 m-0 w-100 d-flex flex-column align-items-center justify-content-center  row pe-0">
{allPosts.length > 0 && totalLikes.length > 0 ? (<>
      {allPosts.map((val,ind) => {
        const isVideo = (type) => {
          if(type==="video")
          return true;
        };
        return (<>
          <div className="position-relative row col-12 m-0 p-0" key={ind} style={{width:'468px'}}>
            <div
              className="position-relative d-flex p-2 mt-3 col-12  m-0 p-0"
              
            >
              
                <img onClick={()=>handleProfile(val.userId)}
                  className="rounded-circle border border-dark"
                  style={{ width: "32px", height: "32px", cursor:"pointer" }}
                  src={val.proimg}
                  alt=""
                />
            
              <div
                className="d-flex flex-column text-dark ms-2"
                style={{ fontSize: "13px" }}
              >
              <p className="m-0 p-0 d-flex flex-row" >
                <p className="p-0 m-0">{val.username}</p>
                  
                    <p className="ms-2 text-primary m-0 p-0" style={{cursor:"pointer"}} onClick={()=>handleFollow(user?.followings?.includes(val.userId)?"Unfollow":"Follow")}>{user?.followings?.includes(val.userId)?"Unfollow":"Follow"}</p>
                 
                </p> 
                <p className="p-0 m-0">Suggested for you</p>
              </div>
              <div className="position-absolute" style={{ right: "0px" }}>
                <BsThreeDotsVertical size={20} />
              </div>
            </div>
            {isVideo(val.type) ? <VideoComponent src={val.src}  vol={vol} setVol={setVol} /> : <img src={val.src} alt="" className="col-12 m-0 p-0" /> }
            
            <div className="col-12 position-relative">
            {likedpost.includes(val.src) ? <FaHeart color="red" className="m-2" size={22} onClick={()=>deleteLiked(val.src)}/> : <FaRegHeart  className="m-2" size={22} onClick={()=>handleLikedPost(val.username,val.userId,val.proimg,"like",val.src)}/> }
              <BiMessageRounded className="m-2" size={23} />
              <LuSend className="m-2" size={23} />
                
                <div className="position-absolute end-0  top-0 mt-1 me-1" 
                onClick={()=>savedpost?.some(item=>item.link===val.src)?deleteSaved(val.src,val.userId,val.type):handleSavedPost(val.src,val.userId,val.type)} > {savedpost?.some(item=>item.link===val.src)?<Saved2 />:<Saved height={24} width={24} /> }</div>
            </div>
            <div className="text-dark" style={{ fontSize: "12px" }}>
              <p className="m-0">{totalLikes?.filter(vals=>vals===val.src).length} likes</p>
              <p className="m-0 p-0">
                {val.desc}
              </p>
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
          
          </>
        );
      })}<CaughtUpBox/></>):(<div className="d-felx align-items-center justify-content-center "><Loader/></div>)}
    </div>
  );
};
export { Center, PostData };
