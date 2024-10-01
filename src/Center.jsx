import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
// import Following from "./Following"; 
// import { Link } from "react-router-dom";
// import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa6";
// import { BiMessageRounded } from "react-icons/bi";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { LuSend } from "react-icons/lu";

// const PostData = () => {
//   const { allUsers } = useContext(DataContext);
//   const [allPosts, setAllPosts] = useState([]);
//   const [imageCount, setImageCount] = useState(0);
//   const [likeStatus, setLikeStatus] = useState([]);

//   useEffect(() => {
//     const getAllPosts = () => {
//       if (allUsers && Array.isArray(allUsers)) {
//         const posts = allUsers.flatMap(user => user.video || []).filter(post => post.src);
//         setAllPosts(posts);

//         const imageCount = posts.filter(post => post.type === 'image').length;
//         setImageCount(imageCount);
//       }
//     };
//     getAllPosts();
//   }, [allUsers]);

//   const likeHandler = (index) => {
//     setLikeStatus(prev => {
//       const newStatus = [...prev];
//       newStatus[index] = !newStatus[index];
//       return newStatus;
//     });
//   };
// // console.log(allPosts)
//   return (
//     <div className="postData w-100 d-flex flex-column align-items-center justify-content-center">
//       <h3>Total Images: {imageCount}</h3>
//       {allPosts.length > 0 ? (
//         <div className="row">
//           {allPosts.map((item, index) => {
//             // console.log(allPosts);
//             return (
//               <div key={index} className="position-relative col-12 m-0 pe-0 mb-3">
//                 <div className="d-flex p-2 mt-3">
//                   <Link to="/insta-app/profile">
//                     <img
//                       className="rounded-circle border border-dark"
//                       style={{ width: "32px", height: "32px" }}
//                       src={allUsers[index].proimg}
//                       alt=""
//                     />
//                   </Link>
//                   <div className="d-flex flex-column text-dark ms-2">
//                     <Link to="/insta-app/profile" className="text-decoration-none text-reset">
//                       <p className="m-0 p-0 d-flex flex-row">
//                         <span className="p-0 m-0">{item.userName}</span>
//                         <span className="ms-2 text-primary m-0 p-0">Follow</span>
//                       </p>
//                     </Link>
//                     <p className="p-0 m-0">Suggested for you</p>
//                   </div>
//                   <div className="position-absolute" style={{ right: "0px" }}>
//                     <BsThreeDotsVertical size={20} />
//                   </div>
//                 </div>
//                 {item.type === 'image' ? (
//                   <img
//                     src={item.src}
//                     alt={`Post ${index}`}
//                     className="img-fluid"
//                     style={{
//                       height: "auto", // Let the height be determined by the content
//                       width: "100%", // Make sure it takes the full width
//                     }}
//                   />
//                 ) : (
//                   <video
//                     src={item.src}
//                     controls
//                     muted
//                     className="img-fluid"
//                     style={{
//                       height: "auto", // Let the height be determined by the content
//                       maxHeight: "600px", // Limit max height
//                       width: "100%", // Make sure it takes the full width
//                     }}
//                   />
//                 )}
//                 <div className="col-12 position-relative">
//                   {likeStatus[index] ? (
//                     <FaHeart color="red" className="m-2" size={22} onClick={() => likeHandler(index)} />
//                   ) : (
//                     <FaRegHeart className="m-2" size={22} onClick={() => likeHandler(index)} />
//                   )}
//                   <BiMessageRounded className="m-2" size={23} />
//                   <LuSend className="m-2" size={23} />
//                   <div className="position-absolute end-0 top-0 mt-1 me-1">
//                     <FaRegBookmark size={20} />
//                   </div>
//                 </div>
//                 <div className="text-dark" style={{ fontSize: "12px" }}>
//                   <p className="m-0">{item.likes} likes</p>
//                 </div>
//                 <div style={{
//                   fontSize: "12px",
//                   color: "rgb(115 115 115)",
//                   borderBottom: "1px solid rgb(219 219 219)",
//                   padding: "2px 15px 0 10px",
//                 }}>
//                   <p className="m-0">View all comments</p>
//                   <p className="m-0">Add a comment</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p>No posts available.</p>
//       )}
//     </div>
//   );
// }  
// const Center = () => {
//   return (
//     <div className="center align-items-center position-relative col-12" style={{ zIndex: "4" }}>
//       <Following />
//     </div>
//   );
// };

// export { Center, PostData };
import  { useRef} from "react";
import { peopleImgs } from "./SuggestionData";
import Following from "./Following";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useIntersectionObserver from './useIntersectionObserver';
import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
const Center = () => {
 
  return (
    <div 
      className="center align-items-center position-relative col-12" style={{zIndex:"4"}}
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
    <div ref={videoContainerRef} className="video-container position-relative col-12 row  m-0 p-0">
      <div className="position-absolute fs-3 rounded-circle d-flex align-items-center col-12 row justify-content-center  m-0 p-0" onClick={()=>setVol(!vol)} style={{zIndex:"2",height:"578px", background:"rgba(0, 0, 0, 0.763)", bottom:"10px",right:"10px", height:"35px", width:"35px"}}>{vol ?<IoVolumeHigh size={26} color="white"/> :<IoVolumeMute size={26} color="white"/> }</div>
      <video ref={videoRef} src={src} controls={false} {...(vol ? {} : {muted: true})}  className="position-relative col-12  m-0 p-0" style={{zIndex:'1'}} />
    </div>
  );
};

const PostData = () => {
  const [vol,setVol]= useState(false)
  const [randomNo, setRandomNo]= useState([])
  const dataLength= peopleImgs.length;
  const [like,setLikes]= useState([]) 

  const [likeNo, setLikeNo]= useState(Array(dataLength).fill(false))
  const { allUsers } = useContext(DataContext);
  const [allPosts, setAllPosts] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [likeStatus, setLikeStatus] = useState([]);
const navigate= useNavigate();
useEffect(() => {
  const getAllPosts = () => {
    if (allUsers && Array.isArray(allUsers)) {
      // Combine video posts with the user's fullname and username
      const posts = allUsers.flatMap(user => {
        // Check if user.video is a valid array before mapping
        if (Array.isArray(user.video)) {
          return user.video.map(video => ({
            ...video,           // Spread video properties (src, type, etc.)
            fullname: user.fullname,  // Add the user's fullname
            username: user.username,  
            userId:user.userId,
            proimg:user.proimg// Add the user's username (if needed)
          }));
        }
        return []; // If user.video is not an array, return an empty array
      }).filter(post => post.src); // Filter out any posts that do not have a src

      // Set the posts in the state
      setAllPosts(posts);

      // Calculate the number of image posts
      const imageCount = posts.filter(post => post.type === 'image').length;
      setImageCount(imageCount);
    }
  };

  getAllPosts();
}, [allUsers]);
console.log(allPosts)

//   const likeHandler = (index) => {
//     setLikeStatus(prev => {
//       const newStatus = [...prev];
//       newStatus[index] = !newStatus[index];
//       return newStatus;
//     });
//   };

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
  console.log("hello from raj")
  setLikes(randomNo.map((index) => peopleImgs[index].likes));
}, []);

  const likeHandler = (index) => {
    console.log(index)
    setLikes((prevLikes) => 
      prevLikes.map((like, i) => (i === index ? (likeNo[index] ? like - 1 : like + 1) : like))
    );

    setLikeNo((prevLikeNo) => 
      prevLikeNo.map((likeState, i) => (i === index ? !likeState : likeState))
    );
  };
  const handleFollow=(id)=>{
navigate(`/insta-app/profile/${id}`)
  }
    return (
    <div className="postData w-100 d-flex flex-column align-items-center justify-content-center row pe-0">
{/* <VideoComponent src={vid1}  vol={vol} setVol={setVol}/> */}
{/* <VideoComponent src={vid1}  vol={vol} setVol={setVol} /> */}
{allPosts.length > 0 ? (<>
      {allPosts.map((val,ind) => {
        const isVideo = (type) => {
          if(type==="video")
          return true;
        };
        return (
          <div className="position-relative row col-12 m-0 pe-0" key={ind} style={{width:'468px'}}>
            <div
              className="position-relative d-flex p-2 mt-3 col-12  m-0 p-0"
              
            >
              
                <img onClick={()=>handleFollow(val.userId)}
                  className="rounded-circle border border-dark"
                  style={{ width: "32px", height: "32px" }}
                  src={val.proimg}
                  alt=""
                />
            
              <div
                className="d-flex flex-column text-dark ms-2"
                style={{ fontSize: "13px" }}
              >
              <p className="m-0 p-0 d-flex flex-row" >
                <p className="p-0 m-0">{val.username}</p>
                  
                    <p className="ms-2 text-primary m-0 p-0">Follow</p>
                 
                </p> 
                <p className="p-0 m-0">Suggested for you</p>
              </div>
              <div className="position-absolute" style={{ right: "0px" }}>
                <BsThreeDotsVertical size={20} />
              </div>
            </div>
            {isVideo(val.type) ? <VideoComponent src={val.src}  vol={vol} setVol={setVol} /> : <img src={val.src} alt="" className="col-12 m-0 p-0" /> }
            
            <div className="col-12 position-relative">
            {likeNo[ind] ? <FaHeart color="red" className="m-2" size={22} onClick={()=>likeHandler(ind)}/> : <FaRegHeart  className="m-2" size={22} onClick={()=>likeHandler(ind)}/> }
              <BiMessageRounded className="m-2" size={23} />
              <LuSend className="m-2" size={23} />
                
                <div className="position-absolute end-0  top-0 mt-1 me-1" ><FaRegBookmark
                size={20}
              /></div>
            </div>
            <div className="text-dark" style={{ fontSize: "12px" }}>
              <p className="m-0">{like[ind]} likes</p>
              <p className="m-0 p-0">
                cars_universe.tiktok #vutruxe #catagram
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
        );
      })}</>):('jk')}
    </div>
  );
};
export { Center, PostData };
