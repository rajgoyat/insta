import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import { useFirebase } from '../Firebase';

const AllSuggestion = () => {
  // const users = [
  //   { username: 'asha_d3280', suggestedBy: 'Suggested for you' },
  //   { username: '1wi_ews', suggestedBy: 'Suggested for you' },
  //   { username: '1711ladotiwari', suggestedBy: 'Suggested for you' },
  //   { username: 'iphone6edit', suggestedBy: 'Suggested for you' },
  //   { username: 'sakshamkumar413', suggestedBy: 'Followed by sarthakarya56' },
  //   { username: 'moni32062', suggestedBy: 'Suggested for you' },
  //   { username: 'nainasaini8914', suggestedBy: 'Suggested for you' },
  //   { username: 'naveen36735', suggestedBy: 'Suggested for you' },
  //   { username: 'mdakramansari822', suggestedBy: 'Suggested for you' },
  //   { username: 'naveen.cop', suggestedBy: 'Suggested for you' },
  // ];

  const [followStates, setFollowStates] = useState({}); // To track follow state for each user
  const firebase = useFirebase();
  const { allUsers, user } = useContext(DataContext);

  // Function to handle follow/unfollow for each user
  const handleFollow = async (userId) => {
    try {
      const currentFollowState = followStates[userId] || "Follow";
      if (currentFollowState === "Follow") {
        await firebase.followuser(userId); // Perform follow action
        setFollowStates(prev => ({ ...prev, [userId]: "Unfollow" })); // Update state to "Unfollow"
      } else {
        await firebase.unfollowuser(userId); // Perform unfollow action
        setFollowStates(prev => ({ ...prev, [userId]: "Follow" })); // Update state to "Follow"
      }
    } catch (error) {
      console.error("Error in following/unfollowing user:", error);
    }
  };

  // Use effect to initialize the follow state for all users
  useEffect(() => {
    if (allUsers) {
      const initialFollowStates = {};
      allUsers.forEach(u => {
        initialFollowStates[u.userId] = user?.followings?.includes(u.userId) ? "Unfollow" : "Follow";
      });
      setFollowStates(initialFollowStates);
    }
  }, [allUsers, user]);

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '60px' }}>
      <h5 style={{ fontWeight: "600", fontSize: "16px", color: "black" }}>Suggested</h5>

      {allUsers && (
        <>
          {allUsers.map((suggestedUser, index) => {
          
          
            return (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between"
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <div className="d-flex align-items-center" style={{ height: "52px" }}>
                  <img
                    src={suggestedUser.proimg}
                    className="rounded-circle bg-secondary"
                    style={{
                      width: '43px',
                      height: '43px',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                  <div className="ms-3">
                    <p className="m-0" style={{ fontSize: '14px', fontWeight: '600' }}>{suggestedUser.username}</p>
                    <p className="m-0" style={{ fontSize: '14px', fontWeight: '400', color: "rgb(115, 115, 115)" }}>{suggestedUser.fullname}</p>
                    <p className="m-0" style={{ fontSize: '12px', fontWeight: "400", color: "rgb(115, 115, 115)" }}>Followed by sarthakarya56</p>
                  </div>
                </div>
                <button
                  className="btn text-white"
                  onClick={() => handleFollow(suggestedUser.userId)} // Call handleFollow with specific userId
                  style={{
                    backgroundColor: "rgb(0, 149, 246)",
                    fontSize: '14px',
                    fontWeight: "600",
                    height: "32px",
                    width: "81px"
                  }}
                >
                  {followStates[suggestedUser.userId] || "Follow"} {/* Dynamically show follow/unfollow */}
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AllSuggestion;
