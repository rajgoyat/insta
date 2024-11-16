import React, { useState, useEffect } from "react";
// import { peopleImgs } from "./SuggestionData";
import { useMediaQuery } from "react-responsive";
import "./insta.css";
import { AddUser } from "./AllIconsSvgs/IconsSvg";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "./Firebase";
import StoryImage from "./story/StoryImage";
const Following = () => {
  const firebase = useFirebase();
  const [followingInd, setFollowingInd] = useState(4);
  const [userData, setUserData] = useState();
  const { getAllUser, userdata, getUserData } = firebase;
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [stories, setStories] = useState({});
  // const storiesRef = collection(database, `users/${userId}/story`);
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(getAllUser);
    if (userData) {
      const load = async () => {
        let followingUsers = [];
        if (userdata && userData) {
          followingUsers = userdata.followings;
          const userDataPromises = followingUsers.map(async (val) => {
            return await getUserData(val);
          });
          const usersData = await Promise.all(userDataPromises); // Fetch all user data
          const usersData1 = usersData.filter((val) => val.stories?.length > 0); // Filter users with stories
          const usersData2 = userData?.filter(
            (val) => !userdata?.followings.includes(val.userId)
          );
          const followinga = usersData1.concat(usersData2);
          setSuggestedUsers(followinga);
        }
      };
      load();
    }
  }, [userdata, userData]); // Adding dependency on userdata
  const TruncateText = ({ text }) => {
    if (text?.length <= 10) {
      return <span>{text}</span>;
    } else {
      return <span>{text?.substring(0, 7)}...</span>;
    }
  };
  const isLarger = useMediaQuery({ query: "(max-width: 576px)" });
  const isLarger2 = useMediaQuery({ query: "(min-width: 767px)" });

  useEffect(() => {
    if (isLarger) {
      setFollowingInd(3);
    } else {
      setFollowingInd(7);
    }
  }, [isLarger]);

  return (
    <>
      <div
        className="d-flex flex-column align-items-center "
        style={{ marginTop: isLarger2 ? "35px" : "-6px" }}
      >
        <div className="position-relative w-100">
          <StoryImage />
        </div>
        <p
          className="text-dark m-0 text-center"
          style={{ fontSize: "13px", height: "30px" }}
        >
          <TruncateText text="Your story" />
        </p>
      </div>

      <div
        className="followings text-white position-relative d-flex align-items-around gap-3 p-2"
        style={{ zIndex: "22" }}
      >
        {suggestedUsers.length > 1 && (
          <>
            {suggestedUsers?.slice(0, followingInd).map((val, ind) => {
              const userStories = val?.stories;
              return (
                <div
                  key={ind}
                  onClick={() => {
                    if (userdata?.followings.includes(val.userId)) {
                      navigate(`/insta/story/${val.userId}`);
                    } else {
                      navigate(`/insta/profile/${val.userId}`);
                    }
                  }}
                  className={`${
                    val?.userId === userdata?.userId ? "d-none" : "d-flex"
                  }  flex-column align-items-center position-relative`}
                >
                  <div
                    className={`position-relative w-100 ${
                      userdata?.followings.includes(val?.userId)
                        ? "storyImg"
                        : ""
                    }`}
                  >
                    {userStories?.length > 0 && userdata?.followings.includes(val?.userId) ? (
                      userStories[0]?.src?.type?.startsWith("video") ? (
                        <video
                          src={userStories[0].src}
                          controls
                          style={{
                            height: "56px",
                            width: "56px",
                            borderRadius: "50%", // Circular look for video
                          }}
                        ></video>
                      ) : (
                        <img
                          className="rounded-circle "
                          style={{
                            height: "56px",
                            width: "56px",
                            border: "2px solid white",
                          }}
                          src={userStories[0].src}
                          alt="User Story"
                        />
                      )
                    ) : (
                      <img
                        className="rounded-circle"
                        style={{
                          height: "56px",
                          width: "56px",
                          border: "2px solid white",
                        }}
                        src={val?.proimg}
                        alt="Default Profile"
                      />
                    )}
                    <div
                      className={`position-absolute bg-white ${userdata?.followings.includes(val?.userId)? "d-none":"d-flex"}  align-items-center justify-content-center`}
                      style={{
                        color:"black",
                        bottom: "-5px",
                        left: "13px",
                        height: "20px",
                        width: "30px",
                        borderRadius: "10px",
                      }}
                    >
                      <AddUser/>
                    </div>
                  </div>
                  <p
                    className="text-dark m-0 text-center"
                    style={{ fontSize: "13px", height: "30px" }}
                  >
                    <TruncateText text={val?.username} />
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Following;
