import AllSuggLayout from "./Layout/AllSuggLayout"
import { Comment, Like, Reels } from "./AllIconsSvgs/IconsSvg";
import { useState, useEffect, useRef, useContext } from "react"; 
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc, setDoc, onSnapshot } from "firebase/firestore";
import { database, useFirebase } from "./Firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./Component/Loader";
import { DataContext } from "./Context/DataContext";



export default function Explore(){
    const [reels, setReels] = useState([]);
const {setNavigateSrc}= useContext(DataContext)
    const [loading, setLoading] = useState(true);
  const firebase = useFirebase();
  const { getAllUser } = firebase;
  const navigate=useNavigate()
useEffect(()=>{
  if(getAllUser?.length>0){
const allVid= getAllUser.map((val)=>{
if(val.videos?.length> 0 ){
  const data = val.videos.map(video => ({
    ...video,
    userId: val.userId
  }));
return data
}
}).filter(val=> val !== undefined).flat().filter(val=>val.type==="video")
setReels(allVid)
setLoading(false)
}
},[getAllUser])      
    return(
        <div className="">
        <AllSuggLayout>
        <div className='Post_Rell_section w-100 d-flex align-items-center justify-content-center flex-wrap bb-primary h-100 p-2 p-md-5 '>
        {loading ? (
          <Loader />
        ) : (<div className="mt-5 mt-md-0 d-flex">

              {reels.map((reel,index)=>{
                return(
                    <div className='bg- col-3 position-relative' onClick={()=>{setNavigateSrc(reel.src); navigate(`/insta/reel/${reel.userId}`)}} style={{ width: "33%", aspectRatio: "1", padding:"1px" }} key={index}>
                    <div className="w-100 h-100 postion-relative">
                      <video src={reel.src} className="w-100 h-100" style={{ objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: "10px", right: "10px", color: "white" }}><Reels /></span>
                    </div>
                    <div className="caption d-flex DALJU gap-3" >
                      <div className=" DALJU">
                        <span className="text-white d-flex gap-1 DALJU">
                          <Like />
                          <span style={{ fontSize: "14px", fontWeight: "600" }}>{reel.likes ? reel.likes.length : 0}</span>
                        </span>
                      </div>
                      <div className=" DALJU">
                        <span className="text-white d-flex gap-1 DALJU">
                          <Comment />
                          <span style={{ fontSize: "14px", fontWeight: "600" }}> {reel.comment ? reel.comment.length : 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}</div>
            )}
                 
                 
                
            </div>
        </AllSuggLayout>
        </div>
    )
}