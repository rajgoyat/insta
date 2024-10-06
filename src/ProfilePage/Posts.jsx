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
            <div key={index} className=" col-4  p-0">
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
        <div className='w-100 DALJU d-flex align-items-center justify-content-center flex-column text-center' style={{height:"227px"}}>
    <Camera/>
    <span style={{fontSize:"30px",color:'#000000',fontWeight:"800"}}>Share photos</span>
    <span style={{fontSize:"14px",color:'#000000',fontWeight:"400"}}>When you share photos, they will appear on your profile.</span>
    <div className='share_text'>Share your first photo</div>
</div>

      )}
    </div>
  );
};

export default Posts;
const Camera=()=>(
  <svg aria-label="Camera" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62"><title>Camera</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></circle><ellipse cx="48.002" cy="49.524" fill="none" rx="10.444" ry="10.476" stroke="currentColor" stroke-linejoin="round" stroke-width="2.095"></ellipse><path d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
)