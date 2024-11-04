import React, { createContext , useEffect, useState} from 'react'


import { useFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
export const DataContext= createContext();
const DataProvider = ({ children }) => {
const [user,setuser]= useState()
const [allUsers,setallUsers]= useState(null)
const firebase= useFirebase();
const [allshow,setallshow]=useState("")
const [msgUser1, setMsgUser1] = useState(null);
const [showwhat,setshowwhat]=useState("post") //for profile.jsx
const [bordertop,setborderTop]=useState(1) //for profile.jsx
const [savedpost, setsavedpost] = useState([]); //for center.jsx  or saved on profilepage

  const navigate= useNavigate()
  const deleteSaved=(src,userId,type)=>{
    setsavedpost(savedpost.filter(post=> !post.link.includes(src))) 
    firebase.deleteSaved(src,userId,type)
  }
  const handleSavedPost=(src,userId,type)=>{
  firebase.saved(src,userId,type);
  setsavedpost(prevSavedPosts => [{link:src,userId:userId,type:type}, ...prevSavedPosts]);
  console.log(savedpost)
  }
  // Function to set the message box data
  const handleUserMsgBox = (username, proimg, userId) => {
    setMsgUser1({ username, proimg, userId });
   navigate('insta/messages')
  };

useEffect(()=>{
const getdata=async()=>{
  const userdata= await firebase.userdata;
  setuser(userdata)
}
getdata()
},[firebase,user])
// console.log(user)
const [handlecreatePostCloseButton,sethandlecreatePostCloseButton]= useState(false)
const createPostCloseButton=()=>{
    sethandlecreatePostCloseButton(prev=>!prev)
}

useEffect(()=>{
  
  if (user) {
    const getall = async()=>{
      const alluser= await firebase.getAllUser;
      setallUsers(alluser); // Set the 'video' array in the state
    }
  getall();}
},[firebase,user])
    return (
    <DataContext.Provider value={{showwhat,setshowwhat,bordertop,setborderTop,savedpost, setsavedpost,handleSavedPost,deleteSaved,
     createPostCloseButton,handlecreatePostCloseButton,
     sethandlecreatePostCloseButton,user ,allUsers,
     handleUserMsgBox, msgUser1,allshow,setallshow}}>
    {children}
</DataContext.Provider>
  )
}

export default DataProvider