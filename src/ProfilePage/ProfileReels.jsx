import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Firebase';
import { useNavigate, useParams } from 'react-router-dom';
import NoData from "./NoData";

import { FaHeart } from "react-icons/fa6";
import { Comment1 } from '../AllIconsSvgs/IconsSvg';
import { useMediaQuery } from 'react-responsive';
const ProfileReels = () => {
  const firebase = useFirebase();
  const { userId} = useParams();
  const navigate= useNavigate();
  const [allVideos, setAllVideos] = useState([]);
 const isLarger = useMediaQuery({query:'(min-width:600px)'});
  useEffect(() => {
    if (userId) {
      const getall = async () => {
        const userdata = await firebase.getUserData(userId);
        if (userdata && userdata.videos) {
          const imageVideos = userdata.videos.filter(video => video.type === "video"); // Filter videos with type "image"
          setAllVideos(imageVideos); // Set the filtered array in the state
        }
      };
      getall();
    }
  }, [firebase, userId]);

  return (
    <div className="container row d-flex align-items-center justify-content-center m-0 p-0 postpage">
      {allVideos.length > 0 ? (
        <div className={`row col-12 col-md-11 ${isLarger?"row-cols-4":"row-cols-3"}  m-0 p-0`} >
          {allVideos.map((item, index) => (
            <>
                <div
                  key={index}
                  className="col  p-0 m-0 position-relative" 
              onClick={()=>navigate(`/insta/reel/${userId}/${index}`)}

                           style={{
    display: "flex",
    flexWrap: "wrap", border:"1px solid white",cursor:"pointer"
  }}
                >
                   <div
                className="post-hover position-absolute h-100 w-100 "
                style={{zIndex:"5"}}
              >
                <div className="h-100 w-100 posthover2 align-items-center flex-column gap-2 justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, .2)" }}>
                  <div className="d-flex align-items-center"><FaHeart color="white" size={26} /><div className="ms-2 " style={{fontWeight:"700", fontSize:"20px"}}>3</div></div>
                  <div className="d-flex align-items-center"> <Comment1 backgroundColor="white" size={26} /><div className="ms-2 " style={{fontWeight:"700", fontSize:"20px"}}>7</div></div>
                </div>
              </div>
                  <video
                    src={item.src}
                    muted
                    className="img-fluid" // Bootstrap class for responsive video
                    style={{ aspectRatio: '0.6', objectFit: 'fill', width: '100%' }}
                  />
                </div>
            </>
          ))}
        </div>
      ) : (
        <NoData/>
      )}
    </div>
  );
};

export default ProfileReels;
