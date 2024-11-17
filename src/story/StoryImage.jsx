
import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, doc,updateDoc, getDoc} from 'firebase/firestore';
import { useFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const StoryImage = () => {
  const [stories, setStories] = useState([]);
  const firebase = useFirebase();
  const { userdata } = firebase; 
  const navigate = useNavigate();
  const fileURL = useRef(null); 

const handleFileUpload1 = (event) => {
  const file = event.target.files[0];
  if (file) {
    fileURL.current = URL.createObjectURL(file); 
    const storyData = {
      file: file,
      fileURL: fileURL.current, 
            fileType: file.type.startsWith("image/") ? "image" : "video",
    };
    navigate('/insta/create/story', { state: storyData });
    return () => URL.revokeObjectURL(fileURL.current);
  }
};

  const fetchStories = async () => {
    const userId = userdata?.userId; // Get current user ID

    // Use getDoc to retrieve the user document
    const userDoc = await getDoc(doc(getFirestore(), `users/${userId}`));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Filter stories to keep only those uploaded within the last 24 hours
      const filteredStories = (userData.stories || []).filter(story => {
        const currentTime = new Date().getTime();
        return (currentTime - story.timestamp) <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      });
await deleteExpiredStories()
      setStories(filteredStories.reverse());
    }
  };

  const deleteExpiredStories = async () => {
    const userId = userdata?.userId; // Get current user ID

    // Use getDoc to retrieve the user document
    const userDoc = await getDoc(doc(getFirestore(), `users/${userId}`));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      const expiredStories = (userData.stories || []).filter(story => {
        const currentTime = new Date().getTime();
        return (currentTime - story.timestamp) > 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      });

      // Update the user document to remove expired stories
      const remainingStories = (userData.stories || []).filter(story => !expiredStories.includes(story));
      await updateDoc(doc(getFirestore(), `users/${userId}`), {
        stories: remainingStories,
      });
    }
  };

  useEffect(() => {
    fetchStories(); // Fetch stories on component mount
  }, []);
  return (<>

    <div style={{ height: "61px", width: "61px" }} className="p-1 me-2">
      <input
        type="file"
        accept="image/*,video/*"
        id="fileInput"
        onChange={handleFileUpload1}
        style={{ display: 'none' }}
      />
      <div className='position-relative'>
        <label htmlFor="fileInput" style={{ height: "25px", zIndex: "5", width: "25px", borderRadius: "50%", border: "3px solid white", fontSize: "1.5rem", right: "-7px", bottom: "-5px" }} className="d-flex align-items-center justify-content-center btn p-0 btn-primary fw-medium position-absolute">
          <div style={{ marginBottom: "5px" }} className='d-flex align-items-center justify-content-center'>+</div>
        </label>
        <div onClick={() => {if(stories.length > 0){navigate(`/insta/story/${userdata?.userId}`)}}}>
          {stories.length > 0 ? (
            <div
              style={{
                zIndex: "2",
                width: '61px',
                height: '61px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #fff',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              {stories[0].isVideo ? (
                <video
                  src={stories[0].src}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  muted
                  preload="metadata"
                />
              ) : (
                <img
                  src={stories[0].src}
                  alt="Story"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          ) : (
            <img
              src={userdata?.proimg}
              alt="Profile"
              style={{
                width: '61px',
                height: '61px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #fff',
              }}
            />
          )}
        </div>
      </div>
    </div></>
  );
};

export default StoryImage;
