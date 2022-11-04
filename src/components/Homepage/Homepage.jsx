import React, {useEffect, useState} from 'react';
import './Homepage.css';
import background from '../../Assets-and-Screens/Assets/Background.png';
import headerBackground from '../../Assets-and-Screens/Assets/Container.png'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const api_key='d0a10211ea3d36b0a6423a104782130e'

const Homepage = ({user}) =>{
    const[geolocation,setGeolocation]=useState({location:'none',temperature:0})
    const navigate = useNavigate()
    useEffect(() => {
        if(user===''){
            console.log(user,'1')
            navigate('/login')
        }
    }, [user])

    function success(position) {
        
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
/*       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`,{method:'GET'})
        .then(response=> response.json())
        .then(data=>{
            setGeolocation({location:data.name,temperature:Math.round(data.main.temp)})
            
        })
        .catch((error)=>{
            console.log(error)
        })  */
    }

    function error() {
        alert('Unable to retrieve your location');
    }

    useEffect(()=>{
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser')
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })

    return(
        <div className='homepageWrapper' style={{backgroundImage:`url(${background})`}}>
            <div className='homepageHeader'>Good Day {user}</div>
            <div className='thumbnail'>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Weather</div>
                    <div className='weatherContent'>
                        <img src={'../../Assets-and-Screens/Assets/Clouds_icon.png'} style={{width:"35%",height:"35%"}}/>
                        <div className='temperature'>
                            <div>{geolocation.temperature}</div> 
                            <div>degrees</div>
                        </div>
                        <div className='geolocation'>{geolocation.location}</div>
                    </div>
                </div>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>News</div>
                    <div className='articleContent'>
                        <div className='newsHeadline'>news headline</div>
                        <div className='newsContent'>news content</div>
                    </div>
                </div>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Sports</div>
                    <div className='articleContentc'></div>
                </div>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Photos</div>
                    <div className='content'></div>
                </div>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Tasks</div>
                    <div className='content'></div>
                </div>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Clothes</div>
                    <div className='content'></div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;