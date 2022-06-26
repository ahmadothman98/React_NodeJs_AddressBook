import { useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

const Signup_form = ()=>{
  var [submitted,setSubmitted] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [password_confirm,setPasswordConfirm] = useState("");

  const  signup=  async(e)=>{
    setSubmitted(false);
    //submitted is to know if the user succefuly signed up 
    //in order to navigate to next page
    e.preventDefault()
    if(password === password_confirm){
      var data = {
        "name" : name,
        "email" : email,
        "password" : password,
      }

      axios({
        method:"post",
        url: "http://localhost:3003/api/user/signup",
        data: data
      }).then(function (response){

        setSubmitted(true);
        // localStorage.setItem('token',response.data['access_token'])
        setEmail("");
        setPassword("");
        
      })
    }
    else{
      return alert("Password confirmation failed")
    }
  }
  
  return(  
      <div className='signup-page'>
      <h1>Welcome to SurveyMaker</h1>
      <form className='signup-form' onSubmit={signup}>
        <h2 className='title'>Register</h2>
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
        <div className="input-div">
          <label>Confirm Password </label>
          <input type="password" className='password'
          onChange={e=>setPasswordConfirm(e.target.value)} required />
        </div>
        <div className="button-div">
          <input type="submit" className='submit' value={'Signup'}/>
        </div>
      </form>
      <p>Already have an account? <a href ="/">Login</a></p>
      {submitted && <Navigate to="/" />}
      </div>
  )
  
}

export default Signup_form;