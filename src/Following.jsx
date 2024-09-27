import React, { useState, useEffect } from "react";
// import { peopleImgs } from "./SuggestionData";
import { useMediaQuery } from "react-responsive";
import "./insta.css";
import { Link } from "react-router-dom";
import { useFirebase } from "./Firebase";
const Following = () => {
  const firebase= useFirebase();
  const [followingInd,setFollowingInd]= useState(4);
  const [userData,setUserData]=useState();
  const [mainUser,setMainUser]=useState(null)
  const {getAllUser, userdata}= firebase;
  useEffect(()=>{
setUserData(getAllUser);
setMainUser(userdata)
  },[userdata,getAllUser])
  const TruncateText = ({ text }) => {
    if (text.length <= 10) {
      return <span>{text}</span>;
    } else {
      return <span>{text.substring(0, 7)}...</span>;
    }
  };
const isLarger = useMediaQuery({query: '(max-width: 576px)'});
  useEffect(() => {
 if(isLarger){setFollowingInd(4)}else{setFollowingInd(8)}
}, [isLarger]);

console.log("commando",userData)

  return (
    <div
      className="followings text-white position-relative d-flex align-items-around gap-3 p-2"
      style={{ zIndex: "22" }}
    >
      {userData?.slice(0, followingInd).map((val, ind) => {
        if(val?.email===mainUser?.email){
          return null;
        }
        return (
          <div key={ind} className="d-flex flex-column align-items-center">
            <Link to={`/insta-app/profile/${val.userId}`} className="text-decoration-none">
              <div className="position-relative w-100">
                <img
                  className="rounded-circle"
                  style={{
                    height: "56px",
                    width: "56px",
                    border: "2px solid white",
                  }}
                  src={val.proimg}
                  alt=""
                />
              </div>
              <p
                className="text-dark m-0"
                style={{ fontSize: "13px", height: "30px" }}
              >
                <TruncateText text={val.fullname} />
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Following;
