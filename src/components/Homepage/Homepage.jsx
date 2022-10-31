import React, {useEffect, useState} from 'react';
import './Homepage.css';
import background from '../../Assets-and-Screens/Assets/Background.png';
import headerBackground from '../../Assets-and-Screens/Assets/Container.png'
const Homepage = () =>{
    console.log(background)
    return(
        <div className='homepageWrapper' style={{backgroundImage:`url(${background})`}}>
            <div className='homepageHeader'>Good Day Swapnil</div>
            <div className='thumbnail'>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Weather</div>
                    <div className='content'></div>
                </div>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>News</div>
                    <div className='content'></div>
                </div>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Sports</div>
                    <div className='content'></div>
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