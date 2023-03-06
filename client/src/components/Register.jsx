import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import registerCss from "./css/Register.module.css"

const Index = () => {


    const [formInfo, setFormInfo] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""

    })

    const navigate = useNavigate();
        
    const [errors, setErrors] = useState([]);

    const [errorReset, setErrorReset] = useState("")


 useEffect(() => {
    const errorEraser = setTimeout(() => setErrors([]), 3000);
    return () => clearTimeout(errorEraser);
  }, [errorReset]);
 

    const onChangeHandler = (e) => {
        setFormInfo({
           ...formInfo,
           [e.target.name]: e.target.value
        })
        
    
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/user/register", formInfo, { withCredentials: true })
            .then(response =>{
                navigate('/dashboard')
            })

            .catch(err => {
                setErrorReset(Math.random())
                let errorResponse = err.response.data.error.errors
                const errorArr = [];
                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            })
            
    }


  return (
    <div className={registerCss.container}>
    <div className={registerCss.leftSide}>
    <img className={registerCss.logo} src={require('../images/logoBlue.jpeg')}
            alt="The vidshare logo is a black video camera with a blue background" />
    </div>
    <div className={registerCss.formDiv}>
        <div className={registerCss.formWrapper}>

        <div className={registerCss.nameAndLogo}>
            <div className={registerCss.vidShare}>
             <h1 id={registerCss.vid}>Vid</h1>
            <h1 id={registerCss.share}>Share</h1>
            </div>
            <img className={registerCss.logoResponsive} src={require('../images/logo.jpeg')}
            alt="The vidshare logo is a black video camera" />
        </div>

            <h3>Register</h3>
                <form onSubmit={submitHandler}>
                        <div className={registerCss.formBlock}>
                            <label className="form-label">Username: 
                            <span className={registerCss.validations}> { errors.includes('Username is required')? <span>Username is required.</span>: null} </span> 
                            <span className={registerCss.validations}> { errors.includes('Username canot be longer than 25 characters.')? 
                            <span>Username canot be longer than 25 characters.</span>: null} </span> 
                            </label>
                            <input type="text" className="form-control" name='userName' id="firstName" onChange={onChangeHandler}/>
                        </div>
                        
                        <div className={registerCss.formBlock}>
                            <label>Email: <span className={registerCss.validations}>{ errors.includes('Email is required')? <span> Email is required.</span>: null } </span> 
                        <span className={registerCss.validations}> { errors.includes('Please enter a valid email')? <span>Please enter a valid email.</span>: null} </span>
                            
                            </label>
                            <input type="text" name="email" className='form-control' onChange={onChangeHandler}/> 
                        </div>
                        
                        <div className={registerCss.formBlock}>
                            <label>Password: <span className={registerCss.validations}> {errors.includes('Password is required')? <span>Password is required.</span>: null} </span> 
                            <span className={registerCss.validations}> {errors.includes('Password must be 8 characters or longer')? <span>Password must be 8 characters or longer.</span>: null}</span>
                            
                            </label>
                            <input type="password" name="password" className='form-control' onChange={onChangeHandler}/> 
                        </div>
                        
                        
                        <div className={registerCss.formBlock}>
                            <label>Confirm Password: <span className={registerCss.validations}> {errors.includes('Password must match confirm password')? <span>Password must match confirm password.</span>: null} </span> </label>
                            <input type="password" name="confirmPassword" className='form-control' onChange={onChangeHandler}/> 
                        </div>
                        <button id={registerCss.submitBtn} className='btn btn-primary mt-3'>
                                    Submit
                </button>
                </form>
                <div className={registerCss.login}>
                    <p> Already have an account? <Link to={"/login"}>Login</Link></p>
                </div>
                </div>
                
            </div>
</div>
  )
}

export default Index