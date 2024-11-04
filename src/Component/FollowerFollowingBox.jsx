import React, { useContext, useEffect, useState } from "react";
import img from "../Imgs/profile.jpg";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { database, useFirebase } from "../Firebase";
import { DataContext } from "../Context/DataContext";
export default function SearchFollowing({ userId }) {
  const navigate = useNavigate();
  const { allshow, setallshow} = useContext(DataContext);
  const [admin, setadmin] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [followerId, setfollowerId] = useState();
  const [followingId, setfollowingId] = useState();
  const [followingUser, setfollowingUser] = useState();
  const [buttonTextStates, setButtonTextStates]= useState({})
  const [followerUser, setfollowerUser] = useState();
  const firebase = useFirebase();
  const [userdata, setuserdata] = useState();
  const [remove, setremove] = useState("Remove");

const handleFollowToggle = async (userId,ind) => {
  firebase.sethello((prev) => !prev);

  setButtonTextStates((prevStates) => {
    const isCurrentlyFollowing = prevStates[userId] 
      ? prevStates[userId] === "Unfollow" 
      : adminIds.includes(userId); // Set based on adminIds only on first click
    
    const newFollowState = isCurrentlyFollowing ? "Follow" : "Unfollow";

    // Perform the follow/unfollow action
    const check=async()=>{if (newFollowState === "Unfollow") {
      await firebase.followuser(userId);
    } else {
     await firebase.unfollowuser(userId);
    }}
    check();
      
        const btn= document.querySelector(`.as${ind}`)
btn.innerText==="Removed"?setremove("Remove"):btn.innerText==="Remove"?setremove("Removed"):setremove('')
    return {
      ...prevStates,
      [userId]: newFollowState, // Update the state with new follow status
    };
  });
};


  useEffect(() => {
    const getuser = async () => {
      const data = await firebase.userdata;
      setuserdata(data);
    };
    getuser();
  }, [userdata, firebase, userdata?.followers, userdata?.followings,buttonTextStates]);
  const { user, getUserData } = firebase;
  useEffect(() => {
    if (userId && user && user.uid) {
      if (user.uid === userId) {
        setadmin(true);
      } else {
        setadmin(false);
      }
    }
  }, [user, userId]);

  // Mock fetching following users dat

  const handlenavigate = (id) => {
    navigate(`/SearchProfile/${id}`);
    setallshow("");
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        // Wait for all getUserData calls to complete and collect results
        const followerdata = await Promise.all(
          followerId.map(async (id) => {
            const userData = await getUserData(id); // Pass each id to getUserData
            return userData;
          })
        );
        const followingdata = await Promise.all(
          followingId.map(async (id) => {
            const userData = await getUserData(id); // Pass each id to getUserData
            return userData;
          })
        );
        setfollowerUser(followerdata);
        setfollowingUser(followingdata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching following data:", error);
      }
    };
    if (followerId || followingId) {
      getdata();
    }
  }, [followerId, followingId, userId]);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const userRef = doc(database, "users", userId); // Fetch the logged-in user's document
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const followingId = userSnapshot.data().followings || []; // Get following IDs from the document
          setfollowingId(followingId); // Set the following IDs in the state
          const followerId = userSnapshot.data().followers || []; // Get following IDs from the document
          setfollowerId(followerId);
        }
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };
    if (user) {
      fetchFollowingList(); // Call the function when the component mounts
    }
  }, [user, userId]);
  const data =
    allshow === "followingbox"
      ? followingUser
      : allshow === "followerbox"
      ? followerUser
      : [];
  const filterData = (
    allshow === "followingbox"
      ? followingUser || []
      : allshow === "followerbox"
      ? followerUser || []
      : []
  ).filter((obj) =>
    obj?.fullname?.toLowerCase().includes(search?.toLowerCase())
  );
  let adminIds = [];
  if (userdata) {
    adminIds =
      allshow === "followingbox" ? userdata.followings : userdata.followers;
  }
 
  return (
    <>
      <div
        className={`${
          allshow === "followerbox" || allshow === "followingbox"
            ? "d-flex align-items-center justify-content-center"
            : "d-none"
        } w-100 bg- DALJU position-absolute top-0`}
        onClick={() => setallshow("")}
        style={{
          height: "100vh",
          background: "rgba(0,0,0,0.65)",
          zIndex: "1001",
        }}
      >
        <div
          style={{ width: "400px", height: "400px", borderRadius: "12px" }}
          className="d-flex bg-white flex-column"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{ height: "42px" }}
            className="w-100 d-flex align-items-center justify-content-between px-2"
          >
            <div></div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              {allshow === "followerbox" ? "Followers" : "Followings"}
            </div>
            <div className="cr" onClick={() => setallshow("")}>
              <Cross />
            </div>
          </div>
          <hr className="m-0 p-0"></hr>
          <div
            style={{ height: "48px", padding: "8px 16px" }}
            className="w-100 bg-"
          >
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search"
              type="search"
              style={{
                padding: "3px 16px",
                border: "none",
                outline: "none",
                background: "#efefef",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "400",
              }}
              className="w-100 h-100"
            />
          </div>
          <div
            className="scroll-container w-100 m-0 p-0 bg-"
            style={{ height: "309px" }}
          >
            {search ? (
              <>
                {filterData.length > 0 ? (
                  filterData.map((val,ind) => (
                    <div
                      key={val.id}
                      className="w-100 d-flex bg- align-items-center justify-content-between"
                      style={{ height: "60px", padding: "8px 16px" }}
                    >
                      <div className="d-flex gap-2 align-items-center">
                        <div
                          style={{
                            width: "54px",
                            height: "54px",
                            borderRadius: "50%",
                          }}
                          className="DALJU bg- cr"
                          onClick={() => handlenavigate(val.userId)}
                        >
                          <img
                            src={val.proimg}
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "50%",
                            }}
                            alt="Pro_img"
                          />
                        </div>
                        <span className="d-flex flex-column ">
                          <div className="d-flex gap-1 align-items-center">
                            <span
                              style={{
                                fontWeight: "600",
                                fontSize: "14px",
                                color: "#000000",
                              }}
                            >
                              {val.username}
                            </span>
                          </div>
                          <span style={{ fontWeight: "400", fontSize: "14px" }}>
                            {val.fullname}
                          </span>
                        </span>
                      </div>
                      <button
                      onClick={() => handleFollowToggle(val.userId,ind)}
                    
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        borderRadius: "8px",
                        background: admin
                          ? "#dbdbdb"
                          :buttonTextStates[val.userId] === "Unfollow"
                          ? "#dbdbdb"
                          :buttonTextStates[val.userId] === "Follow"
                          ? "#0095f6"
                          : adminIds.includes(val?.userId)
                          ? "#dbdbdb"
                          : "#0095f6",
                        height: "31px",
                        padding: "7px 16px",
                        border: "none",
                      }}
                      className={` mybtn ${
                        admin
                          ? remove === "Removed"
                            ? "text-muted DALJU cr"
                            : "text-dark DALJU cr"
                          :buttonTextStates[val.userId] === "Unfollow"
                          ? "text-dark DALJU cr"
                          :buttonTextStates[val.userId] === "Follow"
                          ? "text-white DALJU cr"
                          : adminIds.includes(val?.userId)
                          ? "text-dark DALJU cr"
                          : "text-white DALJU cr"
                      }
                       ${val.userId === user.uid ? "d-none" : ""}`}
                    >
                      {admin
                        ? allshow === "followerbox"
                          ?buttonTextStates[val.userId] === "Follow"
                            ? "Removed"
                            :buttonTextStates[val.userId] === "Unfollow"
                            ? "Remove"
                            : adminIds.includes(val?.userId)
                            ? "Remove"
                            : "Removed"
                          :buttonTextStates[val.userId] === "Follow"
                          ? "Follow"
                          :buttonTextStates[val.userId] === "Unfollow"
                          ? "Following"
                          : adminIds.includes(val?.userId)
                          ? "Following"
                          : "Follow"
                        :buttonTextStates[val.userId]
                        ?buttonTextStates[val.userId]
                        : adminIds.includes(val?.userId)
                        ? "Unfollow"
                        : "Follow"}
                    </button>                    </div>
                  ))
                ) : (
                  <div className="w-100 h-100 DALJU">
                    <span
                      style={{ fontSize: "14px", color: "#737373" }}
                      className="text-center"
                    >
                      No result found.
                    </span>
                  </div>
                )}
              </>
            ) : loading ? (
              <div className="w-100 h-100 DALJU">
                <Loader />
              </div>
            ) : data?.length > 0 ? (
              data.map((val,ind) => {
                return (
                  <div
                    key={val.userId}
                    className="w-100 d-flex bg- align-items-center justify-content-between"
                    style={{ height: "60px", padding: "8px 16px" }}
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <div
                        style={{
                          width: "54px",
                          height: "54px",
                          borderRadius: "50%",
                        }}
                        className="DALJU bg- cr"
                        onClick={() => handlenavigate(val.userId)}
                      >
                        <img
                          src={val.proimg || img}
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                          }}
                          alt="Pro_img"
                        />
                      </div>
                      <span className="d-flex flex-column ">
                        <div className="d-flex gap-1 align-items-center">
                          <span
                            style={{
                              fontWeight: "600",
                              fontSize: "14px",
                              color: "#000000",
                            }}
                          >
                            {val.username}
                          </span>
                        </div>
                        <span style={{ fontWeight: "400", fontSize: "14px" }}>
                          {val.fullname}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleFollowToggle(val.userId, ind)}
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        borderRadius: "8px",
                        background: admin && allshow==="followingbox" && buttonTextStates[val.userId]==="Follow"?"#0095f6": admin? "#dbdbdb":""
                          ? "#dbdbdb"
                          :buttonTextStates[val.userId] === "Unfollow"
                          ? "#dbdbdb"
                          :buttonTextStates[val.userId] === "Follow"
                          ? "#0095f6"
                          : adminIds.includes(val?.userId)
                          ? "#dbdbdb"
                          : "#0095f6",
                        height: "31px",
                        padding: "7px 16px",
                        border: "none",
                      }}
                      className={`as${ind} mybtn ${
                        admin
                          ? admin && allshow==="followingbox" && buttonTextStates[val.userId]==="Follow"?"text-white": 
                          remove === "Removed"
                            ? "text-muted DALJU cr"
                            : "text-dark DALJU cr"
                          :buttonTextStates[val.userId] === "Unfollow"
                          ? "text-dark DALJU cr"
                          :buttonTextStates[val.userId] === "Follow"
                          ? "text-white DALJU cr"
                          : adminIds.includes(val?.userId)
                          ? "text-dark DALJU cr"
                          : "text-white DALJU cr"
                      }
                       ${val.userId === user.uid ? "d-none" : ""}`}
                    >
                      {admin
                        ? allshow === "followerbox"
                          ?buttonTextStates[val.userId] === "Follow"
                            ? "Removed"
                            :buttonTextStates[val.userId] === "Unfollow"
                            ? "Remove"
                            : adminIds.includes(val?.userId)
                            ? "Remove"
                            : "Removed"
                          :buttonTextStates[val.userId] === "Follow"
                          ? "Follow"
                          :buttonTextStates[val.userId] === "Unfollow"
                          ? "Following"
                          : adminIds.includes(val?.userId)
                          ? "Following"
                          : "Follow"
                        :buttonTextStates[val.userId]
                        ?buttonTextStates[val.userId]
                        : adminIds.includes(val?.userId)
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                  </div>
                );
              })
            ) : (
              <div
                className="DALJU"
                style={{ fontSize: "17px", fontWeight: "600" }}
              >
                No Following Users
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const Cross = () => (
  <svg
    aria-label="Close"
    className="x1lliihq x1n2onr6 x5n08af"
    fill="currentColor"
    height="18"
    role="img"
    viewBox="0 0 24 24"
    width="18"
  >
    <title>Close</title>
    <polyline
      fill="none"
      points="20.643 3.357 12 12 3.353 20.647"
      stroke="currentColor"
      strokeLinecap="round"
      stroke-linejoin="round"
      stroke-width="3"
    ></polyline>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      x1="20.649"
      x2="3.354"
      y1="20.649"
      y2="3.354"
    ></line>
  </svg>
);