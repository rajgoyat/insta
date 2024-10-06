import { SideBottombars } from "../Insta";
import React from 'react'
import { ProfileHeader } from "../ProfilePage/Profile";
const AllSuggLayout = ({children}) => {
  return (<>
<div className="position-fixed w-100 bg-white"  ><ProfileHeader heading={'hello'}/></div>
<div ><SideBottombars/></div>
<div className="editProfile" >{children}</div>

</>
)
}

export default AllSuggLayout