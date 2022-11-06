import React, {useEffect, useState} from 'react';
import './Homepage.css';
import background from '../../Assets-and-Screens/Assets/Background.png';
import headerBackground from '../../Assets-and-Screens/Assets/Container.png'
import {useNavigate,Link} from "react-router-dom";
import clothData from '../../Data/cloth.json'
import { Chart } from "react-google-charts";

const api_key='d0a10211ea3d36b0a6423a104782130e'

const Homepage = ({user}) =>{
    const[weather,setWeather]=useState({location:'none',temperature:0,weather:''})
    const[cloth,setCloth] = useState([])
    const[team,setTeam] = useState('')
    const[tasks,setTasks] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        if(user===''){
            navigate('/login')
        }
    }, [user])

    function success(position) {
        
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`,{method:'GET'})
        .then(response=> response.json())
        .then(data=>{
            setWeather({location:data.name,temperature:Math.round(data.main.temp),weather:data.weather[0].main})

        })
        .catch((error)=>{
            console.log(error)
        })  
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
    },[])

   
    const clothData_calculation = () =>{
        const calculatedData = [["Cloths", "times"]]
        const map = new Map()
        for(const entry of clothData.payload){
            if(map.has(entry.clothe)){
                map.set(entry.clothe,map.get(entry.clothe)+1)
            }else{
                map.set(entry.clothe,1)
            }
            
        }
        map.forEach((value,key)=>{
            calculatedData.push([key,value])
        })
    
        return calculatedData
    }

    useEffect(()=>{
        setCloth(clothData_calculation())
    },[user])

    useEffect(()=>{
        fetch(`http://ec2-3-8-100-19.eu-west-2.compute.amazonaws.com/api/gettask?username=${user}`,{method:'GET'})
        .then(res=>{
            if(res.ok){
                return res.json()
            }
        })
        .then(res=>{
            const taskArray= res.task
            if(taskArray.length<=3){
                setTasks(taskArray)
            }else{
                setTasks(taskArray.slice(0,3))
            }
            
        }
        )
    },[user])


    useEffect(()=>{
        fetch(`http://ec2-3-8-100-19.eu-west-2.compute.amazonaws.com/api/getteam?username=${user}`,{method:'GET'})
        .then(res=>{
            if(res.ok){
                return res.json()
            }}
        )
        .then(res => {
            setTeam(res.team[0])
        })
    },[user])
      
    const options = {
      };
    if (!user){
        return <div></div>
    }

    
    let weatherIconSource = ''
    if(weather.weather==='Clouds'){
        weatherIconSource = '../../Assets-and-Screens/Assets/Clouds_icon.png'
    }else if(weather.weather ==='Rain'){
        weatherIconSource = '../../Assets-and-Screens/Assets/Rain_icon.png'
    }
    else{
        weatherIconSource = '../../Assets-and-Screens/Assets/Sun_icon.png'
    }

    return(
        <div className='homepageWrapper' style={{backgroundImage:`url(${background})`}}>
            <div className='homepageHeader'>Good Day {user}</div>
            <div className='thumbnail'>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Weather</div>
                    <div className='weatherContent'>
                        <img src={weatherIconSource} style={{width:"30%",height:"30%"}} alt='cloudIcon'/>
                        <div className='temperature'>
                            <div>{weather.temperature}</div> 
                            <div>degrees</div>
                        </div>
                        <div className='geolocation'>{weather.location}</div>
                    </div>
                </div>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>News</div>
                    <div className='articleContent'>
                        <div className='newsHeadline'>news headline</div>
                        <div className='newsContent'>news content</div>
                    </div>
                </div>
                <Link to='/sport'>
                    <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                        <div className='contentHeader'>Sports</div>
                        <div className='sportContent'>{team ||"Click to select"}</div>
                    </div>
                </Link>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Photos</div>
                    <div className='content'></div>
                </div>
                <Link to='/task'>
                    <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                        <div className='contentHeader'>Tasks</div>
                        <div className='content'>
                            {tasks.length===0? <div>click to add task</div>:tasks.map(task=>{
                                return(<div className='thumbnailTaskWrapper'><div className='thumbnailTask'>{task.task}</div>
                                <input type='checkbox' disabled checked={task.status}/></div>)})}
                        </div>
                    </div>
                </Link>
                <div className='wrapper' style={{backgroundImage:`url(${headerBackground})`}}>
                    <div className='contentHeader'>Clothes</div>
                    <div className='content'>
                    <Chart
                        chartType="PieChart"
                        data={cloth}
                        options={options}
                        width={"100%"}
                        height={"160px"}
                        style={{margin:0}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;