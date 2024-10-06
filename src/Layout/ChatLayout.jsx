import { SideBottombars} from "../Insta";
import React from 'react'

const ChatProLayout = ({children}) => {
  return (<>
    
<div  className="d-none d-md-block"><SideBottombars/></div>
<div className="editProfile" >{children}</div>

</>
)
}

export default ChatProLayout