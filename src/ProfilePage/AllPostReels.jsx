import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from "../Context/DataContext";

const Allpostreel = () => {
  const { allUsers } = useContext(DataContext);
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    const getAllVideos = () => {
      if (allUsers && Array.isArray(allUsers)) {
        const videos = allUsers.flatMap(user => {
          if (Array.isArray(user.videos)) {
            return user.videos.filter(videos => videos.src && videos.src !== ""); 
          }
          return [];
        });
        setAllVideos(videos);
      }
    };
    getAllVideos();
  }, [allUsers]);

  return (
    <div className="container">
      {allVideos.length > 0 ? (
        <div className="row">
          {allVideos.map((item, index) => (
            <div key={index} className="">
              <div className="insta-item">
              {item.type === 'image' ? (
                  <img src={item.src} alt={`Post ${index}`} className="img-fluid" style={{background:"cover",objectFit:"cover"}} />
                ) : (
                  <video src={item.src}   className="img-fluid" style={{background:"cover",objectFit:"cover"}} />
                )}
                  {/* <video
                  src={item.src}
                  muted
                  className="img-fluid" style={{aspectRatio:"1"}}
                  onMouseEnter={(e) => e.target.play()} // Play video on hover
                  onMouseLeave={(e) => e.target.pause()} // Pause video when hover ends
                  preload="metadata" // Preload video metadata
                /> */}
                
              </div>
            </div> 
          ))}
        </div>
      ) : (
        <p>No videos available.</p>
      )}
    </div>
  );
};

export default Allpostreel;
