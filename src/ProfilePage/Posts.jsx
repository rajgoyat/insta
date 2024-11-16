import React, { useContext, useEffect, useState } from "react";
import { useFirebase } from "../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import {Comment1,VideoSvg} from '../AllIconsSvgs/IconsSvg'
import NoData from "./NoData";
import { DataContext } from "../Context/DataContext";
const Posts = () => {
  const firebase = useFirebase();
  const { userId } = useParams();
  const [allVideos, setAllVideos] = useState([]);
  const {setNavigateSrc}= useContext(DataContext)
const navigate= useNavigate();
  useEffect(() => {
    if (userId) {
      const getall = async () => {
        const userdata = await firebase.getUserData(userId);
        if (userdata && userdata.videos) {
          const imageVideos = userdata.videos.filter(video => video.type === "image"); // Filter videos with type "image"
          setAllVideos(imageVideos); // Set the filtered array in the state
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
              onClick={()=>{setNavigateSrc(item.src); navigate(`/insta/post/${userId}`)}}

              style={{
                display: "flex",
                flexWrap: "wrap",
                border: "3px solid white",
              }}
            >
              <div
                className="position-absolute top-0 end-0"
                style={{ marginRight: "3px", cursor: "pointer",zIndex:"11" ,color:"white"}}
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
              {/* {item.type === "image" ? ( */}
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
               {/* ) : (
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
               )} */}
            </div>
          ))}
        </div>
      ) : (
       <NoData/>      )}
    </div>
  );
};

export default Posts;
