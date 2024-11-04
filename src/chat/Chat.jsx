// ChatPage.js
import React, { useContext, useEffect, useState,useRef} from "react";
// import { useFirebase } from '../Firebase';
import "./chat.css";
import {set ,push,onValue, ref, remove,child, get} from 'firebase/database';
 
import { realdatabase } from "../Firebase";
import { DataContext } from "../Context/DataContext";
import {
  Pencil,
  Listner,
  
  Like,
  Image,
  Conversation,
  Call,
  VideoCall,
  Share,
  Copy,
  Report
} from "../AllIconsSvgs/IconsSvg";
// import { useParams } from "react-router-dom";
import { useFirebase } from "../Firebase";
import ChatLayout from "../Layout/ChatLayout";
import { useMediaQuery } from "react-responsive";
import { TfiShareAlt } from "react-icons/tfi";
const Chat = () => {
  const firebase = useFirebase();
  const { allUsers } = useContext(DataContext);
//   const { userId } = useParams();
const [userId,setuserId]=useState(null)
  const [userdata, setuserdata] = useState();
  const [inputMsg, setinputMsg] = useState(null);
  const [msg, setmsg] = useState(false);
  const [receiverId,setReceiverId]= useState(null)
  const [message, setMessages] = useState([]);
  const [textheight,settextheight]=useState('40')
const [textwidth,settextwidth]=useState()
const {msgUser1}= useContext(DataContext)
const sortedMessages = message.sort((a, b) => a.timestamp - b.timestamp);

  const [msgUser, setmsgUser] = useState({
    username: "",
    proimg: "",
  });
  useEffect(()=>{
if(msgUser1 ){
  handleUserMsgBox(msgUser1.username, msgUser1.proimg, msgUser1.userId)
}
  },[msgUser1])
  useEffect(()=>{
    const getdata=async()=>{
      const userdata= await firebase.userdata;
      if(userdata && userdata.userId){
        setuserId(userdata.userId)
      }
    }
    getdata()
    },[firebase])
  const isNames = useMediaQuery({ query: "(max-width: 900px)" });
  const isSmall = useMediaQuery({
    query: "(min-width: 767px) and (max-width: 900px)",
  });
  const isVerySmall = useMediaQuery({ query: "(max-width: 767px)" });
  const isMedium = useMediaQuery({
    query: "(min-width: 900px) and (max-width: 1200px)",
  });
  // State for message width
  const [msgWidth, setMsgWidth] = useState("calc(100% - 640px)"); // Default width

  useEffect(() => {
    if (isVerySmall) {
      setMsgWidth("calc(100% - 122px)");
    } else if (isSmall) {
      setMsgWidth("calc(100% - 180px)");
    } else if (isMedium) {
      setMsgWidth("calc(100% - 452px)");
    } else {
      setMsgWidth("calc(100% - 640px)"); // Default for larger screens
    }
  }, [isVerySmall, isSmall, isMedium]);
  useEffect(() => {
    if(userId){
    const getUser = async () => {
      const userdata = await firebase.getUserData(userId);
      setuserdata(userdata);
    };
    getUser();}
  }, [userId]);
  const handleUserMsgBox = (username, proimg,userId) => {
    setmsgUser({ username, proimg });
    setmsg(true);
    setReceiverId(userId)
  };
  function generateRandomLetters(length) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Letters only
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters[randomIndex];
    }
  
    return result;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMsg.trim()) {
      const messageId = generateRandomLetters(7);
      storeUserMessages(messageId);
      storeReceiverMessages(messageId);
      setinputMsg(""); // Clear input after sending
    }
  };

  // Function to store messages in Realtime Database
      function storeUserMessages(messageId) {
    const reference = ref(realdatabase, `${userId}/${receiverId}`); // Define your data path
    const message = {
      text: inputMsg,
      sender:"self",
      timestamp: Date.now(),
      messageId: messageId
    };

    // Use push to generate a unique key for each message
    const newMessageRef = push(reference);
    set(newMessageRef, message)
      .then(() => {
        console.log("Sent");
      })
      .catch((error) => {
        console.error("Error writing user message: ", error);
      });
  }
      function storeReceiverMessages(messageId) {
    const reference = ref(realdatabase, `${receiverId}/${userId}`); // Define your data path
    const message = {
      text: inputMsg,
      sender: "other",
      timestamp: Date.now(),
      messageId: messageId
    };

    // Use push to generate a unique key for each message
    const newMessageRef = push(reference);
    set(newMessageRef, message)
      .then(() => {
        console.log("Received");
      })
      .catch((error) => {
        console.error("Error writing receiver message: ", error);
      });
  }

const fetchMessages = () => {
    const messagesRef = ref(realdatabase, `${userId}/${receiverId}`); // Path to user's messages

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = [];

      // Push each message along with its key into the array
      for (let key in data) {
        messagesArray.push(data[key]);
      }

      // Sort messages by the 'timestamp' property
      messagesArray.sort((a, b) => a.timestamp - b.timestamp);

      setMessages(messagesArray); // Update state with ordered messages
    });
};

  useEffect(() => {
    if(userId){
    fetchMessages(); // Fetch messages when the component mounts
  }}, [receiverId]);

  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Call scrollToBottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [message,inputMsg]);
  const [visibleIndex, setVisibleIndex] = useState(null);
  // const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (index) => {
    // Toggle the visibility for the specific message
    setVisibleIndex(visibleIndex === index ? null : index);
  };
  const handleOptionClick = (option) => {
    console.log(`${option} clicked!`);
    // setIsVisible(true); // Option click hides the box
  };
  const black= 'black'



  useEffect(()=>{
    const elements = document.getElementsByClassName('msg-container');
  
    if (elements.length > 0) {
      const width = elements[0].offsetWidth;
      console.log(width) // Get width of the first element
      settextwidth(width);
    }
  },[visibleIndex])
  function deleteMessage(messageId) {
    setVisibleIndex(null)
    const userMessageRef = ref(realdatabase, `${userId}/${receiverId}`);
    const receiverMessageRef = ref(realdatabase, `${receiverId}/${userId}`);
    get(userMessageRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          if (message.messageId === messageId) {
            const messageRef = child(userMessageRef, childSnapshot.key);
            remove(messageRef)
              .then(() => {
                console.log("Message deleted for user");
              })
              .catch((error) => {
                console.error("Error deleting user message: ", error);
              });
          }
        });
      } else {
        console.log("No messages found for user");
      }
    }).catch((error) => {
      console.error("Error fetching user messages: ", error);
    });
  
    // Manually fetch and filter the messages for the receiver
    get(receiverMessageRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          if (message.messageId === messageId) {
            const messageRef = child(receiverMessageRef, childSnapshot.key);
            remove(messageRef)
              .then(() => {
                console.log("Message deleted for receiver");
              })
              .catch((error) => {
                console.error("Error deleting receiver message: ", error);
              });
          }
        });
      } else {
        console.log("No messages found for receiver");
      }
    }).catch((error) => {
      console.error("Error fetching receiver messages: ", error);
    });
  }
  

  return (
    <ChatLayout>
      <div className="d-flex vh-100">
        {/* Sidebar */}
        <div
          className="position-relative 90vh"
          style={{ width: isNames ? "122px" : "396px" }}
        >
          <div
            className={`${isNames ? "p-0" : "p-3"} position-fixed`}
            style={{ width: isNames ? "122px" : "396px" }}
          >
            <div
              className={`${
                isNames ? "justify-content-center" : "justify-content-between"
              } d-flex align-items-center  pt-1 mb-2`}
              style={{ width: isNames ? "103px" : "" }}
            >
              {userdata && (
                <h5 className={` fs20 fw700 ${isNames ? "d-none" : ""} `}>
                  {userdata.fullname}
                </h5>
              )}
              <h3 className={`${isNames ? "text-center pb-2" : ""}`}>
                <Pencil />
              </h3>
            </div>
            <div
              style={{
                overflowY: "scroll",
                height: "90vh",
                overflowX: "hidden",
              }}
            >
              {userdata && (
                <>
                  {" "}
                  <div
                    className={` ${
                      isNames
                        ? "mb-2 d-flex align-items-center justify-content-center"
                        : ""
                    }`}
                    style={{ width: isNames ? "103px" : "74px" }}
                  >
                    <img
                      className="rounded-circle mb-0"
                      src={userdata.proimg}
                      alt=""
                      style={{
                        height: "74px",
                        width: "74px",
                        color: "#737373",
                      }}
                    />
                    <p
                      className={`text-center text-muted fw400 fs12 ${
                        isNames ? "d-none" : ""
                      }`}
                    >
                      Your Note
                    </p>
                  </div>
                  <div
                    className={`${
                      isNames
                        ? "d-none"
                        : "d-flex justify-content-between d-flex align-items-center"
                    } not   m-2`}
                  >
                    <div className="fw700 fs16">Message</div>
                    <div className="fw-norman me-1 not text-muted fs14 fw600">
                      Request
                    </div>
                  </div>
                </>
              )}
              <div>
                {allUsers && (
                  <div>
                    {allUsers.map((val, ind) => {
                        if(val.userId===userId){
                            return null;
                        }
                      return (
                        <div
                          onClick={() =>
                            handleUserMsgBox(val.username, val.proimg,val.userId)
                          }
                          className={`d-flex align-items-center mb-3 ${
                            isNames ? "justify-content-center" : ""
                          } `}
                          key={ind}
                          style={{ width: isNames ? "103px" : "" ,cursor:'pointer'}}
                        >
                          <img
                            src={val.proimg}
                            alt="User"
                            className="rounded-circle"
                            style={{ width: "55px", height: "55px" }}
                          />
                          <div className={`ms-3 ${isNames ? "d-none" : ""} `}>
                            <h6 className="mb-0 fw600 fs14">{val.username}</h6>
                            <p
                              className="fs12 fw700"
                              style={{ fontSize: "12px" }}
                            >
                              Aakib sent an attachment.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div style={{ height: "20px" }}></div>
              </div>
            </div>
            {/* Repeat similar blocks for other chats */}
          </div>
        </div>
        {/* Chat Area */}
        <div
          className={`${
            msg ? "d-none" : "d-flex"
          } flex-grow-1 bg-light  justify-content-center align-items-center`}
        >
          <div className="text-center">
            <MsgSvg />
            <h5 className="mt-3 fw400" style={{ fontSize: "20px" }}>
              Your messages
            </h5>
            <p className="text-muted fs14 fw400">
              Send a message to start a chat.
            </p>
            <button className="btn btn-primary fw600 fs14">Send message</button>
          </div>
        </div>
        <div
          className={`${
            msg ? "d-flex" : "d-none"
          } flex-column position-relative `}
          style={{ height: "100vh", width: msgWidth }}
        >
          <div
            className="position-fixed"
            style={{ height: "100vh", width: msgWidth }}
          >
            {/* Chat Header */}
            {msgUser && (
              <div
                className="row p-2   border-bottom align-items-center"
                style={{ height: "75px" }}
              >
                <div className="col-2">
                  <img
                    src={msgUser.proimg}
                    alt="profile"
                    style={{
                      borderRadius: "50%",
                      width: "44px",
                      height: "44px",
                    }}
                  />
                </div>
                <div className="col-7">
                  <h6 className="fs16 fw600" style={{ margin: 0 }}>
                    {msgUser.username}
                  </h6>
                  <span className="fs12 fw600 text-muted">Active 6m ago</span>
                </div>
                <div className="col-3 d-flex ">
                  <div className="ms-3">
                    {" "}
                    <Call />
                  </div>
                  <div className="ms-2">
                    {" "}
                    <VideoCall />
                  </div>
                  <div className="ms-2">
                    {" "}
                    <Conversation />
                  </div>
                </div>
              </div>
            )}
            {/* Chat Body */}
            <div
              className=" p-3"
              style={{ overflowY: "scroll", backgroundColor: "#f9f9f9" , height:"calc(100% - 125px)"}}
            >
              <div className="col">
                {/* Message Received */}
                <div className="d-flex align-items-start mb-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="reel"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#e5e5ea",
                      borderRadius: "20px",
                      padding: "10px",
                      maxWidth: "75%",
                    }}
                  >
                    <span>👍</span>
                  </div>
                </div>

                <div
                  className="d-flex flex-column"
                  style={{ padding: "10px", maxWidth: "600px", margin: "auto",height:"70vh" }}
                >
                  {sortedMessages.map((msg, index) => {
                    // Check if the current message is the first message in a sequence by Vishwas Deol
                    const isFirstVishwasMessage =
                      msg.sender === "other" &&
                      (index === 0 || message[index - 1].sender !== "other");
                      const date = new Date(msg.timestamp);

                      // Define options for formatting the date
                      const options = {
                        weekday: 'short', // Short form of the weekday (e.g., "Wed")
                        hour: '2-digit', // 2-digit hour
                        minute: '2-digit', // 2-digit minute
                        hour12: true, // Use 12-hour clock
                      };
              
                      // Format the date to a string
                      const formattedTime = date.toLocaleString('en-US', options);
              
                    return (
                      <div
                        key={msg.id}
                        style={{
                          width: "100%",
                          alignSelf:
                            msg.sender === "self" ? "flex-end" : "flex-start",
                        }}
                      >
                        {isFirstVishwasMessage && (
                          <div
                            className="fw400 "
                            style={{ fontSize: "12px" ,color:"rgb(115, 115, 115)"}}
                          >
                            {msgUser?.username} replied to you
                          </div>
                        )}
                        <div className={`d-flex smiley-container ${msg.sender==='self'?'align-items-center justify-content-end':''}`}>
                
    {visibleIndex === index  && (
        <div 
          className="options-box position-absolute"
          style={{
            top: textheight < 280 ? `${textheight}px` : `${textheight - 200}px`,
            right: `${textwidth + 110}px`,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            // minWidth: '100px',
            width:"180px",
            padding: '10px',
            position: 'relative', // Position for tooltip arrow
          }}
        >
          <div className="options-header fs11 fw600" style={{color:'rgb(115, 115, 115)',  marginBottom: '5px'}}>
            {formattedTime}
          </div>
          <button
            className="options-item fs13 fw400 d-flex justify-content-between"
            style={{ width: '100%', textAlign: 'left', padding: '5px 10px', border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => handleOptionClick('Forward')}
          >
            Forward <span className="icon"><Share height={16} width={16}/></span>
          </button>
          <button
            className="options-item fs13 fw400 d-flex justify-content-between"
            style={{ width: '100%', textAlign: 'left', padding: '5px 10px', border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => handleOptionClick('Copy')}
          >
            Copy <span className="icon"><Copy fill={black}/></span>
          </button>
          <button onClick={() => deleteMessage(msg.messageId)}
            className="options-item  fs13 fw400 d-flex justify-content-between"
            style={{ width: '100%',color:"rgb(237, 73, 86)", textAlign: 'left', padding: '5px 10px', border: 'none', background: 'none', cursor: 'pointer' }}
            
          >
            {msg.sender==="self"?'Unsend':'Report'} <span className="icon">{msg.sender==="self"?<TfiShareAlt color="#ED4956"/>:<Report />}</span>
          </button>
        </div>
      )}
     
                        <div style={{order:msg.sender === "self" ? "1" : "2",}}
                         className={`${visibleIndex=== index?"d-flex flex-row":'smiley-wrapper'}   mb-2 p-1  align-items-center justify-content-center gap-2 ${msg.sender==="other"?'flex-row-reverse':''} `}>
                          <div onClick={()=>toggleVisibility(index)}><VerticalDot/></div>
                          <div><BackArrow2/></div> 
                          <div><Smile2/></div></div>
                        <div 
                          className={`${visibleIndex === index?"msg-container":''} mb-2 p-1 fs15  fw400 rounded-pill d-felx justify-content-center`}
                          style={{order:msg.sender === "self" ? "2" : "1",
                            backgroundColor:
                              msg.sender === "self" ? "#3399ff" : "rgb(239, 239, 239)",
                            color: msg.sender === "self" ? "white" : "black",
                            textAlign: msg.sender === "self" ? "right" : "left",
                            height:"32px"
                          }} 
                        >
                          
                          {msg.text}
                        </div></div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Chat Footer */}
            <form onSubmit={handleSubmit}>
              <div
                className="row m-2 border d-flex align-items-center justiyf-content-center position-fixed "
                style={{
                  width: `calc(${msgWidth} - 20px)`,
                  bottom: "0",
                  borderRadius: "50px",
                  border: "1px solid black",
                  height: "44px",
                }}
              >
                <div className="emoji-btn col-1" role="button" tabindex="0">
                  <svg
                    aria-label="Choose an emoji"
                    fill="black"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Choose an emoji</title>
                    <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                  </svg>
                </div>
                <div className={`inp ${inputMsg ? "col-10" : "col-8"}`}>
                  <input
                    type="text"
                    onChange={(e) => setinputMsg(e.target.value,)}
                    value={inputMsg} 
                    className="w-100 border-0"
                    placeholder="Message..."
                    border="none"
                    outline="none"
                    required
                  />
                </div>

                {inputMsg ? (
                  <div className="col-1 ">
                    {" "}
                    <button
                      type="submit"
                      style={{ outline: "none", border: "none" }}
                      className="fs14 fw600 text-primary d-flex justify-content-end ml-auto"
                    >
                      Send
                    </button>{" "}
                  </div>
                ) : (
                  <div className="col-3 text-end d-flex gap-2">
                    <Listner />
                    <Image />
                    <Like />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;
const MsgSvg = () => (
  <svg
    aria-label=""
    class="x1lliihq x1n2onr6 x5n08af"
    fill="currentColor"
    height="96"
    role="img"
    viewBox="0 0 96 96"
    width="96"
  >
    <title></title>
    <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
  </svg>
);
const Smile2=()=>(
  <svg aria-label="React" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>React</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
)
const VerticalDot=()=>(
  <svg aria-label="More" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>More</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="6" r="1.5"></circle><circle cx="12" cy="18" r="1.5"></circle></svg>
)
const BackArrow2 =()=>(
  <svg aria-label="Reply" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Reply</title><path d="M14 8.999H4.413l5.294-5.292a1 1 0 1 0-1.414-1.414l-7 6.998c-.014.014-.019.033-.032.048A.933.933 0 0 0 1 9.998V10c0 .027.013.05.015.076a.907.907 0 0 0 .282.634l6.996 6.998a1 1 0 0 0 1.414-1.414L4.415 11H14a7.008 7.008 0 0 1 7 7v3.006a1 1 0 0 0 2 0V18a9.01 9.01 0 0 0-9-9Z"></path></svg>
)


