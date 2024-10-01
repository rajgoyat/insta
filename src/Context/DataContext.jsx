import React, { createContext , useEffect, useState} from 'react'


import { useFirebase } from '../Firebase';
export const DataContext= createContext();
const DataProvider = ({ children }) => {
const [user,setuser]= useState()
const [allUsers,setallUsers]= useState(null)
const firebase= useFirebase();
useEffect(()=>{
const getdata=async()=>{
  const userdata= await firebase.userdata;
  setuser(userdata)
}
getdata()
},[firebase,user])
console.log(user)
const [handlecreatePostCloseButton,sethandlecreatePostCloseButton]= useState(false)
const createPostCloseButton=()=>{
    sethandlecreatePostCloseButton(prev=>!prev)
}

useEffect(()=>{
  
  if (user && user.video) {
    
    const getall = async()=>{
      const alluser= await firebase.getAllUser;
      setallUsers(alluser); // Set the 'video' array in the state
    }
  getall();}
},[firebase,user])

    return (
    <DataContext.Provider value={{ createPostCloseButton,handlecreatePostCloseButton,sethandlecreatePostCloseButton,user ,allUsers}}>
    {children}
</DataContext.Provider>
  )
}

export default DataProvider