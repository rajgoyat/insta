import React, { useState, useEffect } from "react";
import { peopleImgs } from "./SuggestionData";
import "./insta.css";
import { Link } from "react-router-dom";
const Following = () => {
  const [followingInd,setFollowingInd]= useState(4);
  const TruncateText = ({ text }) => {
    if (text.length <= 10) {
      return <span>{text}</span>;
    } else {
      return <span>{text.substring(0, 7)}...</span>;
    }
  };
  useEffect(() => {
  const handleResize = () => {
    if (window.matchMedia("(max-width: 576px)").matches) {
      setFollowingInd(4);
    } else {
      setFollowingInd(8);
      
    }
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <div
      className="followings text-white position-relative w-100  d-flex align-items-around justify-content-around p-2"
      style={{ maxWidth: "530px", zIndex: "22" }}
    >
      {peopleImgs.slice(0, followingInd).map((val, ind) => {
        return (
          <div key={ind} className="d-flex flex-column align-items-center">
            <Link to="/client/profile" className="text-decoration-none">
              <div className="position-relative w-100">
                <img
                  className="rounded-circle"
                  style={{
                    height: "56px",
                    width: "56px",
                    border: "2px solid white",
                  }}
                  src={val.img}
                  alt=""
                />
              </div>
              <p
                className="text-dark m-0"
                style={{ fontSize: "13px", height: "30px" }}
              >
                <TruncateText text={val.id} />
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Following;
