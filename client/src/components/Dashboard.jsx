import React, { useState, useEffect } from 'react';
import dashStyle from './css/Dashboard.module.css'
import Feed from './Feed';
import AddPost from './AddPost'
import Top  from './Header';
import ActivityLog from './ActivityLog';

const Dashboard = () => {

  const [screen, setScreen] = useState(window.innerWidth > 1024)

  const screenReSize = () =>{
    setScreen(window.innerWidth > 1024)
  }


  useEffect(() =>{
    window.addEventListener("resize", screenReSize)
    return () => window.removeEventListener("resize", screenReSize)
  })
  return (
    <div>
        <Top/>
        <div className={dashStyle.container}>
            <Feed/>
            <div className={dashStyle.rightContainer}>
            {
          screen?
          <div>
            <AddPost/> 
            <ActivityLog/> 
          </div> : null
}
 
            </div>
        </div>
    </div>
  )
}

export default Dashboard