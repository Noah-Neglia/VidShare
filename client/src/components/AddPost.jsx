import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import addStyle from './css/AddPost.module.css'
import { useBetween } from 'use-between'
import UseShareState from './UseShareState';

const AddPost = ({data=[]}) => {

const navigate = useNavigate();

const [errors, setErrors] = useState([])

const [currentUser, setCurrentUser] = useState({})

//Data refresh is always set to Math.random() and updates many useEffect functions
const {dataRefresh, setDataRefresh} = useBetween(UseShareState)

const [newPost, setNewPost] = useState({
       caption: "",
       content: "",
       postedBy: "",
});

// Automatically resizes the height of the text area based on the amount of text present
    const textRef = useRef(null);

    const reSize = () => {
        textRef.current.style.height = "auto"
        textRef.current.style.height = textRef.current.scrollHeight + 'px'
    }

    useEffect(reSize, [newPost.caption])



//Gets the the logged in users _id from the browser cookie
useEffect(() => {
    axios.get(`http://localhost:8000/api/current/user`, { withCredentials: true })
   .then(response => {
     setCurrentUser(response.data)
   })
   .catch(err => (err))
},[])

const [errorReset, setErrorReset] = useState("")

    useEffect(() => {
       const errorEraser = setTimeout(() => setErrors([]), 3000);
       return () => clearTimeout(errorEraser);
     }, [errorReset]);
    

const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData();

    formData.append('content', newPost.content)
    formData.append('caption', newPost.caption)
    formData.append('postedBy', currentUser._id)

    axios.post("http://localhost:8000/api/post/new", formData, { withCredentials: true } )
        .then(response => {
            setDataRefresh(Math.random())
          //sets newPost state to empty so it dissapears from form inputs
          setNewPost({
            caption: "",
            content: "",
            postedBy: "",
          })
          setErrors([])
      })
      .catch(err => {
          setErrorReset(Math.random())
          let errorResponse = err.response.data
          setErrors(errorResponse);
      })
    }

const onChangeHandler = (e) =>{
    setNewPost({
        ...newPost,
        [e.target.name] : e.target.value
    });
}

const contentHandler =  (e) => {
    setNewPost({
        ...newPost,
        content : e.target.files[0]
    });
}


  return (
    <div className={addStyle.container}>
        <h2>Share</h2>
        <form onSubmit={submitHandler} className={addStyle.postform} encType='multipart/form-data'>
            <div className={addStyle.formWrapper}>
                <div className={addStyle.formBlock}>
                    <label>content:</label>
                    <input id='content'className={addStyle.none} type="file" value='' multiple accept='video/*' name='content' onChange={contentHandler}/>
                    <label id={addStyle.addVideo}className='btn btn-primary' htmlFor="content">Add Video </label>
                    {/* If newPost.content is not empty we will render a green box with a checkmark */}
                    {
                    newPost.content !== ""?
                    <span className={addStyle.contentRecieved}>✓</span>
                    : null
                    }
                </div>
                    {
                    errors.includes(undefined)? 
                    <div className={addStyle.valWrapper}>
                        <span className={addStyle.validations}>Content is required.</span>
                    </div>
                    : null
                    } 
                <div className={addStyle.formBlock}>
                    <label>caption:</label>
                    {/* input value is set to state so that it can be cleared upon form submission */}
                    <textarea id={addStyle.captionBox} ref={textRef} className='form-control' type="text" value={newPost.caption} name='caption' onChange={onChangeHandler}/>
                
                    <button id={addStyle.submitBtn} className='btn btn-primary'>Upload</button>
                </div>
                {
            errors.includes(undefined)? 
            <div className={addStyle.valWrapper}>
                <span className={addStyle.capValidations}>Caption is required.</span>
            </div> : null
            } 
          {
          errors.includes('Caption is required')? 
          <div className={addStyle.valWrapper}>
                    <span className={addStyle.capValidations}>Caption is required.</span>
            </div> : null
           } 
            </div>
        </form>
    </div>
  )
}

export default AddPost