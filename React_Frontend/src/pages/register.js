import React  from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

const Signup_form = ()=>{
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const  signup=  async(e)=>{
    e.preventDefault()
    var data = {"name":"","email":"","password":""}
    data.name = name;
    data.email=email;
    data.password = password;
    axios({
      method:"post",
      url: "http://localhost:3000/api/user/signup",
      data: data
    }).then(function (response){


      localStorage.setItem('token',response.data['access_token'])
      setEmail("");
      setPassword("");
    })
  }
  
  return(  
      <div className='signup-page'>
      <h2>Welcome to SurveyMaker</h2>
      <form className='signup-form' onSubmit={signup}>
        <div className="input-div">
          <label>Name </label>
          <input type="text" id="name" className='name'
          onChange={e=>setName(e.target.value)} required />
        </div>
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
          <input type="submit" className='submit' value={'Signup'}/>
        </div>
      </form>
      {/* {localStorage.getItem('token') && <Navigate to="/" />} */}
      </div>
  )
  
}

export default Signup_form;