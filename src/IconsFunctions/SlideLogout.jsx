import {Seeting, YourActivity, Saved, DarkMode, Report} from '../AllIconsSvgs/IconsSvg'

export const SlideLogout = ()=>{
    return(<div className='show slidelogoutIconmain'> <div className=" slidelogoutIcon position-absolute bg-white d-flex flex-column  justify-content-evenly" style={{height:"404px", width:"266px", bottom:"20px",left:"55px", boxShadow:"0 0 10px 2px rgba(43, 41, 41, 0.274)",borderRadius:"20px"}}>
      <div className='d-flex set' style={{margin:"4px", padding:"6px"}}><div><Seeting/></div><div className='ms-2'>Seeting</div></div>
      <div className='d-flex set' style={{margin:"4px", padding:"6px"}}><div><YourActivity/></div><div className='ms-2'>Your Activity</div></div>
      <div className='d-flex set' style={{margin:"4px", padding:"6px"}}><div><Saved/></div><div className='ms-2'>Saved</div></div>
      <div className='d-flex set' style={{margin:"4px", padding:"6px"}}><div><DarkMode/></div><div className='ms-2'>Switch Appearance</div></div>
      <div className='d-flex set' style={{margin:"4px", padding:"6px"}}><div><Report/></div><div className='ms-2'>Report</div></div>
      <div style={{borderTop:'3px solid rgba(51, 49, 49, 0.151)'}}><div className='set'  style={{margin:"4px", padding:"6px"}}>Switch Account</div></div>
      <div><div className='set' style={{margin:"4px", padding:"6px"}}>Logout</div></div>
           
           
      </div>

     
           
           
            </div>
    
    )
  }