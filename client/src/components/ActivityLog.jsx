import React, { useState, useEffect} from 'react';
import axios from 'axios'
import logCss from './css/ActivityLog.module.css'
import { useBetween } from 'use-between'
import UseShareState from './UseShareState'
import DateFormat from './DateFormat';

const ActivityLog = () => {

  //Data refresh is always set to Math.random() and updates many useEffect functions
    const {dataRefresh, setDataRefresh} = useBetween(UseShareState)

    const [activityLog, setActivityLog] = useState([])


    //Gathers all the actions from the database
    useEffect(() => {
      axios.get(`http://localhost:8000/api/actions/`, { withCredentials: true })
    .then(response => {
      setActivityLog(response.data.actions)
      //if we have more than 15 actions in the activity log we start deleting them at the end of the array
      if(response.data.actions.length > 15){
          let id = response.data.actions[16]._id
          axios.delete(`http://localhost:8000/api/action/delete/${id}`, { withCredentials: true },)
        .then((response) =>{
        })
        .catch(err => (err))
      }
    })
    .catch(err => (err))
    },[dataRefresh])



  return (
    <div className={logCss.container}>
      {
        activityLog.length < 1?
      <div className={logCss.noActivityWrapper}>
        <span className={logCss.noActivity}> There is no activity to show!</span>
      </div>
      :
      <div className={logCss.wrapper}>
      {activityLog.map((action, i) => (
              <ul key={i} className={logCss.list}>
            
              {
                action.user.userName === action.friend.userName?
              <li className={logCss.dateFlexer}>
                  <div>
                    <span> {action.user.userName} </span> 
                    <span> {action.commentOrLike} </span> 
                    <span> their own post.</span> 
                  </div>
                  <div className={logCss.dateWrapper}>
                    {/* DateFormat compenent accepts the timestamp from mongoDb and returns the month followed by the day */}
                    <DateFormat date={action.createdAt}/>
                  </div>
                </li> :

              <li className={logCss.dateFlexer}>
                <div>
                  <span> {action.user.userName} </span> <span> {action.commentOrLike}
                  </span> <span>{action.friend.userName} post. </span> 
                </div>

              <span>
                <div className={logCss.dateWrapper}>
                {/* DateFormat compenent accepts the timestamp from mongoDb and returns the month followed by the day */}
                  <DateFormat date={action.createdAt}/>
                </div>
              </span>
              </li>

              }
              </ul>
          ))}
          </div>
            }
      </div>

  )
}

export default ActivityLog