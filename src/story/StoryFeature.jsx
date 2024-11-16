import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, deleteDoc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore"; 
import { database, useFirebase } from "../Firebase";
import pro from '../Imgs/profile.jpg';
import { FaArrowTrendUp } from "react-icons/fa6";
import { BiHeartCircle } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
export default function StoryPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const { userId } = useParams();
  const {userdata,getUserData}= firebase;
  const id= userId
  const [posts, setPosts] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({ username: '', proimg: '' });
  const [red, setRed] = useState(false);
  const [delet, setdelet] = useState(false);
  const [userid, setUserid] = useState(null);
  const progressRef = useRef(null);
  const timerRef = useRef(null);
  const handleRed = () => setRed(!red);
  const handleDelet = () => setdelet(!delet);
  
  const handleDelett = async (storyId) => {
    try {
      const userDocRef = doc(getFirestore(), `users/${userId}`);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const stories = userData.stories || [];
  
        // Filter out the story with the matching ID
        const updatedStories = stories.filter((story) => story.id !== storyId);
  
        // Update the Firestore document
        await updateDoc(userDocRef, {
          stories: updatedStories,
        });
 navigate(-1) 
        console.log(`Story with ID ${storyId} deleted successfully.`);
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserData(userId);
  
        if (data && data.userId) { // Check if data and userId exist
          setUserid(data.userId);
        }
        // const userDocRef = doc(database, "users", id); // Reference to the user document
        // const userDocSnap = await getDoc(userDocRef); // Fetch user data

        // if (userDocSnap.exists()) {
          // const userData = userDocSnap.data();
          setUserInfo({
            username: data.username || "Unknown User", // Default value if not found
            proimg: data.proimg || pro // Default profile image if not found
          });
setPosts(data.stories)
          // } else {
          // console.error("No such user document!");
        // }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [id]);

  const startStoryTimer = (duration) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (progressRef.current) { // Null check
      progressRef.current.style.transition = `width ${duration}s linear`;
      progressRef.current.style.width = '100%';
    }

    timerRef.current = setTimeout(() => {
      handleNextStory();
    }, duration * 1000);
  };

  const handleNextStory = () => {
    if (currentStoryIndex < posts.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      navigate(-1);
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleVideoProgress = (e) => {
    startStoryTimer(e.target.duration);
  };

  useEffect(() => {
    if (posts.length > 0) {
      const currentPost = posts[currentStoryIndex];
      
      // Ensure progress bar is reset
      if (progressRef.current) {
        progressRef.current.style.width = '0%';
      }

      if (currentPost?.isVideo === "image") {
        startStoryTimer(15); 
      }
    }
  }, [currentStoryIndex, posts]);
 console.log(posts)
  return(
    <>
    <div className="hhh w-100 DALJU  position-relative" style={{ background: "rgba(0,0,0,0.65)"}}>
        <div style={{ zIndex: "2001", position: "absolute", top: "15px", left: "15px", color: "white" }} className="cr d-md-block d-none">
         <div><InstaLogo/></div>
        </div>
        <div style={{ zIndex: "2001", position: "absolute", top: "15px", right: "15px", color: "white" }} className="cr d-md-block d-none" onClick={() => navigate(-1)}>
          <Cross />
        </div>

        <div className="Story_main  position-relative d-flex justify-content-center flex-column">
          <div style={{ height: "102px", padding: "20px 16px 32px", zIndex: "2005", position: "absolute", top: "0px" }} className="bg- w-100 ">
          <div className="White w-100 d-flex gap-1" style={{ display: "flex" }} ref={progressRef}> 
            {posts?.map((_, idx) => (
              <div key={idx} style={{ flex: 1, height: "2px", background: idx === currentStoryIndex ? "white" : "gray" }} ></div>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div style={{ marginTop: "8px", height: "40px" }} className="d-flex align-items-center gap-2">
              <img src={userInfo.proimg || pro} style={{ width: "32px", height: "32px", borderRadius: "50%" }} alt="Profile" />
              <div style={{ fontWeight: "400", fontSize: "14px" }} className="text-white">{userInfo.username}</div>
              <div style={{ fontWeight: "400", fontSize: "14px", opacity: "0.6" }} className="text-white">Now</div>
            </div>
            <div className="d-md-none d-block d-flex gap-2 align-items-center text-white cr">
              <Dot/>
             <div onClick={() => navigate(-1)}> <Cross/></div>
            </div>
          </div> 
          </div> 
          <div className="w-100 h-100 position-relative DALJU flex-column">
          {posts[currentStoryIndex]?.isVideo === "image" && posts[currentStoryIndex]?.src ? (
             <div className="w-100 h-75 DALJU ">
    <img src={posts[currentStoryIndex].src} alt="Post" className="w-100 h-100" />
    </div>
) : posts[currentStoryIndex]?.isVideo === "video" && posts[currentStoryIndex]?.src ? ( 
  <div className="w-100 h-100 position-relative">
    <video
        src={posts[currentStoryIndex].src}
        className="w-100 h-100"
        style={{ objectFit: "cover" ,
          borderRadius:"9px"
        }}
        autoPlay
        onLoadedMetadata={handleVideoProgress}
        onEnded={handleNextStory}
    />
    </div>
) : null} 

  {
                userid===id?
                <div className="w-100 position-absolute py-4 px-2 d-flex justify-content-around align-items-center" style={{ padding: "16px", bottom: "0px", right: "0px" }}>
               <div className='d-flex gap-3 bg- position-absolute' style={{width:"230px",right:"0px",bottom:"30px"}}>
              <div className='d-flex flex-column text-center '>
                <div className='fs-5 cr text-white'><FaArrowTrendUp/></div>
                <span  style={{ fontWeight: "400", fontSize: "14px" }}  className='text-white'>Boost</span>
                </div> 
              <div className='d-flex flex-column text-center '>
                <div className='fs-5 cr text-white'><BiHeartCircle/></div>
                <span  style={{ fontWeight: "400", fontSize: "14px" }}  className='text-white'>Highlight</span>
                </div> 
              <div className='d-flex flex-column text-center '>
                <div className='fs-5 cr text-white'><Send/></div>
                <span  style={{ fontWeight: "400", fontSize: "14px" }}  className='text-white'>Send</span>
                </div> 
              <div className='d-flex flex-column text-center position-relative'  >
                <div className='fs-5 cr text-white' onClick={handleDelet}><BsThreeDotsVertical/></div>
                <span  style={{ fontWeight: "400", fontSize: "14px" }}  className='text-white'>More</span>
                <div onClick={() => handleDelett(posts[currentStoryIndex].id)} 
     style={{ zIndex:"1000",position: "absolute", display: delet ? "block" : "none", bottom: "53px", fontWeight: "500", right: "10px", fontSize: "15px", background: "white", borderRadius: "7px" }} 
     className='text-danger px-3 cr py-2'>
    Delete
</div>

                
              
                </div> 
              
              
                
               </div>
               </div>:
               <div className="w-100 position-absolute py-4 px-2 d-flex justify-content-around align-items-center" style={{ padding: "16px", bottom: "0px", right: "0px" }}>
               <textarea style={{ width: "190px", height: "44px", borderRadius: "50px", border: "1px solid white", outline: "none", padding: "8px 17px 8px 19px", resize: 'none', color: "#dbdbdb", background: "transparent" }} className="bg-" placeholder="Message....."></textarea>
               <div className="text-white" onClick={handleRed}>{red?<div style={{color:"red"}} className='cr'> <Red /> </div>: <div className='cr'> <Like /></div>}</div>
   
               <div className="text-white"><Send /></div>
             </div>
              }
          <div className="w-100 d-flex justify-content-between position-absolute" style={{ top: "50%", transform: "translateY(-50%)" }}>
            <button onClick={handlePrevStory} style={{height:"400px",border:"none",outline:"none",width:"130px",background:"transparent"}}></button>
           <button onClick={handleNextStory}  style={{height:"400px",border:"none",outline:"none",width:"130px",background:"transparent"}}></button>
          </div>
            </div>

          </div>
          </div>
    </>
  )
}
const InstaLogo=()=>(
    <svg aria-label="Instagram" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="29" role="img" viewBox="32 4 113 32" width="103"><title>Instagram</title><path clip-rule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fill-rule="evenodd"></path></svg>
   )

   const Cross=()=>(
    <svg aria-label="Close" class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
)
const Dot=()=>(
    <svg aria-label="More options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
)
const Like=()=>(
    <svg aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
)
const Send=()=>(
    <svg aria-label="Share" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
)
const Red=()=>(
    <svg aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
    )



export {Cross}
// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { collection, doc, deleteDoc, getDocs } from "firebase/firestore"; 
// import { getFirestore } from "firebase/firestore";
// import { useFirebase } from "../Firebase";
// import logo from '../Imgs/logo.png';
// // import { Cross } from './MoreSvg'; // Assuming you have a Cross component for the close button

// const StoryFeature = () => {
//   const firebase = useFirebase();
//   const navigate = useNavigate();
//   const { userId } = useParams(); // Assuming userId comes from the URL
//   const [stories, setStories] = useState([]);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const progressRef = useRef(null);
//   const timerRef = useRef(null);

//   const handleNextStory = () => {
//     if (currentStoryIndex < stories.length - 1) {
//       setCurrentStoryIndex(currentStoryIndex + 1);
//     } else {
//       navigate('/insta'); // Navigate back when no more stories
//     }
//   };

//   const handleDeleteStory = async (storyId) => {
//     try {
//       const storyDocRef = doc(getFirestore(), "users", userId, "stories", storyId);
//       console.log(storyDocRef)
//       await deleteDoc(storyDocRef); 
//       setStories(stories.filter(story => story.id !== storyId)); 
//       alert("Story deleted successfully");
//       navigate('/insta'); // Navigate back after deletion
//     } catch (error) {
//       console.error("Error deleting story:", error);
//     }
//   };

//   const fetchStories = async () => {
// const data1= await firebase.getUserData(userId)

    
//     setStories(data1.stories);
//   };

//   useEffect(() => {
//     fetchStories();
//   }, [userId]);

//   const startStoryTimer = (duration) => {
//     if (timerRef.current) clearTimeout(timerRef.current);
    
//     if (progressRef.current) {
//       progressRef.current.style.transition = `width ${duration}s linear`;
//       progressRef.current.style.width = '100%';
//     }

//     timerRef.current = setTimeout(() => {
//       handleNextStory();
//     }, duration * 1000);
//   };

//   useEffect(() => {
//     if (stories.length > 0) {
//       const currentStory = stories[currentStoryIndex];

//       // Reset progress bar
//       if (progressRef.current) {
//         progressRef.current.style.width = '0%';
//       }

//       if (currentStory) {
//         if (currentStory.isVideo) {
//           startStoryTimer(currentStory.duration || 15); // Default duration for videos
//         } else {
//           startStoryTimer(15); // Default duration for images
//         }
//       }
//     }
//   }, [currentStoryIndex, stories]);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <img src={logo} alt="Logo" style={{ width: '250px', position: 'absolute', top: '15px', left: '15px' }} />
//       <div style={{ position: 'absolute', top: '15px', right: '15px', fontWeight:"600", fontSize:"25px" }} onClick={() => navigate(-1)}>
//         {/* <Cross /> */} X
//       </div>
      
//       {stories.length > 0 && currentStoryIndex < stories.length && (
//         <div style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '40%',
//           height: '90%',
//           backgroundColor: '#000',
//           borderRadius: '10px',
//           overflow: 'hidden',
//           padding: '10px'
//         }}>
//           {stories[currentStoryIndex]?.isVideo ? (
//             <video
//               src={stories[currentStoryIndex].src}
//               muted
//               autoPlay
//               style={{ width: '100%', height: '100%', objectFit: 'contain' }}
//               onEnded={handleNextStory}
//             />
//           ) : (
//             <img
//               src={stories[currentStoryIndex].src}
//               alt="Current Story"
//               style={{ width: '100%', height: '100%', objectFit: 'contain' }}
//             />
//           )}
          
//           <div ref={progressRef} style={{ height: '2px', background: 'gray' }}></div>
//           <button onClick={() => handleDeleteStory(stories[currentStoryIndex].id)} style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white' }}>
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoryFeature;


// // import React, { useState, useEffect } from 'react';
// // import { getFirestore, collection, getDocs, loadBundle } from 'firebase/firestore';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useFirebase } from '../Firebase';
// // import { useParams } from 'react-router-dom';

// // const StoryFeature = () => {
// //   const [stories, setStories] = useState([]);
// //   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// //   const firebase = useFirebase();
// //   const { userdata, getUserData } = firebase;
// // const {userId} =useParams();
// //   // Function to fetch stories from Firestore
// //   useEffect(()=>{
// // const load = async()=>{
// //   const data= await getUserData(userId)
// // const story = data?.stories
// // setStories(story)
// // }
// //     load();
// //   },[userId,userdata])

// //   return (
// //     <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
// //       {currentStoryIndex !== null && currentStoryIndex < stories?.length && (
// //         <div
// //           style={{
// //             position: 'fixed',
// //             top: '50%',
// //             left: '50%',
// //             transform: 'translate(-50%, -50%)',
// //             width: '80%',
// //             height: '80%',
// //             backgroundColor: '#000',
// //             display: 'flex',
// //             flexDirection: 'column',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             borderRadius: '10px',
// //             overflow: 'hidden',
// //             padding: '10px'
// //           }}
// //         >
// //           {stories[currentStoryIndex]?.isVideo ? (
// //             <video
// //               id={`video-${currentStoryIndex}`}
// //               src={stories[currentStoryIndex].src}
// //               muted
// //               style={{ width: '100%', height: '100%', objectFit: 'contain' }}
// //               onEnded={() => {
// //                 setCurrentStoryIndex((currentStoryIndex + 1) % stories.length);
// //               }}
// //             />
// //           ) : (
// //             <img
// //               src={stories[currentStoryIndex].src}
// //               alt="Current Story"
// //               style={{ width: '100%', height: '100%', objectFit: 'contain' }}
// //             />
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default StoryFeature;
