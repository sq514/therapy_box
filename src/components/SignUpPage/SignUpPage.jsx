import React, {useEffect, useState} from 'react';
import './SignUpPage.css';
import background from '../../Assets-and-Screens/Assets/Background.png';
import add_picture_background from '../../Assets-and-Screens/Assets/Add_picture.png';
const SignUpPage = () =>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    return(
        <div className='signUpPageWrapper' style={{backgroundImage:`url(${background})`}}>
            <div className='signUpHeader'>Dev Challenge</div>
            <div className='usersignUpInputWrapper'>
                <input type='text' placeholder = 'Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type='text' placeholder = 'Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='text' placeholder = 'Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <input type='text' placeholder = 'Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <div className='signUpBottomWrapper'>
                <div className='signUpAddPicture' style={{backgroundImage:`url(${add_picture_background})`}}>
                    Add Picture
                </div>
                <div className='signUpButton'>
                    <img src='../../Assets-and-Screens/Assets/Register_button.png' style={{width:"56%",height:"56%"}}/>
                </div>
            </div>

        </div>
    )
}
export default SignUpPage;