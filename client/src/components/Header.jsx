import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import headerStyle from './css/Header.module.css'



const Header = () => {
  
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({})

  const [screen, setScreen] = useState(window.innerWidth > 1024)

  const screenReSize = () =>{
    setScreen(window.innerWidth > 1024)
  }

  useEffect(() =>{
    window.addEventListener("resize", screenReSize)
    return () => window.removeEventListener("resize", screenReSize)
  })
  //Gets the the logged in users _id from the browser cookie
  useEffect(() => {
    axios.get(`http://localhost:8000/api/current/user`, { withCredentials: true })
   .then(response => {
     setCurrentUser(response.data)
   })
   .catch(err => (err))
},[])

//Logs out the user and deletes the stored cookie
  const logout = () => {
    axios.get("http://localhost:8000/api/user/logout", { withCredentials: true })
        .then(response =>{
          navigate('/login')
        })
        .catch(err => (err))
  }


  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.nameAndLogo}>
        <div className={headerStyle.vidShare}>
            <h1 id={headerStyle.vid}>Vid</h1>
            <h1 id={headerStyle.share}>Share</h1>
        </div>
        <img className={headerStyle.logo} src={require('../images/logo.jpeg')}
            alt="The vidshare logo is a black video camera" />
      </div>
      <div className={headerStyle.rightActions}>
        {
          screen?  null  :
          <Link id={headerStyle.addPost} className="btn btn-warning" to={`/addPostActivityLog`}>+</Link> 
        }
        <p>Welcome, {currentUser.userName}</p>
        <Link id={headerStyle.logout} className='btn btn-danger mx-4'onClick={logout}>Logout</Link>
    </div>
    </div>
  )
}

export default Header
