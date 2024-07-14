import React from "react";
import './profile.css'
import { peopleImgs } from "../SuggestionData";
import { SideBottombars } from "../Insta";
import { IoIosArrowBack } from "react-icons/io";
import {
  Seeting,
  PlusIcon,
  Reels,
  Tagged,
  Saved,
  Post,
} from "../AllIconsSvgs/IconsSvg";
const Profile = () => {
  return (
    <>
      <ProfileHeader />
      <SideBottombars />
      <ProfileMain />
    </>
  );
};

const ProfileMain = () => {
  return (
    <div className="centerOrsuggestion">
      <div className="profilePage" style={{ maxWidth:"934px" }}>
        <div
          className="justify-content-center d-flex mt-md-3"
          style={{ height: "193px" }}
        >
          <div className="user-image " style={{ MaxWidth: "260px", width:"200px" }}>
            <img
              className="rounded-circle p-1"
              src={peopleImgs[5].img}
              alt=""
              style={{
                border: "2px solid red",
              
              }}
            />
          </div>
          <div className="follwer content mt-3">
            <div className="d-flex">
              <div className="me-2" style={{ fontSize: "25px" }}>
                {peopleImgs[4].id}
              </div>
              <div
                className="btn text-center ms-2 me-2"
                style={{
                  borderRadius: "10px",
                  fontSize: "14px",
                  height: "30px",
                  width: "110px",
                  backgroundColor: " rgba(51, 49, 49, 0.151)",
                }}
              >
                Edit Profile
              </div>
              <div
                className="btn text-center ms-2 me-2"
                style={{
                  borderRadius: "10px",
                  fontSize: "14px",
                  height: "30px",
                  width: "120px",
                  backgroundColor: " rgba(51, 49, 49, 0.151)",
                }}
              >
                View Archieve
              </div>

              <div className="">
                <Seeting />
              </div>
            </div>
            <div className="d-none d-md-block"><FollowerAndFollowing/></div>
            <div>Raj_Gahlot</div>
            <p className="fw-lighter ">hello</p>
          </div>
        </div>
        <div className="ms-5" style={{ height: "120px", width: "115px" }}>
          <div
            className="border border-1 m-3 d-flex align-items-center justify-content-center"
            style={{ height: "87px", width: "87px", borderRadius: "50%" }}
          >
            <PlusIcon />
          </div>
          <div className="text-center">New</div>
        </div>

        <div className="d-md-none"><FollowerAndFollowing/></div>

        <div
          className="gap-5 content d-flex align-items-center mt-md-5 justify-content-center"
          style={{ height: "53px",borderTop:"2px solid rgba(51, 49, 49, 0.351)",borderBottom:"2px solid rgba(51, 49, 49, 0.151)" }}
        >
          <div className=" d-flex ms-3">
            <div className="">
              <Post />
            </div><div className="ms-2" style={{marginTop:"2px"}}>
            POST</div>
          </div>
          <div className=" d-flex ms-3">
            <div className="">
              <Reels height={15} width={15} />
            </div><div className="ms-2" style={{marginTop:"2px"}}>
            REELS</div>
          </div>
          <div className=" d-flex ms-3">
            <div className="">
              <Saved height={15} width={15} />
            </div><div className="ms-2" style={{marginTop:"2px"}}>
            SAVED</div>
          </div>
          <div className=" d-flex ms-3">
            <div className="">
              <Tagged />
            </div><div className="ms-2" style={{marginTop:"2px"}}>
            TAGGED</div>
          </div>
        </div>
        <div className=" bottom area"></div>
      </div>
    </div>
  );
};
const ProfileHeader = () => {
  return (
    <div
      className="d-md-none text-center position-absolute top-0 w-100"
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.219)", height: "44px" }}
    >
      <a
        href="/insta-app"
        className="position-absolute start-0 m-2 text-decoration-none"
      >
        <IoIosArrowBack size={22} />
      </a>{" "}
      <div className="p-2">{peopleImgs[0].id}</div>
    </div>
  );
};
const FollowerAndFollowing=()=>{
  return(
  <div className="d-flex align-items-center justify-content-md-between justify-content-evenly mt-3">
              <p className="fs-5">
                <span className="fs-5 fw-medium">3</span> post
              </p>
              <p className="fs-5">
                <span className="fs-5 fw-medium">5</span> follower
              </p>
              <p className="fs-5">
                <span className="fs-5 fw-medium">10</span> following
              </p>
            </div>)
}
export { Profile };
