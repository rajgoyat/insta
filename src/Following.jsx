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
  const [suggestedUsers, setSuggestedUsers] = useState([]);

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

  // const { getAllUser } = firebase;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firebase.userdata;
        // setUser(data);
        // Step 1: Filter out the logged-in user from the suggestion pool
        const filteredUsers = getAllUser.filter(u => u.id !== data?.id);

        // Step 2: Shuffle the list of filtered users
        let shuffledUsers = filteredUsers.sort(() => 0.5 - Math.random());

        // Step 3: Always pick exactly 5 users. If fewer than 5 users are available, take the first 5 after filtering
        let randomFiveUsers = shuffledUsers.slice(0, 8);

        // If we still have less than 5 users, repeat from the beginning of the shuffled list
        while (randomFiveUsers.length < 8 && shuffledUsers.length > 0) {
          randomFiveUsers.push(shuffledUsers[randomFiveUsers.length % shuffledUsers.length]);
        }

        setSuggestedUsers(randomFiveUsers);
      } catch (error) {
        console.error("Error fetching userdata:", error);
      }
    };

    fetchData();
  }, [firebase.userdata, getAllUser]);


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
      {suggestedUsers?.slice(0, followingInd).map((val, ind) => {
        // if(val.userId=== user.userId){
        //   return null;
        // }
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
                className="text-dark m-0 text-center"
                style={{ fontSize: "13px", height: "30px" }}
              >
                <TruncateText text={val.username} />
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Following;
