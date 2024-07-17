import React from 'react'
import { SideBottombars } from './Insta'
import { peopleImgs } from './SuggestionData'
import man from './Imgs/man2.jpeg'
import { YourMessage, Pencil,DownChevron } from './AllIconsSvgs/IconsSvg'
const Message = () => {
  return (
    <div style={{width:"100vw"}}><SideBottombars/>
    <div className='mainMessage d-flex '>
     <Messages/>
<MessageBox/>
    </div></div>
  )
}

const MessageBox=()=>{
  return(
    <div className='end-0 d-flex messageContent align-items-center justify-content-center flex-column position-fixed '  style={{height:"100vh"}}>
    <div className='m-3'><YourMessage/></div>
    <div className='fw-normal fs-3'>Your Messages</div>
    <div className='m-2' style={{color:"#737373"}}>Send a message to start a chat</div>
    <div className='btn btn-primary mt-1'>Send message</div></div>
  )
}
const Messages=()=>{
  return(
<div className='bg-light messagesPeople'>
<div className='d-flex align-items-center justify-content-around pt-3 mt-3 mb-2'><h3 className='not'>Raj__gahlot1 <DownChevron/></h3><Pencil/></div>
<div className='allMessage'><div className='mt-3 not'><div style={{width:"100px"}}><img className='rounded-circle m-3 mb-0' src={man} alt="" style={{height:"74px", width:"74px",color:"#737373"}}/><p className='text-center'>Your Note</p></div></div>
<div className='not d-flex align-items-center justify-content-between'><div className='fw-bold ms-1 not'>Message</div><div className='fw-norman me-1 not' style={{color:"#737373"}}>Request</div></div>
{peopleImgs.map((val,ind)=>{
  return(
<div className="d-flex mt-3 ms-3" key={ind}>
          <img className="rounded-circle" style={{height:"56px",width:"56px"}} src={val.img} alt="" />
          <div className="naming">
        <div className="names d-flex flex-column " style={{marginLeft:"5px"}}><p className='mb-0 ms-1' style={{fontSize:"18px"}}>{val.id}</p>
        <div className="fw-light light-color ms-1" style={{fontSize:"14px"}}>Active {val.time} ago</div></div>
        {/* <div className="text-primary me-4" style={{fontSize:"13px"}}>Follow</div> */}
      </div></div>

  )
})}
</div> </div> )
}
export default Message