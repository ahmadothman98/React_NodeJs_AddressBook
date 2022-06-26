import React  from 'react';
import { useState } from 'react';
import axios from 'axios';

const Login_form = ()=>{
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const  login=  async(e)=>{
    e.preventDefault()
    var data = {"email":"","password":""}
    data.email=email;
    data.password = password;
    axios({
      method:"post",
      url: "http://localhost:3000/api/user/login",
      data: data
    }).then(function (response){

     localStorage.setItem('token',response.data['access_token'])

      setEmail("");
      setPassword("");
    })
  }
  
  return(  
      <div className='login-page'>
      <h2>Welcome to SurveyMaker</h2>
      <form className='login-form' onSubmit={login}>
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
      {/* {localStorage.getItem('token') && <Navigate to="/" />} */}
      </div>
  )
  
}

export default Login_form;