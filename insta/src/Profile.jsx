import React from "react";
import { peopleImgs } from "./SuggestionData";
import { SideBottombars } from "./Insta";
import { IoIosArrowBack } from "react-icons/io";
const Profile = () => {
  return (
    <><ProfileHeader/>
      <SideBottombars />
      <ProfileMain />
    </>
  );
};
const ProfileMain = () => {
  return (
    <div className="centerOrsuggestion">
      <div className="profilePage" style={{width:"934px"}}>
        <div className="justify-content-center d-flex mt-md-3" style={{height:"193px"}}>
          <div className="user-image " style={{width:"283px"}}>
            <img className="rounded-circle p-1" src={peopleImgs[0].img} alt="" style={{border:"2px solid red",height:"150px", width:"150px"}} />
          </div>
          <div className="follwer content">
<div>{peopleImgs[0].id}</div>
<div className="d-flex"><p>3 post</p>
<p>5 follower</p>
<p>10 following</p></div>
<div>username</div>
          </div>
        </div>
        <div className="rells content"></div>
        <div className=" bottom area"></div>
      </div>
    </div>
  );
};
const ProfileHeader=()=>{
  return(
    <div className="d-md-none text-center position-absolute top-0 w-100" style={{borderBottom:"1px solid rgba(0, 0, 0, 0.219)", height:"44px"}}><a href="/client" className="position-absolute start-0 m-2 text-decoration-none"><IoIosArrowBack size={22}/></a> <div className="p-2">{peopleImgs[0].id}</div></div>
  )
}
export {Profile}
