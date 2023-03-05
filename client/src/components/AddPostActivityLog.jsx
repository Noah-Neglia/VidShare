import React from 'react'
import ActivityLog from './ActivityLog'
import AddPost from './AddPost'
import addActivityCss from './css/AddPostActivityLog.module.css'



const AddPostActivityLog = () => {
  return (

    <div className={addActivityCss.container}>
        <AddPost/>
        <ActivityLog/>
    </div>
  )
}

export default AddPostActivityLog