import { useState } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom'
const Login_form = ()=>{
    var [submitted,setSubmitted] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const  login=  async(e)=>{
        setSubmitted(false);
        //submitted is to know if user succefuly logged in 
        //in order to navigate to next page
        e.preventDefault()

        var data = {
            "email":email,
            "password":password,
        }
        console.log(data);
        axios({
        method:"post",
        url: "http://localhost:3003/api/user/login",
        data: data
        }).then(function (response){

        //  localStorage.setItem('token',response.data)
        setSubmitted(true);

        setEmail("");
        setPassword("");
        })
    }
    
    return(  
        
        <div className='login-page'>
        <h1>Welcome to SurveyMaker</h1>
        <form className='login-form' onSubmit={login}>
                <h2>Login</h2>
                <div className="input-div">
                <label>Email </label>
                <input type="email" id="email" className='email' 
                onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className="input-div">
                <label>Password </label>
                <input type="password" id="password" className='password'
                onChange={e=>setPassword(e.target.value)} required />
            </div>
            <div className="button-div">
                <input type="submit" className='submit' value={'Login'}/>
            </div>
        </form>
        <p>Don't have an account yet? <a href ="/signup">Sign Up</a></p>

        {submitted && <Navigate to="/main" />}
        </div>
    )
    
}

export default Login_form;