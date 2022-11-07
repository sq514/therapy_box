import React,{useState,useEffect} from 'react'
import './TaskPage.css'
import background from '../../Assets-and-Screens/Assets/Background.png';
import {useNavigate, Link} from "react-router-dom";

const TaskPage = ({user}) =>{
    const[taskList,setTaskList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(user===''){
            navigate('/login')
        }
    }, [user])
    useEffect(()=>{
        fetch(`https://tw7tqumtl2.execute-api.eu-west-2.amazonaws.com/api/gettask?username=${user}`,{method:'GET'})
        .then(res=>{
            if(res.ok){
                return res.json()
            }
        })
        .then(data=>setTaskList(data.task))
    },[])

    const add_task = ()=>{
        fetch('https://tw7tqumtl2.execute-api.eu-west-2.amazonaws.com/api/addtask',{method:'POST',body:JSON.stringify({username:user,task:''})})
        .then(
            (res) => {
                if(res.ok){
                    fetch(`https://tw7tqumtl2.execute-api.eu-west-2.amazonaws.com/api/gettask?username=${user}`,{method:'GET'})
                    .then(res=>{
                        if(res.ok){
                            return res.json()
                        }
                    })
                    .then(data=>setTaskList(data.task))
                }
            }
        )
    }

    const update_task = (taskId, task,status) => {
        fetch('https://tw7tqumtl2.execute-api.eu-west-2.amazonaws.com/api/updatetask',{method:'POST',body:JSON.stringify({status:status,task:task, taskID:taskId})})
        .then(
            (res) => {
                if(res.ok){
                    fetch(`https://tw7tqumtl2.execute-api.eu-west-2.amazonaws.com/api/gettask?username=${user}`,{method:'GET'})
                    .then(res=>{
                        if(res.ok){
                            return res.json()
                        }
                    })
                    .then(data=>setTaskList(data.task))
                }
            }
        )
    } 
    const changeTask = (value,id) => {
        const newTaskList = [...taskList]
        newTaskList.forEach(task => {
            if(task.id===id){
                task.task = value
            }
        }) 
        setTaskList(newTaskList)
    }
    return(
        <div className='homepageWrapper' style={{backgroundImage:`url(${background})`}}>
            <div className='taskHeader'>Tasks <Link to="/"><button>home</button></Link></div>
            <div className='taskListWrapper'>
                {
                    taskList.map(task=> (
                        <div className='taskWrapper'>
                        <div className='taskTitle'>
                            <input onChange={e => changeTask(e.target.value,task.id)} value={task.task} onBlur={e=>update_task(task.id,e.target.value,task.status)}/>
                        </div>
                        <div className='taskCheckbox'>
                            <input type='checkbox' onChange={e=>update_task(task.id,task.task,e.target.checked)} checked={task.status}/>
                        </div>
                    </div>
                    ))
                }

            </div>
            <div className='addImageWrapper'>
                <img src='../../Assets-and-Screens/Assets/Plus_button_small.png' alt='Add_Icon' style={{height:50,width:50}}
                onClick={add_task}/>
            </div>
        </div>
    )
}
export default TaskPage;