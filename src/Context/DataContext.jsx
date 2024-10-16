import React, { createContext , useEffect, useState} from 'react'


import { useFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
export const DataContext= createContext();
const DataProvider = ({ children }) => {
const [user,setuser]= useState()
const [allUsers,setallUsers]= useState(null)
const firebase= useFirebase();
const [sidebarMenu,setSidebarMenu]=useState(false)
const [sidebarMenuSeeting,setSidebarMenuSeeting]= useState(false);
const [allshow,setallshow]=useState("")
const [msgUser1, setMsgUser1] = useState(null);
  const navigate= useNavigate()

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
    <DataContext.Provider value={{sidebarMenu,setSidebarMenu,
     createPostCloseButton,handlecreatePostCloseButton,
     sethandlecreatePostCloseButton,user ,allUsers,
     handleUserMsgBox, msgUser1,allshow,setallshow}}>
    {children}
</DataContext.Provider>
  )
}

export default DataProvider