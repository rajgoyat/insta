import boy from './imgs/boy.jpg'; // Fallback image
import { Smiles, Dot, Like, Comment, Send, Savee, Red, Playing, Muted ,Saved} from './MoreSvg';
import { database } from './Firebase';
import { useFirebase } from './Firebase';
import { addDoc, collection, doc, getDoc, updateDoc, getDocs, deleteDoc,setDoc } from 'firebase/firestore';

import React, { useRef, useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import { TiPlus } from "react-icons/ti";
import { useNavigate  } from 'react-router-dom';
import CreateStory from './CreateStory'
import Loader from './Loader';



export default function MainPage() {
  const navigate = useNavigate(); 
  const [followingIds, setFollowingIds] = useState([]); // State to store following user IDs
  const [followingPosts, setFollowingPosts] = useState([]); // State to store posts of followed users
  const [loading, setLoading] = useState(true); // State for loading indicator
  const firebase = useFirebase();
  const fileURL = useRef(null);
  const [Color,setColor]=useState("red");
  const [posts, setPosts] = useState([]);
const [postss, setPostss] = useState([]);
const [selectedFile, setSelectedFile] = useState(); // Selected file

  const { user,addPosts,removePosts,setCreateStory,CreateStory,Story,setStory } = firebase;
  const [vol, setVol] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userr, setUser] = useState(null);
  
  const [fileType, setFileType] = useState(null); // 'image' ya 'video'
  const [followingStories,setFollowingStories]=useState();
  


  const [savedPosts, setSavedPosts] = useState({});

  const handleSave = async (postId, postOwnerId, postUrl, likes = [], comments = []) => {
    if (!user || !user.uid) return;

    try {
        const savedRef = doc(database, 'users', user.uid, 'savedPosts', postId);
        const savedDoc = await getDoc(savedRef);

        if (savedDoc.exists()) {
            // Agar post pehle se saved hai, to delete kar do
            await deleteDoc(savedRef);
            setSavedPosts(prevSavedPosts => ({ ...prevSavedPosts, [postId]: false }));
            console.log("Post unsaved:", postId);
        } else {
            // Naya post save karna aur post ki additional information add karna
            await setDoc(savedRef, {
                postId: postId,
                postOwnerId: postOwnerId,
                postUrl: postUrl,      // Post URL
                likes: likes,          // Likes array
                comments: comments     // Comments array
            });
            setSavedPosts(prevSavedPosts => ({ ...prevSavedPosts, [postId]: true }));
            console.log("Post saved:", postId);
        }
    } catch (error) {
        console.error("Error saving/unsaving post:", error);
    }
};
// 
  const fetchSavedPosts = async () => {
    if (!user || !user.uid) return;

    try {
      const savedPostsRef = collection(database, 'users', user.uid, 'savedPosts');
      const savedPostsSnapshot = await getDocs(savedPostsRef);

      const savedPostIds = savedPostsSnapshot.docs.map(doc => doc.data().postId);
      setSavedPosts(savedPostIds.reduce((acc, id) => ({ ...acc, [id]: true }), {}));
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, [user]);


useEffect(() => {
    fetchSavedPosts();
}, [user]);

// fetch story of following users
useEffect(() => {
  const fetchFollowingIds = async () => {
    if (!user || !user.uid) return; // Check if user is logged in

    try {
      const userRef = doc(database, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const following = userSnapshot.data().following || [];
        setFollowingIds(following); // Storing following IDs

        if (following.length > 0) {
          // Check stories in parallel
          await checkIfStoriesExist(following); 
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching following IDs:', error);
      setLoading(false);
    }
  };

  const checkIfStoriesExist = async (followingIds) => {
    try {
      const storyPromises = followingIds.map(async (userId) => {
        const storiesRef = collection(database, 'users', userId, 'Story');
        const storySnapshots = await getDocs(storiesRef);

        if (!storySnapshots.empty) {
          // If the user has stories, fetch user data and stories
          const userRef = doc(database, 'users', userId);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const userStories = storySnapshots.docs.map(storyDoc => ({
              id: storyDoc.id,
              ...storyDoc.data(),
            }));

            return {
              userId: userId,
              username: userData.username,
              proimg: userData.proimg || boy, // Default image if not available
              stories: userStories,
            };
          }
        }
        return null; // Return null if no stories
      });

      // Wait for all promises to resolve
      const storiesData = (await Promise.all(storyPromises)).filter(Boolean);

      setFollowingStories(storiesData); // Storing stories of followed users
      setLoading(false);
    } catch (error) {
      console.error('Error checking stories:', error);
      setLoading(false);
    }
  };

  if (user) {
    fetchFollowingIds();
  }
}, [user]);



  useEffect(() => {
    const data = firebase.userdata;
    // console.log("hhhh", data);
    setUser(data);
     
  }, [firebase.userdata]);

   

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(database, "users", user?.uid, "Story");
        const querySnapshot = await getDocs(postsRef);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user]);

  

  const handleLike = async (postId, postOwnerId, postIndex, userIndex) => {
    console.log("postIndex",postIndex)
    console.log("userIndex",userIndex)
    console.log("liked");
    if (!user || !user.uid) return; // Check if user is available
    
    try {
      // Correct the post reference to include the specific post ID
      const postRef = doc(database, 'users', postOwnerId, 'posts', postId); // Use postId
      
      const postSnapshot = await getDoc(postRef);
  
      if (postSnapshot.exists()) {
        const post = postSnapshot.data();
  
        // Update the likes state directly for instant re-render
        const newLikes = post.likes.includes(user.uid)
          ? post.likes.filter(like => like !== user.uid) // Unlike
          : [...post.likes, user.uid]; // Like
  
        const updatedPostsData = [...followingPosts]; // Copy of current state
        updatedPostsData[userIndex].posts[postIndex].likes = newLikes; // Update the likes locally
        const shuffledPosts = updatedPostsData.sort(() => Math.random() - 0.5);
  console.log(shuffledPosts)
        setFollowingPosts(shuffledPosts); // Update the state to trigger re-render
  
        // Firestore update
        await updateDoc(postRef, { likes: newLikes }); // Update likes array
      } else {
        console.error('Post not found in Firestore.');
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };
  

  useEffect(() => {
    const fetchFollowingIds = async () => {
      if (!user || !user.uid) return; // Check if user is available
  
      try {
        const userRef = doc(database, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);
  
        if (userSnapshot.exists()) {
          const following = userSnapshot.data().following || [];
          setFollowingIds(following);
  
          if (following.length > 0) {
            // Fetch posts of followed users in parallel
            await fetchPostsOfFollowedUsers(following);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching following IDs:', error);
        setLoading(false);
      }
    };
  
    const fetchPostsOfFollowedUsers = async (followingIds) => {
      try {
        // Use Promise.all to fetch all data in parallel
        const postPromises = followingIds.map(async (userId) => {
          const userRef = doc(database, 'users', userId);
          const userSnapshot = await getDoc(userRef);
  
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const postSnapshots = await getDocs(collection(database, 'users', userId, 'posts'));
  
            const userPosts = postSnapshots.docs.map(postDoc => ({
              id: postDoc.id,
              ...postDoc.data(), // Post data
            }));
  
            return {
              userId: userId,
              username: userData.username,
              proimg: userData.proimg || boy, // Fallback image
              posts: userPosts,
            };
          }
          return null; // Return null if user doesn't exist
        });
  
        // Wait for all promises to resolve
        const postsData = (await Promise.all(postPromises)).filter(Boolean); // Filter out null values
        const shuffledPosts = postsData.sort(() => Math.random() - 0.5);
  console.log(shuffledPosts)
        setFollowingPosts(shuffledPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
  
    if (user) {
      fetchFollowingIds();
    }
  }, [user]);
  
  

  if (loading || !user) {  // Add a check for user being null
    return <div className='w-100  DALJU' style={{height:"100vh"}}><Loader/></div>;
  }
  const TruncateText = ({ text }) => {
    if (text.length <= 10) {
      return <span>{text}</span>;
    } else {
      return <span>{text.substring(0, 10)}...</span>;
    }
  };

  // File input open karne ke liye
  const handlePickImg = () => {
    document.getElementById("fileInputt").click();
};

 // File change hone par
 const handleFileChange = (event) => {
  const file = event.target.files[0];
  console.log("file2",file)

  if (file) {
      setSelectedFile(file);
     

      setFileType(file.type.startsWith("image/") ? "image" : "video");
      // Save the file URL in the ref, to avoid reloading on re-renders
      fileURL.current = URL.createObjectURL(file);
     const storyData = {
  file:file,
 
  fileURL: fileURL,
  fileType:file.type.startsWith("image/") ? "image" : "video",
};

// Navigate to CreateStory page with props (data)
navigate('/CreateStory', { state: storyData });
  }
};


const navStory=()=>{
navigate(`/StoryPage/${userr.userId}`)
setStory(true);
setColor("green");
}
  return (
    <div className="w-100 h-100 d-flex align-items-center flex-column bg- mt-5 mt-md-0 bg- ">
      <div className="DALJU flex-column bg Main_main" >

        <div style={{  margin: '20px 0', padding: '8px 0px', height: '100px' }} className="bg- Cath_main w-100">
          <ul
            className=" Cath_main  align-items-center m-0 px-2 gap-3 bg  d-flex w-100"
            style={{  overflowX: "scroll", scrollbarWidth: "none", height: "84px", listStyleType: "none" }}
          >
            <li className="text-center cr bg- h-100"  >
              <div className=" d-flex align-items-center justify-content-center Cath_circ position-relative" style={{ width: "65px", height: "65px" }}>
                {
             posts.length>0? <div className='BORDER DALJU' style={{ width: "62px", height: "62px", borderRadius: "50%",border:`2px solid  ${Color}`}}>  <img onClick={navStory} src={userr?.proimg} alt="Profile_img" style={{ width: "60px", height: "60px", borderRadius: "50%", textDecoration: "none", border: "2px solid white" }} /></div>
                  :  <img onClick={handlePickImg} src={userr?.proimg} alt="Profile_img" style={{ width: "60px", height: "60px", borderRadius: "50%", textDecoration: "none", border: "2px solid white" }} />
                }
                <input
                                type="file"
                                id="fileInputt"
                                style={{ display: "none" }}
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                            />
                <div style={{position:"absolute",bottom:"0px",right:"0px",width:"25px",height:"25px",borderRadius:"50%",background:"white"}} className='DALJU '><div className='bg-primary DALJU text-white' style={{width:"22px",height:"22px",borderRadius:"50%"}}  onClick={handlePickImg}><TiPlus/></div></div>
              </div>
              <div className=" bg-L" style={{ fontSize: "12px", fontWeight: "400" }}>
                <TruncateText text="Your story" />
              </div>

            </li>

           
           


       {followingStories && followingStories.length > 0 &&
    followingStories.map((followedUser) => (
      <li className="text-center cr bg- h-100" key={followedUser.userId}>
        <div className="d-flex align-items-center justify-content-center Cath_circ position-relative" style={{ width: "65px", height: "65px" }}>
          <div className='BORDER DALJU' style={{ width: "62px", height: "62px", borderRadius: "50%", border: `2px solid  ${Color}` }}>
            <img
              onClick={() => navigate(`/StoryPage/${followedUser.userId}`)}
              src={followedUser.proimg}
              alt="imgs"
              style={{ width: "60px", height: "60px", borderRadius: "50%", textDecoration: "none", border: "2px solid white" }}
            />
          </div>
        </div>
        <div className="bg-L" style={{ fontSize: "12px", fontWeight: "400" }}>
          <TruncateText text={followedUser.username} />
        </div>
      </li>
    ))
  }


            
     
            
          
          </ul>
        </div>

        {followingPosts.map(({ userId, username, proimg, posts }, userIndex) => (
          <div className="Post_Secssion" style={{ maxWidth: '468px' }} key={userId}>
            {posts.map((post, postIndex) => {
                            const isSaved = savedPosts[post.id] || false; // Check saved state from savedPosts object

               return(
              <div key={postIndex}>
                <div className="w-100 bg- d-flex align-items-center justify-content-between" style={{ padding: '0px 0px 0px 4px', height: '48px' }}>
                  <div className="DALJU h-100 gap-1 cr">
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%' }} className="DALJU" onClick={() => navigate(`/SearchProfile/${userId}`)}>
                      <img src={proimg} className="proimg" alt="img" style={{ height: '32px', width: '32px', borderRadius: '50%' }} />
                    </div>
                    <span className="d-flex flex-column">
                      <span className="DALJU h-100 gap-1">
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{username}</span>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>.</span>
                        <span style={{ fontSize: '14px', fontWeight: '400', color: '#737373' }}>New</span>
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: '400' }}>Original audio</span>
                    </span>
                  </div>
                  <span className="cr">
                    <Dot />
                  </span>
                </div>

                {post.type === 'image' ? (
                  <div className="DALJU bg-dark Main_video">
                    <img src={post.url} className="h-100 w-100" style={{ objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div className="Main_video DALJU bg-dark position-relative">
                    <VideoComponent src={post.url} vol={vol} setVol={setVol} />
                    <div
                      className="soundBtnReels position-absolute fs-3 rounded-circle d-flex align-items-center justify-content-center"
                      onClick={() => setVol(!vol)}
                      style={{
                        position: "absolute", bottom: "15px", right: "15px",
                        zIndex: "2",
                        height: "35px",
                        width: "35px",
                      }}
                    >
                      {vol ? (
                        <button className='DALJU'
                          style={{
                            zIndex: "1000"
                            , color: "white", border: "none", outline: "none", width: "28px", aspectRatio: "1",
                            background: "rgba(38,38,38)", borderRadius: "50%"
                          }}><Playing /></button>
                      ) : (
                        <button className='DALJU'
                          style={{
                            zIndex: "1000"
                            , color: "white", border: "none", outline: "none", width: "28px", aspectRatio: "1",
                            background: "rgba(38,38,38)", borderRadius: "50%"
                          }}><Muted /></button>
                      )}
                    </div>
                  </div>
                )}

                <div className="w-100 bg- d-flex align-items-center justify-content-between py-1" style={{ padding: '0px 12px 6px' }}>
                  <div className="DALJU gap-4">
                  <div onClick={() => handleLike(post.id, userId, postIndex, userIndex)}>
                                              {post.likes && post.likes.includes(user.uid) ?<div style={{color:"red"}} className='cr'> <Red /> </div>: <div className='cr'><Like /></div>}
                                          </div>
                    <span className=" cr"><Comment /></span>
                    <span className=" cr"><Send /></span>
                  </div>
                  <span onClick={() => handleSave(post.id, userId,post.url,post.likes, post.comments)}>
            {savedPosts[post.id] ?<div className='cr'> <Saved /></div> :<div className='cr'> <Savee /></div>}
          </span>
                </div>

                <div style={{ margin: '0 4px', fontSize: '14px', fontWeight: '600' }} className='px-2'>{post.likes ? post.likes.length : 0} likes</div>
                                  <div className="d-flex gap-2 px-3" style={{ marginTop: '8px' }}>
                                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>{username}</span>
                                      <span style={{ fontSize: '14px', fontWeight: '400', color: '#000000' }}>{post.description}</span>
                                  </div>
                                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#737373', marginTop: '8px' }} className='px-3'>View all 287 comments</span>
                                  <div className="Teaxt_area d-flex px-3 " style={{ marginTop: '8px' }}>
                                      <textarea placeholder="Add a comment..." style={{ width: '451px', maxHeight: '80px', border: 'none', outline: 'none', resize: 'none' }}></textarea>
                                      <Smiles />
                                  </div>
                                  <hr className='m-0 p-0'></hr>
              </div>
            )
})}
          </div>
        ))}
      </div>
    </div>
  );
}



const VideoComponent = ({ src, vol, setVol }) => {
  const videoRef = useRef(null);
  const [videoContainerRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.5,
  });
  const [showWatchAgain, setShowWatchAgain] = useState(false); // Watch Again button state

  // Video ko play/pause karna jab wo viewport mein ho
  useEffect(() => {
    const video = videoRef.current;
    if (isIntersecting && !showWatchAgain) {
      video.play().catch((error) => {
        console.error("Play failed", error);
      });
    } else {
      video.pause();
    }
  }, [isIntersecting, showWatchAgain]);

  // Jab video khatam ho jaye to "Watch Again" button show karna
  const handleVideoEnd = () => {
    setShowWatchAgain(true); // Video end hone ke baad button dikhana
  };

  // Watch Again button click par video ko reset karke dubara se play karna
  const handleWatchAgain = async () => {
    const video = videoRef.current;

    // Video ko manually pause karte hain
    video.pause();
    // Video ko reset karte hain start position par
    video.currentTime = 0;

    // Thoda delay de kar video ko dobara play karte hain
    setTimeout(() => {
      video.play().then(() => {
        setShowWatchAgain(false); // Watch Again button hide karna
      }).catch((error) => {
        console.error("Play failed", error);
      });
    }, 200); // 200ms ka delay to ensure video is properly paused
  };

  return (
    <div ref={videoContainerRef} className="h-100 w-100 position-relative" style={{ objectFit: 'cover' }}>
      <video
        className="h-100 w-100"
        style={{ objectFit: 'cover' }}
        ref={videoRef}
        src={src}
        controls={false}
        onEnded={handleVideoEnd} // Jab video khatam ho jaye
        {...(vol ? {} : { muted: true })}
      />

      {/* Jab video khatam ho jaye to "Watch Again" button dikhana */}
      {showWatchAgain && (
        <button
          onClick={handleWatchAgain}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Watch Again
        </button>
      )}
    </div>
  );
};
const Comment=()=>(
    <svg aria-label="Comment" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
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
const Savee=()=>(
    <svg aria-label="Save" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
)
const Smiles=()=>(
    <svg aria-label="Emoji" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
)

const Muted=()=>(
    <svg aria-label="Audio is muted" class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="12" role="img" viewBox="0 0 48 48" width="12"><title>Audio is muted</title><path clip-rule="evenodd" d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z" fill-rule="evenodd"></path></svg>
)
const Playing=()=>(
    <svg aria-label="Audio is playing" class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Audio is playing</title><path d="M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z"></path></svg>
)
const Saved=()=>(
    <svg aria-label="Remove" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
)