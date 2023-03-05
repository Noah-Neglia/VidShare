import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useBetween } from 'use-between'
import UseShareState from './UseShareState';
import optsCss from "./css/CommentDropOpts.module.css"


const Dropdown = ({ data = []}) => {

    const [updatedComment, setUpdatedComment] = useState({
        comment : "",
    })


 //Data refresh is always set to Math.random() and updates many useEffect functions
    const {dataRefresh, setDataRefresh} = useBetween(UseShareState)

    const [currentUser, setCurrentUser] = useState({})

    const [open, setOpen] = useState(false)

    const [formOpen, setFormOpen] = useState(false)

    const [deleteOpen, setDeleteOpen] = useState(false)

    const ref = useRef()

    const toggleDropdwn = (e) => {
        setOpen(!open)
        setDataRefresh(Math.random())
    }

    const toggleFormDrop = () =>{ 
    setFormOpen(!formOpen)
    setDeleteOpen(false)
    }
    const toggleDeleteDrop = () => {
    setDeleteOpen(!deleteOpen)
    setFormOpen(false)
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
        // If the comment options menu is open and the clicked target is not within the menu
        // close the menu
        if (open && ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
            setFormOpen(false)
            setDeleteOpen(false)
        }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [open])


    //data[0] is a single comments id
    useEffect(() => {
        axios.get(`http://localhost:8000/api/comment/${data[0]}`, { withCredentials: true })
    .then(response => {
        setUpdatedComment({
            comment : response.data.comment.comment
            })
    })
    .catch(err => (err))
    },[dataRefresh])

        //Gets the the logged in users _id from the browser cookie
    useEffect(() => {
        axios.get(`http://localhost:8000/api/current/user`, { withCredentials: true })
    .then(response => {
        setCurrentUser(response.data)
    })
    .catch(err => (err))
    },[])


    //Updates the comment and closes the dropdown
    const commentUpdateHandler =  (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/comment/update/${data[0]}`,  {comment : updatedComment.comment},   { withCredentials: true } )
            
        .then(response => {
        setDataRefresh(Math.random())
    })
    .catch(err => (err))
        setOpen(false);
        setFormOpen(false)
        setDeleteOpen(false)
    }

    const onChangeHandler = (e) =>{
        setUpdatedComment({
            ...updatedComment,
            [e.target.name] : e.target.value
        });
    }

    //Deletes the comment and closes the dropdown
    const commentDeleteHandler = (e, commentId, actionId) =>{
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/comment/delete/${commentId}`, { withCredentials: true },)
            .then((response) =>{
                setDataRefresh(Math.random())
            })
            .catch(err =>  (err))
        axios.delete(`http://localhost:8000/api/action/delete/${actionId}`, { withCredentials: true },)
            .then((response) =>{

            })
            .catch(err =>  (err))
        setOpen(false);
        setFormOpen(false)
        setDeleteOpen(false)
    }


    return (
        <div className={optsCss.container}>
        {
    currentUser._id === data[1]?
<div className={optsCss.dropParent}>
    
    <button onClick={toggleDropdwn} className={optsCss.dBtn}>...</button>
<div className={optsCss.cont}>

    {

        open? 
        
    <ul className={optsCss.list} ref={ref}>
       
        <li className={optsCss.listItem}>
            <Link onClick={toggleFormDrop} className={optsCss.commentBtn}> Edit </Link>
            <Link onClick={toggleDeleteDrop} className={optsCss.commentDelBtn}>  Delete </Link> 
        </li>
        <li className={optsCss.formItem}>
       
            {
                formOpen?   
                
            <form onSubmit={commentUpdateHandler} className={optsCss.postform}>
                
                <div className={optsCss.formBlock}>
                    <textarea type="text" name='comment' value={updatedComment.comment}className='form-control' placeholder='Edit' onChange={onChangeHandler}/>
                    <button id={optsCss.commentSub} className='btn btn-primary'>Update</button>
                </div>
            </form> : null
            }
            {
            deleteOpen?   
                <div className={optsCss.formBlock}>
                    <span>Are you sure you want to delete your comment?</span>
                    {/* //data[0] is a single comments id */}
                    <button id={optsCss.commentDel} onClick={(e) => {commentDeleteHandler(e, data[0], data[2])}} className='btn btn-primary'>Delete</button>
                </div> : null
            }
        </li>
    </ul>: null
}
</div>
</div>
      : null  } 
        </div>
    


    )
}

export default Dropdown;

