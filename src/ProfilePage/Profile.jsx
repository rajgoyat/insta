import React, { useState ,useEffect, useContext} from "react";
import { useMediaQuery } from 'react-responsive';
import './profile.css'
import { DataContext } from "../Context/DataContext";
import FollowerFollowingBox from '../Component/FollowerFollowingBox'
import { Link, useNavigate } from "react-router-dom";
import { SideBottombars } from "../Insta";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from 'react-router-dom';
import Footer from "./Footer";
import ProfileTagged from "./ProfileTagged";
import ProfileSaved from './ProfileSaved'
import ProfileReels from "./ProfileReels";
import Posts from './Posts'
import {
  Seeting,
  PlusIcon,
  Reels,
  Tagged,
  Saved,
  Post,AddUser,HorizintalDot
} from "../AllIconsSvgs/IconsSvg";
import { useFirebase } from "../Firebase";
// import { useActionData } from "react-router-dom";
const Profile = () => {
  const {userId}= useParams()
  // console.log(userId)
const[heading,setheading]=useState();
  const firebase=useFirebase();
  useEffect(()=>{
    const getdata=async()=>{

  const data=await firebase.getUserData(userId)
  setheading(data.fullname) } 
  getdata()
  },[userId,firebase])
  return (
    <>
    
    <FollowerFollowingBox userId= {userId}/>
      <ProfileHeader heading={heading}/>
      <SideBottombars />
      <ProfileMain />
    </>
  );
};
const ProfileMain = () => {
  const [iconSize,setIconSize]= useState(24)
  const isLarger = useMediaQuery({ query: '(min-width: 767px)' });
 const navigate= useNavigate();
  const [userAdmin,setuserAdmin]=useState(); 
  const firebase= useFirebase();
const [user,setuser]=useState();
const {userdata}= firebase;
const { userId } = useParams();
const [followstate,setfollowstate]=useState("")
// console.log("prem",userdata)
const { handleUserMsgBox,setallshow,showwhat,setshowwhat,bordertop,setborderTop} = useContext(DataContext);
const [isExpanded, setIsExpanded] = useState(false); 
useEffect(()=>{
  if(userdata?.userId===userId){
    setuserAdmin(true)
  }else{setuserAdmin(false)}
  
},[userId,userdata])
useEffect(()=>{
  if (userdata?.followings?.includes(userId)) {
    setfollowstate("Unfollow")
  }
  else{setfollowstate("Follow")}
  
},[firebase,userId,userdata])

const handleFollow=async ()=>{
  try {
    if (followstate === "Follow") {
      await firebase.followuser(userId); // Perform follow action
      setfollowstate("Unfollow"); // Change the button to "Unfollow"
    } else {
      await firebase.unfollowuser(userId); // Optionally, perform unfollow action if needed
      setfollowstate("Follow"); // Change the button to "Follow"
    }
  } catch (error) {
    console.error("Error in following/unfollowing user:", error);
  }
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const userdata = await firebase.getUserData(userId);
      setuser(userdata);
      // Step 1: Filter out the logged-in user from the suggestion pool
    } catch (error) {
      console.error("Error fetching userdata:", error);
    }
  };

  fetchData();
}, [userId,user,firebase]);
// console.log("profile",user)
// let adminIds = [];
// useEffect(()=>{
//   if (userdata) {
//     adminIds = userdata.followings;
//   } console.log(adminIds)},[userdata?.followings?.length,userId])
  useEffect(() => {
    if (isLarger) {
      setIconSize(12);
    } else {
      setIconSize(24);
    }
  }, [isLarger]);
const EditProfile=()=>{
  navigate('/insta/edit')
}

const toggleExpanded = () => {
  setIsExpanded(!isExpanded); // Toggle between expanded and collapsed state
};
  return (
    <>
    <div className="centerOrsuggestion d-flex flex-column">
      <div className="profilePage" style={{ width:"100%" }}>
        <div className="d-flex justify-content-center flex-column align-items-center">
        <div
          className="justify-content-center d-flex flex-column flex-md-row m-3 m-md-0 mt-md-3"
          // style={{ height: "193px" }}
        >
          <div className="user-image ms-md-3" style={{ MaxWidth: "260px" }}>
            <img
              className="rounded-circle p-1"
              src={user?.proimg}
              alt=""
              style={{
                border: "2px solid red",
              
              }}
            />
          </div>
          <div className="follwer content mt-3">
            <div className="d-flex">
              <div className="me-2 d-none d-md-block" style={{ fontSize: "25px" }}>
                {user?.username}
              </div>
              <div
                className="btn ms-md-2 me-2 d-flex align-items-center justify-content-center"
                style={{
                  fontWeight:"600",
                  borderRadius: "10px",
                  color:userAdmin?"":"white",
                  fontSize: "14px",
                  height: "35px",
                  width: "110px",
                  backgroundColor: userAdmin ?" rgba(51, 49, 49, 0.151)": "#0095f6",}}
                  onClick={userAdmin ?  EditProfile : handleFollow} 
              >
                {userAdmin? "Edit Profile":followstate}
              </div>
              <div
                className="btn d-flex align-items-center justify-content-center ms-2 me-2"
                style={{
                  fontWeight:"500",
                  borderRadius: "10px",
                  fontSize: "14px",
                  height: "30px",
                  width: "120px",
                  backgroundColor: " rgba(51, 49, 49, 0.151)",
                }} onClick={()=>!userAdmin? handleUserMsgBox(user.username,user.proimg, user.userId):''}
              >
               {userAdmin?"View Archieve ": "Message"} 
              </div>

              <div className="ms-1 iconhover d-flex align-items-center justify-content-center" onClick={()=>userAdmin? setallshow("seetingProfileIcon"):setallshow('')} style={{height:"30px",width:"30px", borderRadius:"5px"}}>
                {userAdmin? <Seeting />: <AddUser/>  }
              </div>
              {!userAdmin && ( <div className="ms-1 iconhover d-flex align-items-center justify-content-center" style={{height:"30px",width:"30px", borderRadius:"5px"}}>
                <HorizintalDot/>        </div>)}
            </div>
            <div className="d-none d-md-block"><FollowerAndFollowing/></div>
            <div className="mt-md-5" style={{fontWeight:"500"}}><div>{user?.fullname}</div>
          {user && (<p className="fw-lighter ">{isExpanded ? user.bio : user.bio.substring(0, 100)} {/* Show first 100 characters */}
          {user.bio.length > 100 && ( 
            <span onClick={toggleExpanded} style={{ color: 'blue', cursor: 'pointer' }}>
              {isExpanded ? ' Less' : '... More'}
            </span>
          )}</p>)}  </div>
          </div>
          
        </div><div className="ms-3" style={{maxWidth:"935px", minWidth:"400px", width:"100%"}}> {userAdmin && ( <div className="" style={{ height: "120px", width: "115px"}}>
          <div
            className="border border-1 m-3 d-flex align-items-center justify-content-center"
            style={{ height: "87px", width: "87px", borderRadius: "50%" }}
          >
          <PlusIcon />
          </div>
          <div className="text-center">New</div>
        </div>)}</div></div>
       
        <div className="d-md-none d-flex align-items-center justify-content-center"><FollowerAndFollowing/></div>
        <div
          className="gap-5 content d-flex align-items-center mt-md-5 justify-content-evenly justify-content-md-center"
          style={{ height: "53px", borderTop:"2px solid rgba(51, 49, 49, 0.151)", color:"rgb(115, 115, 115)" }}
        >
          <div className=" d-flex h-100 align-items-center justify-content-center" onClick={()=>setborderTop(1)}  style={{width:isLarger?"10%":"20%", borderTop:bordertop===1?"1px solid black":''}}>
            <div style={{cursor:"pointer", color: bordertop===1 ? (isLarger ? "black" : "#0095f6") : ''
}} className="d-flex align-items-center justify-content-evenly " onClick={()=>setshowwhat("post")}>
             <div > <Post height={iconSize} width={iconSize}/>
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            POST</div></div>
          </div>
          <div className="d-flex h-100 align-items-center justify-content-center" onClick={()=>setborderTop(2)}  style={{width:isLarger?"10%":"20%", borderTop:bordertop===2?"1px solid black":''}}>
            <div style={{cursor:"pointer", color: bordertop===2 ? (isLarger ? "black" : "#0095f6") : ''
}} className="d-flex align-items-center justify-content-evenly" onClick={()=>setshowwhat("reels")}>
            <div > <Reels height={iconSize} width={iconSize} />
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            REELS</div></div>
          </div>
          <div className="d-flex  h-100 align-items-center justify-content-center" onClick={()=>setborderTop(3)}  style={{width:isLarger?"10%":"20%", borderTop:bordertop===3?"1px solid black":''}}>
            <div style={{cursor:"pointer", color: bordertop===3 ? (isLarger ? "black" : "#0095f6") : ''
}} className="d-flex align-items-center justify-content-evenly" onClick={()=>setshowwhat("saved")}>
            <div > <Saved height={iconSize} width={iconSize} />
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            SAVED</div></div>
          </div>
          <div className=" d-flex  h-100 align-items-center justify-content-center" onClick={()=>setborderTop(4)}  style={{width:isLarger?"10%":"20%", borderTop:bordertop===4?"1px solid black":''}}>
            <div style={{cursor:"pointer", color: bordertop===4 ? (isLarger ? "black" : "#0095f6") : ''
}} className="d-flex align-items-center justify-content-evenly" onClick={()=>setshowwhat("tagged")}>
           
            <div >
              <Tagged height={iconSize} width={iconSize}/>
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            TAGGED</div></div>
          </div>
        </div>
        <div className=" bottom area row m-0">{showwhat==="reels"?<ProfileReels/>:showwhat==="saved"?<ProfileSaved/>:showwhat==="post"?<Posts/>:showwhat==="tagged"?<ProfileTagged/>:null}</div>
      </div>
      <Footer/>

    </div>
    </>);
};
const ProfileHeader = ({heading}) => {
  const navigate = useNavigate()
  return (
    <div
      className="d-md-none text-center position-absolute top-0 w-100"
      style={{ borderBottom: "1px solid #c8c8c8", height: "44px" }}
    >
      <div onClick={()=>navigate(-1)}
        className="position-absolute start-0 m-2 text-decoration-none"
      >
        <IoIosArrowBack size={22} />
      </div>
      <div className="p-2 fw-normal fs-4 pt-1">{heading}</div>
    </div>
  );
};
const FollowerAndFollowing=()=>{
  const firebase= useFirebase();
const [follower,setfollower]=useState("")
  const [following,setfollowing]=useState("")
  const [numpost,setnumpost]=useState("")
  const { setallshow } = useContext(DataContext);

  const {userId}=useParams(); //not admin Id
  useEffect(()=>{
const getfollower=async()=>{
const notadmindata= await firebase.getUserData(userId)
setfollower(notadmindata.followers.length)
setfollowing(notadmindata.followings.length)
if (Array.isArray(notadmindata.videos)) {
  const images = notadmindata.videos.filter(videos => videos.type === 'image');
  setnumpost(images.length);
} else {
  setnumpost('0');
}
}
getfollower();
  },[firebase,userId,firebase?.userdata])
  return(
  <div className="d-flex followContent align-items-center justify-content-md-start justify-content-evenly w-100" style={{marginTop:"20px",padding:"12px",width:"300px"}}>
              <div className=" d-md-flex flex-md-row" style={{height:"36px"}}>
                <div className="text-center text-dark me-1" style={{fontWeight:"600", fontSize:"14px"}}>{numpost>=1?numpost :"0"}</div> <div style={{fontSize:"14px", fontWeight:"400"}}> post
              </div></div>
              <div className="ms-md-5 ps-md-3 d-md-flex flex-md-row" style={{height:"36px"}} onClick={()=>setallshow("followerbox")}>
              <div className="text-center text-dark me-1" style={{fontWeight:"600", fontSize:"14px"}}>{follower} </div> <div style={{fontSize:"14px", fontWeight:"400"}}> follower
              </div></div>
              <div className="ms-md-5 ps-md-3 d-md-flex flex-md-row" style={{height:"36px"}} onClick={()=>setallshow("followingbox")}>
                <div className="text-center text-dark me-1" style={{fontWeight:"600", fontSize:"14px"}}>{following}</div><div style={{fontSize:"14px", fontWeight:"400"}}>  following
              </div></div>
            </div>)
}
export { Profile ,ProfileHeader};
