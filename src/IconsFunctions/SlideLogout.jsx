import { useContext } from "react";
import { useFirebase } from "../Firebase";
import { useNavigate } from "react-router-dom";
import {CreatePost, LiveVideo, Seeting, YourActivity, Saved, DarkMode, Report} from '../AllIconsSvgs/IconsSvg'
import { DataContext } from "../Context/DataContext";
export const SlideLogout = ()=>{
  const firebase=useFirebase();
  const navigate=useNavigate();
  const{setSidebarMenu,setSidebarMenuSeeting}= useContext(DataContext);
  const handleLogOut= async()=>{
    console.log("hello")
   const logout=  await firebase.logout();
   console.log(logout)
   if(logout){navigate('/insta-app/login');} 
  }
  const handleseetingicon=()=>{
setSidebarMenuSeeting(true)
setSidebarMenu(false)
  }
    return(<div className='slidelogoutIconmain'> <div className=" slidelogoutIcon position-absolute bg-white d-flex flex-column  justify-content-evenly" style={{height:"404px", width:"266px", bottom:"50px",left:"55px", boxShadow:"0 0 10px 2px rgba(43, 41, 41, 0.274)",borderRadius:"20px"}}>
      <div onClick={handleseetingicon} className='d-flex set' style={{margin:"4px",fontSize:"14px",color:"black", padding:"6px"}}><div><Seeting/></div><div className='ms-2'>Seeting</div></div>
      <div className='d-flex set' style={{margin:"4px",fontSize:"14px",color:"black", padding:"6px"}}><div><YourActivity/></div><div className='ms-2'>Your Activity</div></div>
      <div className='d-flex set' style={{margin:"4px",fontSize:"14px",color:"black", padding:"6px"}}><div><Saved/></div><div className='ms-2'>Saved</div></div>
      <div className='d-flex set' style={{margin:"4px",fontSize:"14px",color:"black", padding:"6px"}}><div><DarkMode/></div><div className='ms-2'>Switch Appearance</div></div>
      <div className='d-flex set' style={{margin:"4px",fontSize:"14px",color:"black", padding:"6px"}}><div><Report/></div><div className='ms-2'>Report</div></div>
      <div style={{borderTop:'3px solid rgba(51, 49, 49, 0.151)'}}><div className='set'  style={{margin:"4px",fontSize:"14px",color:"black", padding:"6px"}}>Switch Account</div></div>
      <div><div className='set' style={{margin:"4px",fontSize:"14px",color:"black", padding:"6px"}} onClick={handleLogOut}>Logout</div></div>
           
           
      </div>

     
           
           
            </div>
    
    )
  }
  export const CreateReel=()=>{
    return(
      <div className="createReel position-absolute bg-white collapse" style={{width:"150px", fontSize:"19px",bottom:"-40px", left:"10px"}}>
        <div className="iconhover d-flex align-items-center justify-content-between m-2 mb-0  p-1" style={{borderBottom:"1px solid #9b877d"}}>
          <div>Post</div><div><CreatePost/></div>
          </div>
        <div className="iconhover d-flex align-items-center justify-content-between m-2 mt-0 p-1">
          <div>Live Video</div><div><LiveVideo/></div>
          </div>
      </div>
    )
  }