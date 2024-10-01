import React, { useEffect, useState } from "react";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "../Firebase"; // import your Firebase config
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";
import Carousel from 'react-bootstrap/Carousel';
import allimg from '../Imgs/allimg.png'
import "../insta.css";
import ProfileImg from '../Imgs/profile.jpg'

import { BackArrow, Copy, Crop, Zoom, ManLogo,Location,DownChevron,Smile,AddColloborator } from "../AllIconsSvgs/IconsSvg";
function CreatePost() {
  // const [userId,setUserId]=useState(null)
  const [show, setshow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mediaType,setMediaType]= useState("")
  const { sethandlecreatePostCloseButton, handlecreatePostCloseButton,user } =
    useContext(DataContext);
    const [activeIndex, setActiveIndex] = useState(0); // Track the current active slide index
    const [postText, setPostText] = useState("");
    const [videoFile, setVideoFile] = useState(null); // Stores the uploaded file
  const [data, setData] = useState(null); // Stores user data from Firestore
console.log(user)
const [userId,setUserId]=useState()
useEffect(()=>{
  const getId=async()=>{  
    if (user && user.userId) {
const userId= await user.userId;
  console.log(userId)
  setUserId(user.userId)}}
getId()
},[user])
useEffect(()=>{
console.log(postText)
},[postText])

// console.log(userId)

  const uploadVideoToFirebase = async () => {
    if (!videoFile || !userId) {
      console.error("Missing video file or user ID.");
      return;
    }

    try {
      setActiveIndex(2)
      // Step 1: Upload the video file to Firebase Storage
      if(userId){const storageRef = ref(storage, `videos/${userId}_${videoFile.name}`);
      await uploadBytes(storageRef, videoFile);
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL (src)
      const fileType = videoFile.type; // Get the file type (e.g., video/mp4)

      // Step 2: Update Firestore with the video details
      const userRef = doc(database, "users", userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        console.error("User does not exist!");
        return;
      }

      const existingVideos = userDoc.data().videos || []; // Retrieve existing videos or set to empty array

      const newVideo = {
        src: downloadURL,
        type: mediaType,
        desc: postText,
      };

      // Step 3: Add the new video to the user's video array
      await updateDoc(userRef, {
        video: [...existingVideos, newVideo],
      });

      console.log("Video uploaded and added to Firestore successfully!");
      // window.location.reload(); // Reload the page or update UI to show the new video
    } }catch (error) {
      console.error("Error uploading video or updating Firestore:", error);
    }
  };

  // Load user data when the component mounts
  useEffect(() => {
    if(userId){const getUserData = async () => {
      const userRef = doc(database, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setData(userDoc.data());
      } else {
        console.log("No such document!");
      }
    };
    getUserData();}
  }, [userId]);
  useEffect(() => {
    setshow(handlecreatePostCloseButton);
  }, [handlecreatePostCloseButton]);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    setVideoFile(file);// Get the first selected file
    if (file) {

      const reader = new FileReader();
      if (file.type.startsWith("image/")) {
        setMediaType("image");
      } else if (file.type.startsWith("video/")) {
        setMediaType("video");
      } else {
        alert("Please upload an image or a video.");
        return; // Exit if the file is not an image or video
      }
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update state with the media URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const pauseAllVideos = () => {
    const videos = document.querySelectorAll("video"); // Select all video tags
    videos.forEach((video) => {
      video.pause(); // Pause each video
    });
  };
  const inputClicked = () => {
    document.getElementById("file-upload").click(); // Programmatically click the hidden input
    // sethandlecreatePostCloseButton(false)
  };
  return (
    <div style={styles.overlay} className={`${show ? "" : "d-none"}`}>
      <button
        style={styles.closeButton}
        onClick={() => {
          sethandlecreatePostCloseButton(false);
          setSelectedImage(null);
          setActiveIndex(0)
        }}
      >
        &times;
      </button>
      <Carousel slide={false} interval={null} activeIndex={activeIndex}   className="bg-white">
    
      
    <Carousel.Item>
    
      <div className="" style={styles.dialog}>
        <div className=" " style={styles.header}>
          {selectedImage ? (
            <div className="
            w-100 d-flex align-items-center justify-content-between p-2 pb-0 pt-0">
              <div onClick={()=>setSelectedImage(null)}>
                <BackArrow />
              </div>
              <div>
                <h5 className="mt-1" style={{ fontWeight: "450" }}>Crop</h5>
              </div>
              <div  className="text-primary fs-6" onClick={()=>{setActiveIndex(1); pauseAllVideos()}} style={{ cursor: "pointer" }}>
                Next
              </div>
            </div>
          ) : (
            <h3>Create new post</h3>
          )}
        </div>
        {!selectedImage && (
          <div style={{...styles.body,height:"300px"}}>
            <div className="mt-3" style={styles.iconContainer}>
              {/* width */}
              <svg
                aria-label="Icon to represent media such as images or videos"
                fill="currentColor"
                height="77"
                role="img"
                viewBox="0 0 97.6 77.3"
                width="96"
                style={styles.icon}
              >
                <title>Icon to represent media such as images or videos</title>
                <path
                  d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                  fill="currentColor"
                />
                <path
                  d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                  fill="currentColor"
                />
                <path
                  d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div style={styles.textContainer}>
              <p>Drag photos and videos here</p>
            </div>
            <div className="pb-4" style={styles.buttonContainer}>
              <button
                type="button"
                style={styles.button}
                onClick={inputClicked}
              >
                Select from computer
              </button>

              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange} // Un-comment this line to handle file changes
                style={{ display: "none" }} // Hide the input selectedMedia
                accept="image/*,video/*"
              />
            </div>
          </div>
        )}
        {selectedImage && mediaType === "image" && (
          <div className="laptop-frame">
            <div
              className="laptop-screen"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                // width: "400px",
                objectFit:"cover",
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
            ></div>
           
          </div>
        )}

        {selectedImage && mediaType === "video" && (
          <video
            loop
            autoPlay
            style={{
              // borderRadius: "5px",
              maxHeight: "400px",
              objectFit: "cover",
              width: "100%",
            }}
          >
            <source src={selectedImage} type="video/mp4" />
          </video>
        )}
        {selectedImage && (
          <div
            className="icon-container p-2  d-flex align-items-center justify-content-between"
            style={{ zIndex: "3" }}
          >
            <div className="d-flex gap-2">
              <span
                className="postIcon align-items-center justify-content-center"
                style={styles.iconStyle}
              >
                <Crop />
              </span>
              <span
                className="postIcon align-items-center justify-content-center"
                style={styles.iconStyle}
              >
                <Zoom />
              </span>
            </div>
            <div>
              <span
                className="postIcon align-items-center justify-content-center"
                style={styles.iconStyle}
              >
                <Copy />
              </span>
            </div>
          </div>
        )}
      </div>
     </Carousel.Item>
  
   
    <Carousel.Item>
 
    <div className="scroll-container" style={styles.dialog}>
        <div  className="position-relative" style={{...styles.header,height:"40px",}}>
        
            <div className="
             d-flex align-items-center justify-content-between p-2 pb-0 pt-0 position-fixed" style={{width:"500px"}}>
              <div >
                <BackArrow />
              </div>
              <div>
                <h5 className="mt-1" style={{ fontWeight: "450" }}>New Reel</h5>
              </div>
              <div  className="text-primary fs-6" onClick={uploadVideoToFirebase} style={{ cursor: "pointer" }}>
                Share
              </div>
            </div>
        
        </div>
       <div className="d-flex flex-sm-row flex-column row">
       
        {selectedImage && mediaType === "image" && (
          <div className="laptop-frame col-7 p-0">
            <img
            src={selectedImage}
              className="laptop-screen img fluid"
              style={{
                
                // backgroundImage: `url(${selectedImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                width: "70%",
                objectFit:"cover",
                border: "2px solid #ccc",
                borderRadius: "5px",
              }}
            ></img>
           
          </div>
        )}

        {selectedImage && mediaType === "video" && (
         <div className="col-7 p-0"> <video
            loop
            autoPlay={activeIndex !== 2}
            style={{
              height:"300px",
              // borderRadius: "5px",
              maxHeight: "300px",
              // width:"500px",
              maxWidth:"400px",
              objectFit: "cover",
              
            }}
          >
            <source src={selectedImage} type="video/mp4" />
          </video></div>
        )}
 <div className="instagram-post-container col-4 scroll-container p-0" style={{height:"300px"}} >
      <div className="profile-info">
        <img
          src={ProfileImg}
          alt="Profile"
          className="profile-picture"
        />
        <span>raj__goyat</span>
      </div>
      <textarea
        placeholder="Write a caption..."
        maxLength={2200}
        value={postText}
        onChange={(e)=>setPostText(e.target.value)}
        className="post-textarea"
        style={{height:"100px"}}
      />
      <div className="d-flex align-items-center justify-content-between ms-1 me-1" style={{borderBottom:"1px solid #c8c3c3"}}>
<div className="m-1"><Smile/></div><div style={{fontSize:"12px",color:"#c8c3c3"}}>0/2200</div>
      </div>
      <div className="post-options">
      <div className="d-flex mt-1 align-items-center justify-content-between ms-1 me-1" >
<div style={{fontSize:"14px",color:"#737373"}}>Add Location</div><div className="m-1"><Location/></div>
      </div>
      <div className="d-flex mt-1 align-items-center justify-content-between ms-1 me-1" >
<div style={{fontSize:"14px",color:"#737373"}}>Add Colloborator</div><div className="m-1"><AddColloborator/></div>
      </div>
      <div className="d-flex mt-1 align-items-center justify-content-between ms-1 me-1" >
<div style={{fontSize:"15px",color:""}}>Accessibility</div><div className="m-1"><DownChevron/></div>
      </div>
      <div className="d-flex mt-1 align-items-center justify-content-between ms-1 me-1" style={{borderBottom:"1px solid #c8c3c3"}}>
<div style={{fontSize:"15px",color:""}}>Advanced Seeting</div><div className="m-1"><DownChevron/></div>
      </div>
      </div>
    </div>

</div>
          <div
            className=" d-sm-block icon-container p-2 "
            style={{ zIndex: "3" }}
          >
           <ManLogo/> Tag People
          </div>
      </div>
    </Carousel.Item>


   
    <Carousel.Item>
      
    <div style={styles.dialog}>
        <div className=" text-center p-2" style={styles.header}>
       <h6>Reel Shared</h6>  
     
        </div>
      <div className="d-flex align-items-center justify-content-center " style={{height:"300px"}}>
          <div className="d-flex flex-column h-100 align-items-center justify-content-center"> 
            <span style={{ backgroundRepeat: "no-repeat", backgroundPosition: "-244px 0px", height: "98px", width: "98px",backgroundImage:`url(${allimg})` }}>
                {/* <img src={allimg} alt="Insta_logo"  style={{ }}/> */}
              </span>
       <div style={{fontSize:"1.3rem",fontWeight:"400"}}>Reel has been shared</div></div>      </div>
      </div>
    </Carousel.Item>
 
</Carousel>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "50",
  },
  dialog: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    width: "560px",
    maxWidth: "100%",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    position: "relative",
    maxHeight:"400px",
  },
  header: {
    borderBottom: "1px solid #e6e6e6",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "-15px",
    right: "0px",
    background: "transparent",
    color: "white",
    border: "none",
    fontSize: "50px",
    fontWeight: "300", // Increase the font size here
    cursor: "pointer",
    // padding: "10px", // Optionally increase padding for larger clickable area
    width: "48px", // Optionally set a fixed width
    height: "48px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center"
  },
  iconContainer: {
    marginBottom: "20px",
  },
  textContainer: {
    marginBottom: "20px",
    color: "#8e8e8e",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  iconStyle: {
    display: "flex",
    cursor: "pointer",
    height: "30px",
    width: "30px",

    borderRadius: "50px",
    transition: "transform 0.3s",
  },
};

export default CreatePost;
