import React, { useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import NoData from './NoData';
import { useMediaQuery } from 'react-responsive';
import { DataContext } from '../Context/DataContext';

const ProfileSaved = () => {
const {savedpost, setNavigateSrc}= useContext(DataContext)
  const navigate = useNavigate();
  const isLarger = useMediaQuery({ query: '(min-width:600px)' });
  const small = useMediaQuery({ query: '(max-width:450px)' });
  return (
    <div>
      <div className=" p-2 pt-0 d-flex align-items-center justify-content-between">
        <div style={{ fontSize:small? "9px": "12px", fontWeight:small? '200': "400" }} className="text-muted">  Only you can see what you have saved</div> <div style={{fontWeight:small? '400':"600", fontSize:small? "11px":"14px"}} className='text-primary'><span style={{fontSize:small? "13":"22px", fontWeight:small?"400":"800"}}>+</span> New Collection</div>
      </div>
      <div className="container row d-flex align-items-center justify-content-center m-0 p-0 postpage">
        {savedpost?.length > 0 ? (
          <div className={`row col-12 col-md-11 ${isLarger ? "row-cols-4" : "row-cols-3"} m-0 p-0`}>
            {savedpost.map((item, index) => (
              <div
                key={index}
                className="col p-0 m-0 position-relative"
                onClick={() => {setNavigateSrc(item.link); navigate(`/insta/${item.type==="video"?'reel':'post'}/${item.userId}`)}}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  border: "1px solid white",
                  cursor: "pointer"
                }}
              >
                <div
                  className="post-hover position-absolute h-100 w-100"
                  style={{ zIndex: "5" }}
                ></div>
                {item.type === 'video' ? (
                  <video
                    src={item.link}
                    muted
                    className="img-fluid"
                    style={{ aspectRatio: '0.6', objectFit: 'fill', width: '100%' }}
                  />
                ) : (
                  <img
                    src={item.link}
                    alt="Saved item"
                    className="img-fluid"
                    style={{ aspectRatio: '0.6', objectFit: 'fill', width: '100%' }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default ProfileSaved;


// import React, { useEffect, useState } from 'react'
// import { useFirebase } from '../Firebase'
// import { useNavigate, useParams } from 'react-router-dom';
// import NoData from './NoData';
// import { useMediaQuery } from 'react-responsive';
// const ProfileSaved = () => {
//   const firebase= useFirebase();
//   const [saved,setsaved]= useState();
//   const {userId}= useParams();
//   const {userdata}= firebase;
//   const navigate= useNavigate();
//  const isLarger = useMediaQuery({query:'(min-width:600px)'});
// useEffect(()=>{if(userdata){
//   setsaved(userdata.links)
// }},[userdata])
//   return (
//     <div><div style={{fontSize:"12px",fontWeight:"400"}} className='text-muted'>Only you can see what you have saved</div>
//      <div className="container row d-flex align-items-center justify-content-center m-0 p-0 postpage">
//       {saved?.length > 0 ? (
//         <div className={`row col-12 col-md-11 ${isLarger?"row-cols-4":"row-cols-3"}  m-0 p-0`} >
//           {saved.map((item, index) => (
//             <>
//                 <div
//                   key={index}
//                   className="col  p-0 m-0 position-relative" 
//               onClick={()=>navigate(`/insta/reel/${userId}/${index}`)}

//                            style={{
//     display: "flex",
//     flexWrap: "wrap", border:"1px solid white",cursor:"pointer"
//   }}
//                 >
//                    <div
//                 className="post-hover position-absolute h-100 w-100 "
//                 style={{zIndex:"5"}}
//               >

//               </div>
//                   <video
//                     src={item.src}
//                     muted
//                     className="img-fluid" // Bootstrap class for responsive video
//                     style={{ aspectRatio: '0.6', objectFit: 'fill', width: '100%' }}
//                   />
//                 </div>
//             </>
//           ))}
//         </div>
//       ) : (
//         <NoData/>
//       )}
//     </div>
//     </div>
//   )
// }

// export default ProfileSaved