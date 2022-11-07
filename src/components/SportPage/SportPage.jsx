import React from 'react'
import './SportPage.css'
import background from '../../Assets-and-Screens/Assets/Background.png';
import {useState,useEffect} from 'react'
import sportData from '../../Data/sportData.csv'
import Papa from 'papaparse';
import {useNavigate,Link} from "react-router-dom";

const SportPage = ({user}) =>{
    const [team,setTeam] = useState('')
    const [teamsWonAgainst,setTeamsWonAgainst] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(user===''){
            navigate('/login')
        }
    }, [user])
    useEffect(()=>{
        Papa.parse(sportData,{
            download:true,
            complete:function(input){
                const records= input.data
                const teamListMap = {}
                const teamList = []
                records.forEach((entry,index)=>{
                    if(index==0){
                        return
                    }else{
                        if(entry[2]==team && entry[6]=='H'){
                            teamListMap[entry[3]]= true
                        }
                        else if(entry[3]==team && entry[6]=='A'){
                            teamListMap[entry[2]]= true
                        }
                    }
                })
                for(const i in teamListMap){
                    teamList.push(i)
                }
                setTeamsWonAgainst(teamList)
            }
        })
    },[team])

    useEffect(()=>{
        fetch(`https://tw7tqumtl2.execute-api.eu-west-2.amazonaws.com/api/getteam?username=${user}`,{method:'GET'})
        .then(res=>{
            if(res.ok){
                return res.json()
            }}
        )
        .then(res => {
            setTeam(res.team[0])
        })
    },[user])
    const upsert_team = () =>{
        fetch('https://tw7tqumtl2.execute-api.eu-west-2.amazonaws.com/api/team',{method:'POST',body:JSON.stringify({username:user,team:team})})
        .then(res=>{
            if(!res.ok){
                alert('save team failed')
            }
            else{
                alert('save successfully')
            }
        })
    }
    return(
        <div className='homepageWrapper' style={{backgroundImage:`url(${background})`}}>
            <div className='sportHeader'>Champion's League Challenge <Link to="/"><button>home</button></Link></div>
            <div className='sportContentWrapper'>
                <input type='text' placeholder='Input winning team' value={team} onChange={(e)=>setTeam(e.target.value)}/>
                <button className='sportSaveButton' onClick={upsert_team}>SAVE</button>
                <div className='teamListWrapper'>
                    <div className='teamListTitle'>These teams you won against:</div>
                    {teamsWonAgainst.map(team =><div>{team}</div>)}
                </div>
                
            </div>
        </div>
    )
}

export default SportPage;