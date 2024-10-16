import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import avtar from '../Imgs/avtar.jpeg';
import { useFirebase } from '../Firebase';

const Suggestion = () => {
  const [user, setUser] = useState(null); // Logged-in user state
  const [suggestedUsers, setSuggestedUsers] = useState([]); // Suggested users
  const firebase = useFirebase();
  const { getAllUser } = firebase;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firebase.userdata; // Ensure this is resolving correctly
        console.log("Fetched user data: ", data); // Debugging
        if (data) {
          setUser(data);
          const filteredUsers = getAllUser.filter(u => u.id !== data?.id); // Filter out the logged-in user
          const shuffledUsers = filteredUsers.sort(() => 0.5 - Math.random()); // Shuffle suggested users
          const randomFiveUsers = shuffledUsers.slice(0, 6); // Get 5 users
          setSuggestedUsers(randomFiveUsers);
        } else {
          console.log("User data is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching userdata:", error);
      }
    };

    fetchData();
  }, [firebase]);

  const handleFollow = useCallback(async (suggestedUserId, isFollowing, index) => {
    try {
      if (isFollowing) {
        await firebase.unfollowuser(suggestedUserId);
      } else {
        await firebase.followuser(suggestedUserId);
      }

      setUser(prevUser => ({
        ...prevUser,
        followings: isFollowing
          ? prevUser.followings.filter(id => id !== suggestedUserId)
          : [...prevUser.followings, suggestedUserId],
      }));

      setSuggestedUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        updatedUsers[index].isFollowing = !isFollowing; // Toggle follow status locally
        return updatedUsers;
      });
    } catch (error) {
      console.error("Error in following/unfollowing user:", error);
    }
  }, [firebase]);

  return (
    <>
      {user ? (
        <div className="suggestions">
          {/* Logged-in user's profile */}
          <div className="d-flex">
            <Link to={`profile/${user.userId}`} className="text-decoration-none text-dark">
              <img className="rounded-circle" style={{ height: "44px", width: "44px" }} src={user?.proimg} alt="" />
            </Link>
            <div className="naming">
              <Link to={`profile/${user.userId}`} className="text-decoration-none text-dark">
                <div className="names d-flex flex-column" style={{ marginLeft: "5px" }}>
                  <div style={{ fontSize: "14px" }}>{user?.username}</div>
                  <div className="fw-light light-color" style={{ fontSize: "12px" }}>{user?.fullname}</div>
                </div>
              </Link>
              <div className="text-primary me-4">Switch</div>
            </div>
          </div>

          {/* Suggested users */}
          <div className="d-flex mt-3 align-items-center justify-content-between">
            <div className="light-color" style={{ fontSize: "14.5px" }}>Suggested for you</div>
            <div className="me-4" onClick={()=>navigate('/insta/explore')} style={{ fontSize: "14px", cursor:"pointer" }}>See all</div>
          </div>

          <div className="d-flex flex-column">
            {suggestedUsers.map((val, ind) => (
              <div key={ind} className="d-flex mt-3">
                <img
                  onClick={() => navigate(`/insta/profile/${val.userId}`)}
                  className="rounded-circle"
                  style={{ height: "44px", width: "44px" }}
                  src={val?.proimg || avtar}
                  alt=""
                />
                <div className="naming">
                  <div className="names d-flex flex-column" style={{ marginLeft: "5px" }}>
                    <div style={{ fontSize: "14px", fontWeight: "600" }}>{val?.username}</div>
                    <div className="fw-light light-color" style={{ fontSize: "12px", fontWeight: "400" }}>{val.fullname}</div>
                  </div>
                  <div
                    className="text-primary me-4"
                    style={{ fontSize: "13px" }}
                    onClick={() => handleFollow(val.userId, user?.followings?.includes(val.userId), ind)}
                  >
                    {user?.followings?.includes(val.userId) ? "Unfollow" : "Follow"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="light-color2 mt-4" style={{ fontSize: '11px' }}>
            About Help Press API Jobs Privacy Terms Locations Language Meta Verified
          </p>
          <p className="light-color2 mt-2" style={{ fontSize: '11px' }}>
            © 2024 INSTAGRAM FROM META
          </p>
        </div>
      ) : (
        <div>Fetching user data...</div>
      )}
    </>
  );
};

export default Suggestion;
