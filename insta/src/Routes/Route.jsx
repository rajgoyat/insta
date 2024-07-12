import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Insta} from '../Insta'
import {Login} from '../Login'
import Register from '../Register'
import Message from '../Message'
import {Profile} from '../Profile'
const PathTo = () => {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/client" element={<Insta/>}  />
        <Route path="/client/login" element={<Login/>}  />
        <Route path="/client/register" element={<Register/>}  />
        <Route path="/client/messages" element={<Message/>}  />
        <Route path="/client/profile" element={<Profile/>}  />    
    </Routes>
    </BrowserRouter>
  )
}

export default PathTo