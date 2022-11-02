import React, {useEffect, useState} from 'react';
import './LoginPage.css';
import background from '../../Assets-and-Screens/Assets/Background.png';

const LoginPage = () =>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const loginHandler = () =>{
        if(username && password){
        fetch('http://127.0.0.1:5000/api/login',{method:'POST', body:JSON.stringify({username:username,password:password})})
        }else{
            alert('need username and password!')
        }
    }


    return(
        <div className='loginPageWrapper' style={{backgroundImage:`url(${background})`}}>
            <div className='loginHeader'>Dev Challenge</div>
            <div className='userLoginInputWrapper'>
                <input type='text' placeholder = 'Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type='text' placeholder = 'Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='loginButton'>
                <img src='../../Assets-and-Screens/Assets/Login_button.png' style={{width:"13%",height:"13%"}}
                onClick={loginHandler}/>
            </div>
            <div className='loginBottomWrapper'>
                <div>New to the challenge?</div>
                <div className='signUpLink'><a href='/signup' >Sign Up</a></div>
                
            </div>
        </div>
    )
}
export default LoginPage;