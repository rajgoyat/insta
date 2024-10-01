import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Firebase';
import { useParams } from 'react-router-dom';

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
    <div className="container">
      {allVideos.length > 0 ? (
        <div className="row">
          {allVideos.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4  p-0">
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={`Post ${index}`}
                  className="img-fluid"
                  style={{
                    background: "cover",
                    aspectRatio: "1",
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
                    background: "cover",
                    objectFit: "fill",
                    aspectRatio: "1",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => e.target.play()} // Play video on hover
                  onMouseLeave={(e) => e.target.pause()} // Pause video when hover ends
                  preload="metadata"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
