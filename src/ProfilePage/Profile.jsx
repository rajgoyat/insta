import React, { useState ,useEffect} from "react";
import { useMediaQuery } from 'react-responsive';
import './profile.css'
import { Link } from "react-router-dom";
// import { peopleImgs } from "../SuggestionData";
import { SideBottombars } from "../Insta";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from 'react-router-dom';
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
  console.log("kgjdkgjd",heading)
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
  const [userAdmin,setuserAdmin]=useState(); 
  const firebase= useFirebase();
const [user,setuser]=useState();
const {userdata}= firebase;
const { userId } = useParams();
// console.log("prem",userdata)
useEffect(()=>{
  if(userdata?.userId===userId){
    setuserAdmin(true)
  }else{setuserAdmin(false)}
  
},[userId])
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
}, [userId,user]);
// console.log("profile",user)

  useEffect(() => {
    if (isLarger) {
      setIconSize(15);
    } else {
      setIconSize(25);
    }
  }, [isLarger]);

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
                  backgroundColor: userAdmin ?" rgba(51, 49, 49, 0.151)": "#0095f6",
                }}
              >
                {userAdmin? "Edit Profile":"Follow"}
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
            <p className="fw-lighter ">hello</p></div>
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
        <div className="d-md-none"><FollowerAndFollowing/></div>
        <div
          className="gap-5 content d-flex align-items-center mt-md-5 justify-content-center"
          style={{ height: "53px", borderTop:"2px solid rgba(51, 49, 49, 0.151)" }}
        >
          <div className=" d-flex ms-3">
            <div className="">
              <Post height={iconSize} width={iconSize}/>
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            POST</div>
          </div>
          <div className=" d-flex ms-3">
            <div className="">
              <Reels height={iconSize} width={iconSize} />
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            REELS</div>
          </div>
          <div className=" d-flex ms-3">
            <div className="">
              <Saved height={iconSize} width={iconSize} />
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            SAVED</div>
          </div>
          <div className=" d-flex ms-3">
            <div className="">
              <Tagged height={iconSize} width={iconSize}/>
            </div><div className="ms-2 d-none d-md-block" style={{marginTop:"2px"}}>
            TAGGED</div>
          </div>
        </div>
        <div className=" bottom area"></div>
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
  return(
  <div className="d-flex followContent align-items-center justify-content-md-between justify-content-evenly mt-3">
              <div className=" d-md-flex flex-md-row">
                <div className="text-center text-dark me-1" style={{fontWeight:"700"}}>3 </div> <div> post
              </div></div>
              <div className=" d-md-flex flex-md-row">
                <div className="text-center text-dark me-1" style={{fontWeight:"700"}}>5.3M </div> <div> follower
              </div></div>
              <div className=" d-md-flex flex-md-row">
                <div className="text-center text-dark me-1" style={{fontWeight:"700"}}>10</div><div>  following
              </div></div>
            </div>)
}
export { Profile ,ProfileHeader};
