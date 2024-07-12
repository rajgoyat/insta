import React from "react";
// import vid from './post/VID-20240616-WA0001.mp4'
import { peopleImgs } from "./SuggestionData";
import Following from "./Following";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSend } from "react-icons/lu";

const Center = () => {
  return (
    <div
      className="center align-items-center position-relative" style={{zIndex:"4"}}
    >
      <Following />
    </div>
  );
};
const PostData = () => {
  return (
    <div className="postData w-100 d-flex flex-column align-items-center justify-content-center">
      {peopleImgs.map((val) => {
        return (
          <div className="position-relative">
            <div
              className="position-relative d-flex p-2 mt-3 "
              style={{ width: "464px" }}
            >
              <a href="/client/profile" onClick={() => console.log("hello")}>
                <img
                  className="rounded-circle border border-dark"
                  style={{ width: "32px", height: "32px" }}
                  src={val.img}
                  alt=""
                />
              </a>
              <div
                className="d-flex flex-column text-dark ms-2"
                style={{ fontSize: "13px" }}
              >
                <a href="/client/profile" className="text-decoration-none text-reset"><p className="m-0 p-0 d-flex flex-row">
                <p className="p-0 m-0">{val.id}</p>
                  
                    <p className="ms-2 text-primary m-0 p-0">Follow</p>
                 
                </p> </a>
                <p className="p-0 m-0">Suggested for you</p>
              </div>
              <div className="position-absolute" style={{ right: "0px" }}>
                <BsThreeDotsVertical size={20} />
              </div>
            </div>
            <img className="" src={val.img} alt="" />
            <div>
              <FaRegHeart className="m-2" size={22} />
              <BiMessageRounded className="m-2" size={23} />
              <LuSend className="m-2" size={23} />
              <FaRegBookmark
                className=""
                style={{ marginLeft: "325px" }}
                size={20}
              />
            </div>
            <div className="text-dark" style={{ fontSize: "12px" }}>
              <p className="m-0">35345 likes</p>
              <p className="m-0">
                cars_universe.tiktok #vutruxe #catagram
              </p>{" "}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgb(115 115 115)",
                borderBottom: "1px solid rgb(219 219 219)",
                padding: "2px 0 15px 0",
              }}
            >
              <p className="m-0">View all 345 comments</p>
              <p className="m-0">Add a comment</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export { Center, PostData };
