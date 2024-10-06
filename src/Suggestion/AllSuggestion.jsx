import React from 'react';
const AllSuggestion = () => {
  const users = [
    { username: 'asha_d3280', suggestedBy: 'Suggested for you' },
    { username: '1wi_ews', suggestedBy: 'Suggested for you' },
    { username: '1711ladotiwari', suggestedBy: 'Suggested for you' },
    { username: 'iphone6edit', suggestedBy: 'Suggested for you' },
    { username: 'sakshamkumar413', suggestedBy: 'Followed by sarthakarya56' },
    { username: 'moni32062', suggestedBy: 'Suggested for you' },
    { username: 'nainasaini8914', suggestedBy: 'Suggested for you' },
    { username: 'naveen36735', suggestedBy: 'Suggested for you' },
    { username: 'mdakramansari822', suggestedBy: 'Suggested for you' },
    { username: 'naveen.cop', suggestedBy: 'Suggested for you' },
  ];

  return (
    
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '60px' }}>
      <h5 style={{fontWeight:"600",fontSize:"16px", color:"black" }}>Suggested</h5>
      {users.map((user, index) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-between"
          style={{
            padding: '8px 0',
            borderBottom: '1px solid #ddd',
          }}
        >
          <div className="d-flex align-items-center" style={{height:"52px"}}>
            <div
              className="rounded-circle bg-secondary"
              style={{
                width: '43px',
                height: '43px',
                backgroundColor: '#f0f0f0',
              }}
            >
              {/* Placeholder for profile picture */}
            </div>
            <div className="ms-3">
              <p className="m-0" style={{ fontSize: '14px', fontWeight: '600' }}>{user.username}</p>
              <p className="m-0" style={{ fontSize: '14px', fontWeight: '400',color:"rgb(115, 115, 115)" }}>Raj gahlot</p>

              <p className="m-0" style={{ fontSize: '12px',fontWeight:"400",color:"rgb(115, 115, 115)" }}>{user.suggestedBy}</p>
            </div>
          </div>
          <button className="btn text-white " style={{backgroundColor:"rgb(0, 149, 246)", fontSize: '14px',fontWeight:"600",height:"32px",width:"81px" }}>
            Follow
          </button>
        </div>
      ))}
    </div>
   
  );
};

export default AllSuggestion;
