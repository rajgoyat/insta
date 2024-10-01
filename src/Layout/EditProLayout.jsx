import { SideBottombars, HeadBar } from "../Insta";
import React from 'react'

const EditProLayout = ({children}) => {
  return (<>
    <div ><HeadBar/></div>
<div  ><SideBottombars/></div>
<div className="editProfile" >{children}</div>

</>
)
}

export default EditProLayout