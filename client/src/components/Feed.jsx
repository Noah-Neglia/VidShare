import React, { useState, useEffect } from 'react';
import axios from 'axios'
import feedStyle from './css/Feed.module.css'
import CommentDropdown from './CommentDropdown';
import { useBetween } from 'use-between'
import UseShareState from './UseShareState';
import DateFormat from './DateFormat';


const Feed = () => {

    const [posts, setPosts] = useState([])

    //Data refresh is always set to Math.random() and updates many useEffect functions
    const {dataRefresh, setDataRefresh} = useBetween(UseShareState)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts/`, { withCredentials: true })
       .then(response => {
         setPosts(response.data.posts)
       })
       .catch(err => (err))
    },[dataRefresh])

  return (
    <div className={feedStyle.feed}>
        {
        posts.length < 1?
        <div className={feedStyle.noPosts}>
        <span>There are no posts in your feed!</span>
        </div>
        :
        <div className={feedStyle.Wrapper}>
        {
            posts.map((post, idx) => {
            return(
                <div className={feedStyle.postWrapper} key={idx}>
                    <div className={feedStyle.post}>
                        <div className={feedStyle.videoBox}>
                            <div className={feedStyle.videoBoxWrapper}>
                                <video className={feedStyle.media} src={require(`/Users/noahneglia/Desktop/vidShare/client/src/content/${post.content}`)} alt="A video posted by a user" controls>
                                 <source src="CityVid.mp4" type="video/mp4"></source>
                                </video>
                            </div>
                        </div>
                        <div className={feedStyle.postBottom}>
                            <div className={feedStyle.bottomWrapper}>
                                <p className={feedStyle.userName}>{post.postedBy.userName}</p> 
                                {/* DateFormat compenent accepts the timestamp from mongoDb and returns the month followed by the day */}
                                <div className={feedStyle.date}><DateFormat date={post.createdAt}/></div>
                            </div>
                            <p className={feedStyle.caption}>{post.caption}</p>
                        </div>
                       <CommentDropdown data={[post._id, [post], post.postedBy._id]} />
                    </div>
                </div>  
                    )
            })
        }
        </div>
}
    </div>
  )
}

export default Feed