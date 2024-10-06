// import React, { useEffect, useState } from "react";
// import car from './Imgs/car.jpeg'
// import { peopleImgs } from "./SuggestionData";
import { Link } from "react-router-dom";
import avtar from '../Imgs/avtar.jpeg'
import { useEffect, useState } from "react";
import { useFirebase } from '../Firebase';
const Suggestion = () => {
  const [showHello, setShowHello] = useState(true);
  const [user, setUser] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const firebase = useFirebase();
  const { getAllUser } = firebase;
  // const [followstate,setfollowstate]=useState("Follow")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firebase.userdata;
        setUser(data);
        // Step 1: Filter out the logged-in user from the suggestion pool
        const filteredUsers = getAllUser.filter(u => u.id !== data?.id);

        // Step 2: Shuffle the list of filtered users
        let shuffledUsers = filteredUsers.sort(() => 0.5 - Math.random());

        // Step 3: Always pick exactly 5 users. If fewer than 5 users are available, take the first 5 after filtering
        let randomFiveUsers = shuffledUsers.slice(0, 6);

        // If we still have less than 5 users, repeat from the beginning of the shuffled list
        while (randomFiveUsers.length < 6 && shuffledUsers.length > 0) {
          randomFiveUsers.push(shuffledUsers[randomFiveUsers.length % shuffledUsers.length]);
        }

        setSuggestedUsers(randomFiveUsers);
      } catch (error) {
        console.error("Error fetching userdata:", error);
      }
    };

    fetchData();
  }, [firebase.userdata, getAllUser]);

  const handleClick = () => {
    setShowHello(!showHello);
  };
  // const handleFollow=async (id)=>{
  //   try {
  //     if (followstate === "Follow") {
  //       await firebase.followuser(id); // Perform follow action
  //       setfollowstate("Unfollow"); // Change the button to "Unfollow"
  //     } else {
  //       await firebase.unfollowuser(id); // Optionally, perform unfollow action if needed
  //       setfollowstate("Follow"); // Change the button to "Follow"
  //     }
  //   } catch (error) {
  //     console.error("Error in following/unfollowing user:", error);
  //   }
  // }
  return (
   <> {user? (<div 
      className="suggestions"  
    >
  <div className="d-flex"><Link to={`profile/${user.userId}`} className="text-decoration-none text-dark"><img className="rounded-circle" style={{height:"44px",width:"44px"}} src={user?.proimg} alt="" /></Link>
      <div className="naming">
      <Link to={`profile/${user.userId}`} className="text-decoration-none text-dark"> <div className="names d-flex flex-column " style={{marginLeft:"5px"}}><div style={{fontSize:"14px"}}>{user?.username}</div>
        <div className="fw-light light-color" style={{fontSize:"12px"}}>{user?.fullname}</div></div></Link>
        <div className="text-primary me-4" onClick={handleClick}>Switch</div>
      </div></div>    
      <div className="d-flex mt-3 align-items-center justify-content-between"><div className="light-color" style={{fontSize:"14.5px"}}>Suggested for you</div><div className="me-4" style={{fontSize:"14px"}}>See all</div></div>
    
      <div className="d-flex flex-column">
      {suggestedUsers.map((val,ind)=>{
        if(val.userId=== user.userId){
          return null;
        }
        return(  <Link className="text-decoration-none text-reset" to={`profile/${val.userId}` }  key={ind}><div className="d-flex mt-3" >
         <img className="rounded-circle" style={{height:"44px",width:"44px"}} src={val?.proimg|| avtar} alt="" />
          <div className="naming">
        <div className="names d-flex flex-column " style={{marginLeft:"5px"}}><div style={{fontSize:"14px", fontWeight:"600"}}>{val?.username}</div>
        <div className="fw-light light-color" style={{fontSize:"12px", fontWeight:"400"}}>{val.fullname}</div></div>
        <div className="text-primary me-4" style={{fontSize:"13px"}} 
        >{user?.followings?.includes(val.userId)?"Unfollow":"Follow"}</div>
      </div></div></Link>
        )
      })}</div>  
      <p className="light-color2 mt-4" style={{fontSize:'11px'}}>About
Help
Press
API
Jobs
Privacy
Terms
Locations
Language
Meta Verified</p>
<p className="light-color2 mt-2" style={{fontSize:'11px'}}>© 2024 INSTAGRAM FROM META</p>
    </div>):("Fetching user data...")}</>
  );
};

export default Suggestion;
