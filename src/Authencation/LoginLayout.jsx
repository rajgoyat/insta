import React, { useEffect, useState } from 'react'
import screenshot1 from '../Imgs/screenshot1.png'
import screenshot2 from '../Imgs/screenshot2.png'
import screenshot3 from '../Imgs/screenshot3.png'
import Auth from '../Imgs/logo.png'
import screenshot from '../Imgs/screenshot.png'

// useState useEffect
import screenshot4 from '../Imgs/screenshot4.png'
const LoginLayout = ({children}) => {
    const [Moveimg,setMoveimg]=useState(screenshot1);
    const [Indx,setIndx]=useState(0);
    const Imges=[screenshot1,screenshot2,screenshot3,screenshot4];
  
    useEffect(()=>{
      const interval=setInterval(()=>{
        setMoveimg(Imges[Indx]);
        if(Indx===3){setIndx(0)}else{setIndx(Indx+1)}
        // console.log(Indx)
      },3000)
  
  
      return ()=>clearInterval(interval);
    },[Indx]);
  return (
    <div className=''>
    <div
      className="Main_container bg- w-100 d-flex  justify-content-center align-items-evenly"
      style={{ height: "" }}
    >
      <div
        className="Second_main bg- d-flex "
        style={{
          margin: "32px 81.5px 0px",
          width: "",
          height: "",
        }}absolute
      >
        <div className=" col first w-100 position-relative ">
          {/* <img src={Auth} alt="b" className="mt-2" /> */}
          <div className="text-center w-100" style={{}} >

            <img src={screenshot} alt="Move_img" className=""/>

            </div>
        </div>
        {children}      </div>
    </div>

    {/* footer data */}
    <div className="w-100 d-flex flex-column   align-items-center justify-content-center flex-column" style={{}}>
      <div
        className="fotter_data  d-flex align-items-center gap-4 justify-content-center"
        style={{ maxWidth: "1066px", flexWrap:"wrap" }}
      >
        <p  style={{ color: "#737373", fontSize: "12px" }}>Meta</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>About</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Blog</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Jobs</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Help</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Api</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Privacy</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Term</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Locations</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Instagram Lite</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Threads</p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>
          Contact uploading and non-users
        </p>
        <p  style={{ color: "#737373", fontSize: "12px" }}>Meta Verified</p>
      </div>
      <div
        className="fotter_data col mt-3  d-flex align-items-center gap-4 justify-content-center"
        style={{
          maxWidth: "1066px",
          color: "#737373",
          fontSize: "13px",
          marginBottom: "60px",
        }}
      >
        <span>English (UK)</span>
        <span>© 2024 Instagram from Meta</span>
      </div>
    </div>
  </div>

  )
}

export default LoginLayout