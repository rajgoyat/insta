import EditProLayout from "../Layout/EditProLayout";
import EditProfile from "./EditProfile";
import EditSeeting from "./EditSeeting";
import React from 'react'

const EditMain = () => {
  return (
    <>
    <EditProLayout>
        <div className="d-flex mt-5 mt-md-0">
           <div className="d-none d-md-block"> <EditSeeting/></div>
            <EditProfile/>
        </div>
        </EditProLayout></>
  )
}

export default EditMain