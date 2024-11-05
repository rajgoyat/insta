import {Home,Explore,Reel,Create,Post,Live,Message,Profile,Search,Bar,InstaLogo,Like} from './ReelSvg';
import { FaBars, FaRegHeart } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import React,{useState,useContext, useEffect} from 'react'
import { useFirebase } from "./Firebase";
import { useNavigate } from "react-router-dom";
import logo from './imgs/logo.jpg';
import SearchPage from './SearchPage';
import MoreBox from './MoreBox';
import Notification from './Notification';


import { useMediaQuery } from 'react-responsive';
export default function Sidebar({children}) {

  const firebase=useFirebase();
  const {allShow,setAllShow}=firebase;
  const navigate=useNavigate();
  const [logout,setlogout]=useState(true);
  const [create,setcreate]=useState(true);
  const [notification,setnotification]=useState(true);
  const [text,settext]=useState(true);
  const [open,setOpen]=useState(true);
  const [showtext,setshowtext]= useState('')
// const {search, firebase.setSearch}= firebase;
const isShowIcon = useMediaQuery({ query: '(max-width: 1199px)' });
     useEffect(()=>{
      setshowtext("")
     },[allShow])
  // const [messShow,setmessShow]=useState(true)
  const handleNotification=()=>{
    if(allShow!="Notification"){
      setAllShow("Notification");
     }
     else{
      setAllShow("")
     }
  }
  const handleSearPage=(data)=>{
    // firebase.setSearch(!firebase.search);
setshowtext(data)
console.log(data)
   if(allShow!="Search"){
    setAllShow("Search");
   }
   else{
    setAllShow("")
   }
  }
  const handleCreate=()=>{
    if(allShow!="Create"){
      setAllShow("Create");
     }
     else{
      setAllShow("")
     }
  }
  const handleReels=()=>{
    if(allShow!="Reel"){
      setAllShow("Reel");
      navigate("/ReelPage")
     }
     else{
      setAllShow("")
     }
  }
  const handleLogoutPage=()=>{
    if(allShow!="Logout"){
      setAllShow("Logout");
     }
     else{
      setAllShow("")
     }
  }
 
  const handleMainProfile= async()=>{
    setAllShow("")
    navigate('/MainProfile');
  }
  const handleExplore= async()=>{
    setAllShow("")
    navigate('/Explore');
  }

  const handleHome=()=>{
    setAllShow("")
    navigate('/');
  }
 
 const BootomArr = [
    { icon: <Home />,onClick:handleHome },

    { icon: <Explore/> },
    { icon: <Search/> },
   { icon: <Create/>},
    { icon: <Reel/>},

    { icon: <Message/>},
    { icon: <Profile/> },
  ];
  const SideArr=[
  {icon:<Home/>,name:"Home",onClick:handleHome},
  {icon:<Search />,name:"Search"},
  {icon:<Explore/>,name:"Explore",onClick:handleExplore},
  {icon:<Reel/>,name:"Reel",onClick:handleReels},
  {icon:<Message/>,name:"Messages"},
  {icon:<Like/>,name:"Notifications",onClick:handleNotification},
  {icon:<Create/>,name:"Create",className:"POSITION",onClick:handleCreate},
  {icon:<Profile/>,name:"Profile",onClick:handleMainProfile},
  ]
  return (
    
    <div className="d-flex sidebar">
     
      <div>
      <div
        className="  p-3  d-md-block d-none Side_main bg-  "
        style={{ height: "", width: firebase.search? "80px" :showtext==="showtext" && allShow==="Search" ? "":"80px" }}



      > 


{/* || showtext==="showtext" && allShow==="Search" */}
        <div className=" mt-3 " style={{ height: "39px" }}>
          <div  className={`icons p-2 Side_text ${firebase.search? "d-none":showtext==="showtext" && allShow==="Search" ? "":"d-none"}`} ><InstaLogo/></div>
          <div
            className={` icons ${firebase.search || isShowIcon? "d-block": "d-none"}`}
            style={{ padding: "10px", maxWidth: "230px" }}
          >
            <FiInstagram size={25} className={`fs-3 Side_insta_logo `} />
          </div>
        </div>
        <div
          className="Icons_group  d-flex justify-content-between gap-2 flex-column"
          style={{ marginTop: "33px" }}
        >
        {
          SideArr.map((val,id)=>{
            return(
             <div className="position-relative cr">  <div key={id}
              className={`${val.className ? val.className : ""} icons d-flex position-relative`}  onClick={val.onClick}
                style={{ padding: "10px", maxWidth: "230px" }} >
                <span className='arrIcon' onClick={()=>val.name==="Search"?handleSearPage("notshowtext"):''}>{val.icon}</span>
                <span className={`Side_text ms-3 ${firebase.search? "d-none":showtext==="showtext" && allShow==="Search" ?"": "d-none"}`}  onClick={()=>val.name==="Search"?handleSearPage("showtext"):''}>{val.name}</span>
                </div>        {val.name === "Create" && (allShow==="Create"?
  <div>
  <CreateBox/>
</div>:
null


      )}
                 </div>
              
            )
          })
        }
       
        </div>
<div className="position-relative cr">
        <div className="icons d-flex mt-5" onClick={handleLogoutPage} style={{ padding: "10px" }}>
        <span className='arrIcon'> <Bar/></span>
          <span className={`Side_text ms-3 ${firebase.search? "d-none":showtext==="showtext" && allShow==="Search" ?"": "d-none"}`}>More</span>
        </div>
        {
          allShow==="Logout"?
          <div >
          <MoreBox/>
          </div>:
          null
        }
       
        </div>
      </div>

{/* top */}
      {/* <div
        className="bg-danger top_sidebar ps-2 w-100  pe-4 d-md-none d-block d-flex align-items-center justify-content-between "
        style={{ height: "60px", borderBottom: "1px solid #e8e3e3" }}
      >
        
        
      </div> */}
      {/* bottom Logout*/}
      <div
        className="bottom_sidebar w-100  bg-white d-md-none d-block d-flex flex-row align-items-center justify-content-around "
        style={{ height: "60px", borderTop: "1px solid #e8e3e3"}}
      >
        {BootomArr.map((val, id) => {
          return (
            <div key={id} className= {`${id===1 ||id===5  ? "d-none d-sm-block": ""} ${id===1  ? "d-block d-sm-none": ""}`} onClick={val.onClick}>
              <span className='arrIconn'>{val.icon}</span>
            </div>
          );
        })}

      </div>





    
      </div>
       

      {/* search page */}
      {allShow==="Search"?
      <div style={{position:"relative"}}>
      <SearchPage/>
    </div>:
    null
      }

      {allShow==="Notification"?
      <div style={{position:"relative"}}>
        <Notification/>
    </div>:
    null
      }
      



      
     

    </div>
  );
}
const CreateBox=()=>{
  const firebase= useFirebase();
  
 
 const handlehello=()=>{
 firebase.setCreatepost(true)
 console.log("setCreatepost",firebase.createpost)
 }
  return(
   
    <div className="Create bg-white" style={{zIndex:"10",height:"88px",width:"200px",position:"absolute",left:"0px",top:"50px",borderRadius:"10px",boxShadow:"2px 0px 10px rgba(0,0,0,0.5)",cursor:"pointer"}}>
    <div onClick={handlehello}  style={{height:"44px",borderBottom:"1px solid #e8e3e3"}} className="d-flex Create_logo p-3  justify-content-between align-items-center">
      <span style={{fontSize:"16px"}}>Post</span>
      <Post/>
    </div>
    <div></div>
      <div style={{height:"44px"}} className="d-flex Create_logo p-3 pb-3 align-items-center justify-content-between">
        <span style={{fontSize:"16px"}}>Live video</span>
        <Live/>
      </div>
     
    </div>
   
 
  )
}

