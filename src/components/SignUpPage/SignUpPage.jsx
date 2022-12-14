import React, {useEffect, useState} from 'react';
import './SignUpPage.css';
import background from '../../Assets-and-Screens/Assets/Background.png';
import add_picture_background from '../../Assets-and-Screens/Assets/Add_picture.png';
import {useNavigate} from "react-router-dom";

const SignUpPage = () =>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const signUpHandler = () =>{
        if(password!==confirmPassword){
            alert('password and confirm password are not same')
        }else if(!username||!password||!confirmPassword||!email){
            alert('please fill in all field!')
        }else{
            fetch('https://tw7tqumtl2.execute-api.eu-west-2.amazonaws.com/api/signup',{method:'POST', body:JSON.stringify({username:username,password:password,email:email})}).then(res=>{
                if(res.ok){
                    navigate('/login')
                }
                else{
                    alert('Sign up failed')
                }
            })
        }
    }
    return(
        <div className='signUpPageWrapper' style={{backgroundImage:`url(${background})`}}>
            <div className='signUpHeader'>Dev Challenge</div>
            <div className='usersignUpInputWrapper'>
                <input type='text' placeholder = 'Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type='text' placeholder = 'Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' placeholder = 'Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <input type='password' placeholder = 'Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <div className='signUpBottomWrapper'>
                <div className='signUpAddPicture' style={{backgroundImage:`url(${add_picture_background})`}}>
                    Add Picture
                </div>
                <div className='signUpButton'>
                    <img src='../../Assets-and-Screens/Assets/Register_button.png' style={{width:"56%",height:"56%"}}
                    onClick={signUpHandler}/>
                </div>
            </div>

        </div>
    )
}
export default SignUpPage;