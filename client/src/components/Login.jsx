import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import loginCss from "./css/Login.module.css"

const Login = () => {


    const [formInfo, setFormInfo] = useState({
        email: "",
        password: "",
    })
    
    const navigate = useNavigate();

    const [error, setError] = useState("")
        
    const [errorReset, setErrorReset] = useState("")

    useEffect(() => {
       const errorEraser = setTimeout(() => setError(""), 3000);
       return () => clearTimeout(errorEraser);
     }, [errorReset]);
    
   
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/user/login", formInfo, { withCredentials: true })
            .then(response => {
                navigate('/dashboard')
            })
            .catch(err => {
                setErrorReset(Math.random())
                let errorResponse = err.response.data.error
                setError(errorResponse);
            })
    }

    const onChangeHandler = (e) => {
        setFormInfo({
           ...formInfo,
           [e.target.name]: e.target.value
        })
    }


    return (
        <div className={loginCss.container}>
            <div className={loginCss.leftSide}>
           <img className={loginCss.logo} src={require('../images/logoBlue.jpeg')}
            alt="The vidshare logo is a black video camera with a blue background" />
               
            </div>
            <div className={loginCss.formDiv}>
                <div className={loginCss.formWrapper}>
                    <div className={loginCss.nameAndLogo}>
                        <div className={loginCss.vidShare}>
                            <h1 id={loginCss.vid}>Vid</h1>
                            <h1 id={loginCss.share}>Share</h1>
                        </div>
                        <img className={loginCss.logoResponsive} src={require('../images/logo.jpeg')}
                        alt="The vidshare logo is a black video camera" />
                    </div>
                    <h3>Login</h3>
                    <form onSubmit={submitHandler}>
                            
                            <div className={loginCss.formBlock}>
                                <label>Email:</label>
                                <input type="text" name="email" className='form-control' onChange={onChangeHandler}/> 
                            </div>
                            <div className={loginCss.formBlock}>
                                <label>Password:</label>
                                <input type="password" name="password" className='form-control' onChange={onChangeHandler}/> 
                            </div>
                    <span className={loginCss.validations}> {error} </span>
                            
                            <button id={loginCss.submitBtn} className='btn btn-primary mt-3'>
                                        Submit
                    </button>
                    </form>
                </div>

            <div className={loginCss.login}>
              <p> Don't have an account? <Link to={"/"}>Register</Link></p>
              </div>
            </div>
    
        </div>
      )
    }
export default Login