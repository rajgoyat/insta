import { IoIosArrowBack } from "react-icons/io";
import { LuUserCheck } from "react-icons/lu";
import { PiTextAaBold } from "react-icons/pi";
import { FaRegStickyNote } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Cross} from "./StoryFeature"
import { useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect} from "react";
import { useFirebase,storage} from "../Firebase"; // Firebase ka context
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Storage functions
// import { collection,addDoc } from "firebase/firestore"; // Firestore functions
import Loader from '../Component/Loader'
import { doc, getFirestore, updateDoc } from "firebase/firestore";
export default function CreateStory(){
    const navigate=useNavigate();
const firebase=useFirebase();
const [userr, setUser] = useState(null);
const [isUploading, setIsUploading] = useState(false); // Upload status
// const [loader,setLoader]=useState(false)
const { user, userdata} = firebase;
const location = useLocation();
const { file, fileURL, fileType } = location.state || {}; 
    const handleShare = async () => {
        console.log(isUploading)
    if (!file ) return;
    setIsUploading(true);
    try {
        const storageRef = ref(storage, `stories/${user.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
                console.error("Upload failed:", error);
                setIsUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
               const newStory= {   src: downloadURL,
                    isVideo: fileType,
                    timestamp: new Date().getTime(),
                    id:new Date().getTime() // Store current timestamp
                  }
                await updateDoc(doc(getFirestore(), `users/${user.uid}`), {
                                stories: [...(userdata.stories || []),newStory],
                              }
                            
                          );
                setIsUploading(false);
                // setLoader(true);
                alert("Post shared successfully!");
                
            }
        );
    } catch (error) {
        console.error("Error sharing post:", error);
        setIsUploading(false);
    }
};
useEffect(() => {
    const data = firebase.userdata;
    // console.log("hhhh", data);
    setUser(data);
  }, [firebase.userdata]);

    return(
        <>
      <div className=" w-100  d-flex align-items-center justify-content-center" style={{background: "rgba(0,0,0,0.65)", height:"100vh"}}>
<div style={{height:"100vh", maxWidth:"685px", width:"100%"}}>
<div  style={{ position: "absolute", top: "15px", right: "15px", color: "white" }} className="cr d-md-block d-none"  onClick={() => navigate(-1)}>
            <Cross />
        </div>
<div  className="Create_main h-100 position-relative">
<div className="w-100  m-0 d-flex  flex-column position-relative h-100" style={{borderRadius:"10px"}}>

<div className=" d-flex justify-content-between align-items-center bg- p-3  w-100"   style={{zIndex:"2005",position:"absolute",top:"0px"}} >
<div style={{height:"35px",width:"35px",borderRadius:"50%",background: "rgba(0,0,0,0.65)"}} className="d-flex align-items-center justify-content-center text-white fs-5"  onClick={() => navigate(-1)}><IoIosArrowBack/></div>
<div className="d-flex gap-2">
<div style={{height:"35px",width:"35px",borderRadius:"50%",background: "rgba(0,0,0,0.65)"}} className="text-white fs-5 d-flex align-items-center justify-content-center"><LuUserCheck/></div>   
<div style={{height:"35px",width:"35px",borderRadius:"50%",background: "rgba(0,0,0,0.65)"}} className="text-white fs-5 d-flex align-items-center justify-content-center"><PiTextAaBold/></div>   
<div style={{height:"35px",width:"35px",borderRadius:"50%",background: "rgba(0,0,0,0.65)"}} className="text-white fs-5 d-flex align-items-center justify-content-center"><FaRegStickyNote/></div>   
<div style={{height:"35px",width:"35px",borderRadius:"50%",background: "rgba(0,0,0,0.65)"}} className="text-white fs-5 d-flex align-items-center justify-content-center"><BsStars/></div>   
<div style={{height:"35px",width:"35px",borderRadius:"50%",background: "rgba(0,0,0,0.65)"}} className="text-white fs-5 d-flex align-items-center justify-content-center"><IoMusicalNotesOutline/></div>   
<div style={{height:"35px",width:"35px",borderRadius:"50%",background: "rgba(0,0,0,0.65)"}} className="text-white fs-5 d-flex align-items-center justify-content-center"><BsThreeDots/></div>   
</div>
</div>

{isUploading && <div className="text-center w-100 position-absolute DALJU" style={{top:"50%",zIndex:"2009"}}><Loader/></div>}
{fileType === "image" ? (
                                    <img
                                        src={fileURL} // Using ref to persist image URL
                                        alt="Selected"
                                        style={{
                                             width: "100%",
                                             height: "89%",
                                            objectFit: "cover",
                                           position:"absolute"
                                        }}
                                    />
                                ) : (
                                    <div  className=" w-100" style={{ height: "89%"}}>
                                    <video
                                   
                                    className="w-100 h-100 "
                                       
                                        autoPlay
                                        style={{
                                            objectFit: "cover",
                                            
                                        }}
                                    > <source src={fileURL} type="video/mp4" /></video>
                                    </div>
                                )}

</div>
<div className="bg-dark w-100 position-absolute py-4 px-2 d-flex justify-content-between align-items-center" style={{bottom:"0px",right:"0px",height:"85px"}}>
<div className="py-2 px-3 gap-2 text-white d-flex align-items-center justify-content-center" style={{borderRadius:"20px",background: "rgba(0,0,0,0.65)"}}>
<div tyle={{height:"23px",width:"23px",borderRadius:"50%",border:"1px solid white"}}><img src={userr?.proimg} style={{height:"23px",width:"23px",borderRadius:"50%"}}/></div>
<span style={{fontSize:"12px",fontWeight:"500"}}>Your stories</span>
</div>
<div className="py-2 px-3 gap-2 text-white d-flex align-items-center justify-content-center" style={{borderRadius:"20px",background: "rgba(0,0,0,0.65)"}}>
<div style={{height:"23px",width:"23px",borderRadius:"50%",border:"1px solid white",background:"green"}} className="d-flex align-items-center justify-content-center p-1"><FaStar/></div>
<span style={{fontSize:"12px",fontWeight:"500"}}>Close Friends</span>
</div>
<div style={{height:"40px",width:"40px",borderRadius:"50%", cursor:isUploading?'not-allowed':'', pointerEvents:isUploading?"none":''}} className={`bg-white d-flex align-items-center justify-content-center fs-5`}  onClick={handleShare}><IoIosArrowForward/></div>
</div>
</div>
</div> </div>
        </>
    )
}