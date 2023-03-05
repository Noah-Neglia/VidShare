import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import DropStyle from "./css/CommentDropdown.module.css"
import { useBetween } from 'use-between'
import UseShareState from './UseShareState';
import DateFormat from './DateFormat'
//CommentDropOpts is a dropdown menu that allows us to edit and delete comments
import CommentDropOpts from './CommentDropOpts'

const CommentDropdown = ({data=[]}) => {
   
    const [open, setOpen] = useState(false)
    //Data refresh is always set to Math.random() and updates many useEffect functions
    const {dataRefresh, setDataRefresh} = useBetween(UseShareState)

    const [currentUser, setCurrentUser] = useState({})

    const [newComment, setNewComment] = useState({
        comment : "",
    })

    const [postLikes, setPostLikes] = useState([])

    const [postComments, setPostcomments] = useState([])

//    Automatically resizes the height of the text area based on the amount of text present
   const textRef = useRef(null);

   const reSize = () => {
       textRef.current.style.height = "auto"
       textRef.current.style.height = textRef.current.scrollHeight + 'px'
   }


   useEffect(() => {
    if(open){
        reSize()
    }
  },[newComment.comment]);


    //Gets the the logged in users _id from the browser cookie
    useEffect(() => {
        axios.get(`http://localhost:8000/api/current/user`, { withCredentials: true })
    .then(response => {
        setCurrentUser(response.data)
    })
    .catch(err => (err))
    },[])

    //Gets all of the previous likes and comments from a post, new comments and likes will be added to this data and the post will be patched
    useEffect(() => {
        //data[0] is one posts._id
        axios.get(`http://localhost:8000/api/post/${data[0]}`, { withCredentials: true })
            .then(response =>{
                setPostcomments(response.data.post.comments)
                setPostLikes(response.data.post.likes)
            })
            .catch(err => (err))
    },[dataRefresh])


    const toggleDropdwn = (e) => {
        e.preventDefault()
        setOpen(!open)
    }

    const commentSubmitHandler =  (e) => {
        e.preventDefault()
       //before creating a comment we will create an action for the activity log, this allows us to store the action._id in the new comment
        axios.post("http://localhost:8000/api/action/new", 
            {
            user : currentUser._id,
            commentOrLike : "commented on", 
            //data[2] is the entire post object
            friend : data[2]
            },
            { withCredentials: true } )
        .then(response =>{
            // after creating an action we will create a comment with the actionId so if we delete a comment we can simultaneously
            //  delete an action from the activity log
            axios.post("http://localhost:8000/api/comment/new", 
            {
                comment : newComment.comment,
                commentedBy: currentUser._id,
                actionId : response.data.action._id
            }, 
            
            { withCredentials: true } )
            
            .then(response => {

            //set the comment to an empty string to clear the form input

            setNewComment({
                comment: ""
            })

            //establish the form data as an array with the new comment and all previous comments

            const formData = {
                comments : [response.data.comment._id, ...postComments]
            }

            //patch the post to include all of the new comments

            axios.patch(`http://localhost:8000/api/post/update/${data[0]}`, formData , { withCredentials: true } )
            .then(response => {
                setDataRefresh(Math.random());
            })
            .catch(err => (err));
        })
        .catch(err => (err));
        })
        .catch(err => (err));
    }

        const likeSubmitHandler =  (e) => {
            e.preventDefault()
            //before creating a like we will create an action for the activity log, this allows us to store the action._id in the new like

            axios.post("http://localhost:8000/api/action/new", 
                {
                user : currentUser._id,
                commentOrLike : "liked", 
                friend : data[2]
                },
                { withCredentials: true } )
            .then(response =>{
                // after liking a post we will create a like with the actionId so if we unlike a post we can simultaneously
            //  delete an action from the activity log

                axios.post("http://localhost:8000/api/like/new", 
                    {
                    likedBy: currentUser._id,
                    actionId : response.data.action._id
                    }, 
                    { withCredentials: true } )
                .then(response => {
                   //establish the form data as an array with the new like and all previous likes
        
                const formData = {
                    likes : [response.data.like._id, ...postLikes]
                }
                  //patch the post to include all of the new likes
                axios.patch(`http://localhost:8000/api/post/update/${data[0]}`, formData , { withCredentials: true } )
                .then(response => {
                    setDataRefresh(Math.random())
                })
                .catch(err => (err))
            })
            .catch(err => (err))
            })
            .catch(err => (err))
        }

        const unlike = (e, likeId, actionLikeId) =>{
            //unlike function deletes the like and action simultaneously
            e.preventDefault()
            axios.delete(`http://localhost:8000/api/like/delete/${likeId}`, { withCredentials: true },)
                .then((response) =>{
                    setDataRefresh(Math.random())
                })
                .catch(err =>  (err))
            axios.delete(`http://localhost:8000/api/action/delete/${actionLikeId}`, { withCredentials: true },)
                .then((response) =>{
                })
                .catch(err =>  (err))
        }

        const onChangeHandler = (e) =>{
            setNewComment({
                ...newComment,
                [e.target.name] : e.target.value
            });
        }


         //Determines if the current user has already liked the post, if so then we return the id of that like
        const likeDeleteId = (post) =>{
            let bool = true
            let id;
            for(const like in post.likes){
                if(post.likes[like].likedBy._id === currentUser._id){
                    id = post.likes[like]._id;
                    bool = false
                }
            }

            if(bool === false){

                return id;
            } 

            if(bool === true){
                return null
            }
        }

         //Determines if the current user has already liked the post, if so then we return the id of that likes action attribute

        const likeActionId = (post) =>{
            let bool = true
            let id;
            for(const like in post.likes){
                if(post.likes[like].likedBy._id === currentUser._id){
                    id = post.likes[like].actionId;
                    bool = false
                }
            }
            if(bool === false){

                return id;
            } 

            if(bool === true){
                return null
            }
        }

        //Determines if the current user has already liked the post, if so then we return the id of that likes action attribute

        const commentActionId = (post) =>{
            let bool = true
            let id;
            for(const comment in post.comments){
                if(post.comments[comment].commentedBy._id === currentUser._id){
                    id = post.comments[comment].actionId;
                    bool = false
                }
            }
            if(bool === false){

                return id;
            } 

            if(bool === true){
                return null
            }
        }
        
        //function to see if the logged in user has already liked the post
        const hasAlreadyLiked = (post) =>{
            let bool = true
            for(const like in post.likes){
                if(post.likes[like].likedBy._id === currentUser._id){
                    bool = false
                }
            }
            //if the ids match we return an unlike button
            if(bool === false){
                return  <Link className={DropStyle.likeBtn} 
                onClick={(e) => {unlike(e, likeDeleteId(post), likeActionId(post) )}} >  
                unlike </Link>
            } 
            //if the ids don't match the logged in user is free to like the post
            if(bool === true){
                return  <Link onClick={likeSubmitHandler} className={DropStyle.likeBtn}>Like </Link> 
            }
        }

   
return (

<div className={DropStyle.dropParent}>
    {data[1].map((post, i) => (
        
            <div key={i} className={DropStyle.listItem}>
                <div className={DropStyle.commentsLikes}>
        
                {post.likes.length === 1?
                     <p>
                         {post.likes.length} Like
                    </p>:
                     <p>
                        {post.likes.length}  Likes
                    </p>
                }

                {
                post.comments.length === 1?
                    <button onClick={toggleDropdwn} className={DropStyle.dBtn}> {post.comments.length} Comment </button> :
                     <button onClick={toggleDropdwn} className={DropStyle.dBtn}> {post.comments.length} Comments </button>
                }
                </div> 
                    
                <div className={DropStyle.LikeOrComment}>
                    
                    {hasAlreadyLiked(
                        post
                    )}

                    <Link onClick={toggleDropdwn} className={DropStyle.commentBtn}>  Comment </Link> 
                </div>
            </div>
            ))}

    <div className={DropStyle.cont}>

        {
            open?


    <form onSubmit={commentSubmitHandler} className={DropStyle.postform}>
        <div className={DropStyle.formBlock}>
            {/* Input value is set to state so it canbe cleared on submission */}
            <textarea type="text" ref={textRef} name='comment' value={newComment.comment}
             className='form-control' id={DropStyle.formText} placeholder='Comment' onChange={onChangeHandler}/>
            <button id={DropStyle.commentSub} className='btn btn-primary'>Submit</button>
        </div>
    </form> : null
}


    {
        open? 
    
    <ul className={DropStyle.list}>
        {data[1].map((post, i) => (
            <li key={i} className={DropStyle.listItem}>

                {

                post.comments.map((comment, j) => (
                <div key={j} className={DropStyle.commentCont}>
                    <div className={DropStyle.usersComment}>
                        <div className={DropStyle.userName}>
                            <p>{comment.commentedBy.userName}</p>
                            <div className={DropStyle.dateWrapper}>
                            {/* DateFormat compenent accepts the timestamp from mongoDb and returns the month followed by the day */}
                            <DateFormat date={comment.updatedAt}/>
                        </div>
                    </div>
                    <p className={DropStyle.comment}> {comment.comment}</p>
                </div>
                {/* //CommentDropOpts is a dropdown menu that allows us to edit and delete comments */}
                    <CommentDropOpts data={
                        [
                            comment._id,
                            comment.commentedBy._id,
                            comment.actionId
                        ]
                        }/>
            </div>
                    ))
                }
            </li>
            ))}
    </ul>: null
}
    </div>
</div>
    
    )
}

export default CommentDropdown;

