import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Firebase';
import { useParams } from 'react-router-dom';

const ProfileReels = () => {
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
    <div className="container w-100 ">
      {allVideos.length > 0 ? (
        <div className="row">
          {allVideos.map((item, index) => (
            <>
              {item.type === 'video' && (
                <div
                  key={index}
                  className="col-4  p-0 m-0" // Use Bootstrap grid classes
                  // style={{ backgroundColor: 'green' }}
                >
                  <video
                    src={item.src}
                    muted
                    className="img-fluid" // Bootstrap class for responsive video
                    style={{ aspectRatio: '1', objectFit: 'fill', width: '100%' }}
                    onMouseEnter={(e) => e.target.play()} // Play video on hover
                    onMouseLeave={(e) => e.target.pause()} // Pause video when hover ends
                    preload="metadata" // Preload video metadata
                  />
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <p>No videos available.</p>
      )}
    </div>
  );
};

export default ProfileReels;
