import React, { useEffect, useState } from "react";
import car from './Imgs/car.jpeg'
// import { peopleImgs } from "./SuggestionData";
import { Link } from "react-router-dom";
import avtar from './Imgs/avtar.jpeg'
const Suggestion = () => {
  const [data,setdata]= useState([])
const getdata=async()=>{
  try {
 const res= await fetch(`http://localhost:5000/insta/users`,{
  method: "GET",
  headers:{ "Content-Type": "application/json"},
  body: JSON.stringify()
 }) 
 const jsondata= await res.json()
 setdata(jsondata);
 console.log("hello",data,jsondata)
  } catch (error) {
    console.log("failed to load the data")
  }
} 
useEffect(()=>{
  getdata();
},[])
  return (
    <div 
      className="suggestions"  
    >
      <div className="d-flex"><Link to="/user/profile" className="text-decoration-none text-dark"><img className="rounded-circle" style={{height:"44px",width:"44px"}} src={car} alt="" /></Link>
      <div className="naming">
      <Link to="/client/profile/" className="text-decoration-none text-dark"> <div className="names d-flex flex-column " style={{marginLeft:"5px"}}><div style={{fontSize:"14px"}}>raj__gahlot</div>
        <div className="fw-light light-color" style={{fontSize:"12px"}}>Raj_Gahlot</div></div></Link>
        <div className="text-primary me-4" >Switch</div>
      </div></div>
      <div className="d-flex mt-3 align-items-center justify-content-between"><div className="light-color" style={{fontSize:"14.5px"}}>Suggested for you</div><div className="me-4" style={{fontSize:"14px"}}>See all</div></div>
    
      <div className="d-flex flex-column">
      {data.map((val,ind)=>{
        return(<Link className="text-decoration-none text-reset" to={`user/profile/${val.details._id}`} key={ind}>  <div className="d-flex mt-3" >
          <img className="rounded-circle" style={{height:"44px",width:"44px"}} src={val.details.img || avtar} alt="" />
          <div className="naming">
        <div className="names d-flex flex-column " style={{marginLeft:"5px"}}><div style={{fontSize:"14px"}}>{val.details.instaId}</div>
        <div className="fw-light light-color" style={{fontSize:"12px"}}>Suggested for you</div></div>
        <div className="text-primary me-4" style={{fontSize:"13px"}}>Follow</div>
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
    </div>
  );
};

export default Suggestion;
