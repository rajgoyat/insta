import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { useFirebase } from "../Firebase";
import logo from '../Imgs/logo.png';
// import { Cross } from './MoreSvg'; // Assuming you have a Cross component for the close button

const StoryFeature = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const { userId } = useParams(); // Assuming userId comes from the URL
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressRef = useRef(null);
  const timerRef = useRef(null);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      navigate(-1); // Navigate back when no more stories
    }
  };

  const handleDeleteStory = async (storyId) => {
    try {
      const storyDocRef = doc(getFirestore(), "users", userId, "Story", storyId);
      await deleteDoc(storyDocRef); 
      setStories(stories.filter(story => story.id !== storyId)); 
      alert("Story deleted successfully");
      navigate(-1); // Navigate back after deletion
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const fetchStories = async () => {
const data1= await firebase.getUserData(userId)
console.log(data1.stories)

    
    setStories(data1.stories);
  };

  useEffect(() => {
    fetchStories();
  }, [userId]);

  const startStoryTimer = (duration) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    if (progressRef.current) {
      progressRef.current.style.transition = `width ${duration}s linear`;
      progressRef.current.style.width = '100%';
    }

    timerRef.current = setTimeout(() => {
      handleNextStory();
    }, duration * 1000);
  };

  useEffect(() => {
    if (stories.length > 0) {
      const currentStory = stories[currentStoryIndex];

      // Reset progress bar
      if (progressRef.current) {
        progressRef.current.style.width = '0%';
      }

      if (currentStory) {
        if (currentStory.isVideo) {
          startStoryTimer(currentStory.duration || 15); // Default duration for videos
        } else {
          startStoryTimer(15); // Default duration for images
        }
      }
    }
  }, [currentStoryIndex, stories]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img src={logo} alt="Logo" style={{ width: '250px', position: 'absolute', top: '15px', left: '15px' }} />
      <div style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={() => navigate(-1)}>
        {/* <Cross /> */} X
      </div>
      
      {stories.length > 0 && currentStoryIndex < stories.length && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          height: '90%',
          backgroundColor: '#000',
          borderRadius: '10px',
          overflow: 'hidden',
          padding: '10px'
        }}>
          {stories[currentStoryIndex]?.isVideo ? (
            <video
              src={stories[currentStoryIndex].src}
              muted
              autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onEnded={handleNextStory}
            />
          ) : (
            <img
              src={stories[currentStoryIndex].src}
              alt="Current Story"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
          
          <div ref={progressRef} style={{ height: '2px', background: 'gray' }}></div>
          <button onClick={() => handleDeleteStory(stories[currentStoryIndex].id)} style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryFeature;


// import React, { useState, useEffect } from 'react';
// import { getFirestore, collection, getDocs, loadBundle } from 'firebase/firestore';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useFirebase } from '../Firebase';
// import { useParams } from 'react-router-dom';

// const StoryFeature = () => {
//   const [stories, setStories] = useState([]);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const firebase = useFirebase();
//   const { userdata, getUserData } = firebase;
// const {userId} =useParams();
//   // Function to fetch stories from Firestore
//   useEffect(()=>{
// const load = async()=>{
//   const data= await getUserData(userId)
// const story = data?.stories
// setStories(story)
// }
//     load();
//   },[userId,userdata])

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
//       {currentStoryIndex !== null && currentStoryIndex < stories?.length && (
//         <div
//           style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '80%',
//             height: '80%',
//             backgroundColor: '#000',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             borderRadius: '10px',
//             overflow: 'hidden',
//             padding: '10px'
//           }}
//         >
//           {stories[currentStoryIndex]?.isVideo ? (
//             <video
//               id={`video-${currentStoryIndex}`}
//               src={stories[currentStoryIndex].src}
//               muted
//               style={{ width: '100%', height: '100%', objectFit: 'contain' }}
//               onEnded={() => {
//                 setCurrentStoryIndex((currentStoryIndex + 1) % stories.length);
//               }}
//             />
//           ) : (
//             <img
//               src={stories[currentStoryIndex].src}
//               alt="Current Story"
//               style={{ width: '100%', height: '100%', objectFit: 'contain' }}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoryFeature;
