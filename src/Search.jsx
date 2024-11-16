// import img1 from './imgs/img1.jpg'
import {useFirebase} from './Firebase'
import {useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './Context/DataContext';
export default function Search(){
const firebase=useFirebase();
const { getAllUser } = firebase; 
const navigate=useNavigate();
const {allshow,setallshow}= useContext(DataContext)
const [search, setSearch] = useState("");
const smaller= useMediaQuery({ query: '(max-width: 768px)' });
useEffect(()=>{
   if(smaller){
if(search===""){
   setallshow('') 
}else{ setallshow('searchbox')}
}
},[search,setSearch, smaller])
   const filterData = (getAllUser || [])
   .filter((obj) =>
     obj?.fullname?.toLowerCase().includes(search?.toLowerCase())
   )
   .slice(0, 5);
   
    return(
        <>
<div >
<h3 className={`${smaller?'': 'mx-3 my-4'} d-none d-md-block`} >Search</h3>

   <div className="mx-3 mt-1 mt-md-3 mb-md-2">
      <input type="search"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    placeholder="Search" className="w-100" style={{border:"none",outline:"none",width:"100%",height:smaller?'30px':"40px",backgroundColor:"#efefef",borderRadius:"8px",padding:smaller? '0 0 0 5px':"3px 16px"}} /></div>
<div className={`${smaller && allshow==='searchbox'?'position-absolute bg-white':allshow!=="searchbox"?'d-none':''}`} style={{width:smaller? '340px':'', top:smaller? "60px":'', right: smaller? "10px":'',borderRadius:smaller?'10px':'', boxShadow:smaller? "0px 0px 2px 1px #d7d6d9c7":''}}>
   <hr className={`${smaller? 'd-none':''}`} style={{background:"#65686c"}}></hr>
<span className="d-flex justify-content-between mx-3 mt-2 mb-3">
    <h3 style={{fontSize:"18px",fontWeight:"700"}}>Recent</h3>
    <div style={{fontSize:"14px",color:"#0095f6",fontWeight:"700"}}>Clear all</div>
</span>
{
   search?(<>
  {filterData.length > 0 ? (
                      <>
                        {filterData.map((val, id) => {
                          return (
                           
<div className="Sugges_profile mt-1 d-flex gap-2 flex-column w-100 iconhover  " style={{height:"60px",cursor:"pointer"}}   onClick={() => {firebase.setSearchshow(false) // Log the message
    navigate(`/insta/profile/${val.userId}`);}}>
              
                     <div  className="Our_profie mx-3 d-flex align-items-center justify-content-between ">
                        <div className="d-flex gap-3  d-flex justify-content- align-items-center" style={{height:"60px"}}>

                              <img
                                 src={val?.proimg}
                                 alt="img"
                                 style={{
                                    cursor:"pointer",
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "50%",
                                 }}
                              />

<div className=" d-flex flex-column  justify-content-center">
    <h6 className="text-dark mb-0">{val?.fullname}</h6>
    <p style={{ color: "#737373", fontSize: "14px" }}>{val?.username}</p>
</div>


                        </div>
                       
                     </div>
                     
                 
            </div>
             );
            })}
          </>
        ) : (
         <>
             <div style={{height:smaller? '20px':"457px"}} className={`w-100 d-flex align-items-center justify-content-center ${smaller? "p-3 pb-4":''}`}>
      <span style={{fontSize:"14px",color:"#737373"}} className='text-center'>No result found.</span>
      </div>
         </>
                    )}
   </>):(
      <>
      <div style={{height:smaller?'20px':"300px"}} className='w-100 d-flex pb-4 pb-md-0 align-items-center justify-content-center'>
      <span style={{fontSize:"14px",color:"#737373"}} className='text-center p-2'>No recent search.</span>
      </div>
      </>
   )
}
</div>
            
</div>
        </>
    )
}