import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './seetingicon.css'
function InstagramDialog() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-none align-items-center justify-content-center h-100 w-100 position-fixed" style={{backgroundColor:"#59595994",zIndex:"50"}}>
      

     
          <div className="d-flex flex-column" style={{width:"290px",borderRadius:"10px"}} >
            <button  className="butn mt-1 p-2 d-flex align-items-center justify-content-center" style={{borderTopLeftRadius:"10px",borderTopRightRadius:"10px",borderBottom:"1px solid #dbdbdb",fontSize:"12px",outline:"none",border:"none"}}>Apps and websites</button>
            <button  className="butn mt-0 p-2 d-flex align-items-center justify-content-center" style={{borderBottom:"1px solid #dbdbdb",fontSize:"12px",outline:"none",border:"none"}}>QR code</button>
            <button  className="butn mt-0 p-2 d-flex align-items-center justify-content-center" style={{borderBottom:"1px solid #dbdbdb",fontSize:"12px",outline:"none",border:"none"}}>Notifications</button>
            <button  className="butn mt-0 p-2 d-flex align-items-center justify-content-center" style={{borderBottom:"1px solid #dbdbdb",fontSize:"12px",outline:"none",border:"none"}}>Settings and privacy</button>
            <button  className="butn mt-0 p-2 d-flex align-items-center justify-content-center" style={{borderBottom:"1px solid #dbdbdb",fontSize:"12px",outline:"none",border:"none"}}>Supervision</button>
            <button  className="butn mt-0 p-2 d-flex align-items-center justify-content-center" style={{borderBottom:"1px solid #dbdbdb",fontSize:"12px",outline:"none",border:"none"}}>Log Out</button>
            <button  className="butn mt-0 p-2 d-flex align-items-center justify-content-center" style={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",borderBottom:"1px solid #dbdbdb",fontSize:"12px",outline:"none",border:"none"}} onClick={handleClose}>Cancel</button>
          </div> 
        
    </div>
  );
}

export default InstagramDialog;