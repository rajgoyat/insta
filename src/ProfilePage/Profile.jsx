import React, { useState ,useEffect} from "react";
import { useMediaQuery } from 'react-responsive';
import './profile.css'
import { Link, useNavigate } from "react-router-dom";
// import { peopleImgs } from "../SuggestionData";
import { SideBottombars } from "../Insta";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from 'react-router-dom';
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
  console.log("dddd",data)
  setheading(data.fullname) } 
  getdata()
  },[userId,firebase])
  // console.log("kgjdkgjd",heading)
  return (
    <>
      <ProfileHeader heading={heading}/>
      <SideBottombars />
      <ProfileMain />
    </>
  );
};
const ProfileMain = () => {
  const [iconSize,setIconSize]= useState(25)
  const isLarger = useMediaQuery({ query: '(min-width: 767px)' });
 const navigate= useNavigate();
  const [userAdmin,setuserAdmin]=useState(); 
  const firebase= useFirebase();
const [user,setuser]=useState();
const {userdata}= firebase;
const { userId } = useParams();
const [showwhat,setshowwhat]=useState("post")
const [followstate,setfollowstate]=useState("")
// console.log("prem",userdata)
const [isExpanded, setIsExpanded] = useState(false); 
useEffect(()=>{
  if(userdata?.userId===userId){
    setuserAdmin(true)
  }else{setuserAdmin(false)}
  
},[userId,userdata])
useEffect(()=>{
  if (userdata?.followings?.includes(userId)) {
    console.log("User ID found in followings:", userId);
    setfollowstate("Unfollow")
  }
  else{setfollowstate("Follow")}
  
},[userdata,userId])
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

  useEffect(() => {
    if (isLarger) {
      setIconSize(15);
    } else {
      setIconSize(25);
    }
  }, [isLarger]);
const EditProfile=()=>{
  navigate('/insta-app/edit')
}
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

const toggleExpanded = () => {
  setIsExpanded(!isExpanded); // Toggle between expanded and collapsed state
};
  return (
    <div className="centerOrsuggestion">
      <div className="profilePage" style={{ width:"100%" }}>
        <div
          className="justify-content-center d-flex mt-md-3"
          // style={{ height: "193px" }}
        >
          <div className="user-image " style={{ MaxWidth: "260px" }}>
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
                {user?.fullname}
              </div>
              <div
                className="btn ms-2 me-2 d-flex align-items-center justify-content-center"
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
                }}
              >
               {userAdmin?"View Archieve ": "Message"} 
              </div>

              <div className="ms-1 iconhover d-flex align-items-center justify-content-center" style={{height:"30px",width:"30px", borderRadius:"5px"}}>
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
        </div>
       {userAdmin && ( <div className="ms-sm-5 ms-2" style={{ height: "120px", width: "115px" }}>
          <div
            className="border border-1 m-3 d-flex align-items-center justify-content-center"
            style={{ height: "87px", width: "87px", borderRadius: "50%" }}
          >
          <PlusIcon />
          </div>
          <div className="text-center">New</div>
        </div>)}
        <div className="d-md-none d-flex align-items-center justify-content-center"><FollowerAndFollowing/></div>
        <div
          className="gap-5 content d-flex align-items-center mt-md-5 justify-content-center"
          style={{ height: "53px", borderTop:"2px solid rgba(51, 49, 49, 0.151)" }}
        >
          <div className=" d-flex ms-3">
            <div style={{cursor:"pointer"}} className="d-flex align-items-center justify-content-evenly " onClick={()=>setshowwhat("post")}>
             <div> <Post height={iconSize} width={iconSize}/>
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            POST</div></div>
          </div>
          <div className="  ms-3">
            <div style={{cursor:"pointer"}} className="d-flex align-items-center justify-content-evenly" onClick={()=>setshowwhat("reels")}>
            <div > <Reels height={iconSize} width={iconSize} />
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            REELS</div></div>
          </div>
          <div className="  ms-3">
            <div style={{cursor:"pointer"}} className="d-flex align-items-center justify-content-evenly">
            <div > <Saved height={iconSize} width={iconSize} />
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            SAVED</div></div>
          </div>
          <div className=" d-flex ms-3">
            <div className="">
              <Tagged height={iconSize} width={iconSize}/>
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            TAGGED</div>
          </div>
        </div>
        <div className=" bottom area">{showwhat==="reels"?<ProfileReels/>:<Posts/>}</div>
      </div>
    </div>
  );
};
const ProfileHeader = ({heading}) => {
  return (
    <div
      className="d-md-none text-center position-absolute top-0 w-100"
      style={{ borderBottom: "1px solid #c8c8c8", height: "44px" }}
    >
      <Link
        to="/insta-app"
        className="position-absolute start-0 m-2 text-decoration-none"
      >
        <IoIosArrowBack size={22} />
      </Link>
      <div className="p-2 fw-normal fs-4 pt-1">{heading}</div>
    </div>
  );
};
const FollowerAndFollowing=()=>{
  const firebase= useFirebase();
const [follower,setfollower]=useState("")
  const [following,setfollowing]=useState("")
  const [numpost,setnumpost]=useState("")
  // const {userdata}= firebase;
  const {userId}=useParams(); //not admin Id
  useEffect(()=>{
const getfollower=async()=>{
const notadmindata= await firebase.getUserData(userId)
// console.log("jkdjfdfd",notadmindata.followers,notadmindata.followings)
// const data= await firebase.userdata;
setfollower(notadmindata.followers.length)
setfollowing(notadmindata.followings.length)
if (Array.isArray(notadmindata.video)) {
  const images = notadmindata.video.filter(video => video.type === 'image');
  setnumpost(images.length);
} else {
  setnumpost('0');
}
// // console.log("jkdjfdfd",data.followers,data.followings)
}
getfollower();
  },[firebase,userId])
  return(
  <div className="d-flex followContent align-items-center justify-content-md-between justify-content-evenly mt-3" style={{width:"300px"}}>
              <div className=" d-md-flex flex-md-row">
                <div className="text-center text-dark me-1" style={{fontWeight:"700"}}>{numpost>=1?numpost :"0"}</div> <div> post
              </div></div>
              <div className=" d-md-flex flex-md-row">
              <div className="text-center text-dark me-1" style={{fontWeight:"700"}}>{follower} </div> <div> follower
              </div></div>
              <div className=" d-md-flex flex-md-row">
                <div className="text-center text-dark me-1" style={{fontWeight:"700"}}>{following}</div><div>  following
              </div></div>
            </div>)
}
export { Profile ,ProfileHeader};
