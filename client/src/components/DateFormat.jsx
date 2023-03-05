import React from 'react'
import dateCss from './css/DateFormat.module.css'

const DateFormat = ({date}) => {
 
        let formattedMonth = new Date (date).toLocaleString('en-US',
        {
          month: 'long',
        });
    
        let formattedDay = new Date (date).toLocaleString('en-US',
        {
          day: 'numeric',
        });
    
      
      
       if(formattedDay == 1){
        return <span className={dateCss.action}> {formattedMonth} {formattedDay}st </span>
       }
       if(formattedDay == 2){
        return <span className={dateCss.action}> {formattedMonth} {formattedDay}nd </span>
       }
       if(formattedDay == 3){
        return <span className={dateCss.action}> {formattedMonth} {formattedDay}rd </span>
       }
       if(formattedDay > 3){
        return <span className={dateCss.action}> {formattedMonth} {formattedDay}th </span>
       }
}

export default DateFormat