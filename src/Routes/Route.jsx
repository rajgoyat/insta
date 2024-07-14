import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import {Insta} from '../Insta'
import {Login} from '../Login'
import Register from '../Register'
import Message from '../Message'
import {Profile} from '../Profile'
const PathTo = () => {
  
  return (
  
    <Routes>
        <Route path="/insta-app" element={<Insta/>}  />
        <Route path="/insta-app/login" element={<Login/>}  />
        <Route path="/insta-app/register" element={<Register/>}  />
        <Route path="/insta-app/messages" element={<Message/>}  />
        <Route path="/insta-app/profile" element={<Profile/>}  />    
    </Routes>
    
  )
}

export default PathTo