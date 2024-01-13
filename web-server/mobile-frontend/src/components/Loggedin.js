import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import Dropdown from './dropdown'
import {ReactComponent as FootballSVG} from '../static/football.svg';
import {ReactComponent as RedFlagSVG} from '../static/red-flag.svg';
import io from "socket.io-client";
import '../App.css'

var socket;

function callBack(){
  //DO NOT DELETE
}

function sendEvent(data,event){
  // 1 Goal
  // 2 Red Card
  // 3 Yellow Card
  // 4 Corner
  var eventName
  switch(event) {
    case 1:
      eventName = 'goal'
      break;
    case 2:
      eventName = 'red'
      break;
    case 3:
      eventName = 'yellow'
      break;
    case 4:
      eventName = 'corner'
      break;
  }
  socket.emit(eventName, data.id);
}


function LoggedIn() {
  const [state, setState] = useState(null)
  function callBack(selectedData){
    setState(selectedData)
  }
  
  const [auth, setAuth]=useState(null);
  const nav=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('JWT')==null){
      return nav("/")
    }
    else{
      Axios.get(`https://api.uptwocat.com/home`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('JWT')}`
        }
      })
        .then((res) => {
          console.log(res)
          setAuth(res.data)
        })
        .catch((err) => {
          console.log(err)
          
          localStorage.removeItem('JWT')
          return nav("/")
        });

         socket = io('https://api.uptwocat.com',{
          auth: {
            "Authorization": `Bearer ${localStorage.getItem('JWT')}`
          }
        })
        socket.on("connect", () => {
          console.log("Connection Established"); // true
          });

      }
    },[])

  const handleLogout=()=>{
    localStorage.removeItem('JWT')
    return nav("/")

  
  }
  return (
    <div className='container mx-auto max-w-sm h-screen flex flex-col gap-5'>
      
    <div className='flex flex-col justify-between justify-items-center shadow-md border-2 rounded-md bg-orange-300'>
      <div className="flex gap-3" >
        <img className="rounded-full h-6 w-6" src={auth ? auth["picture"]:""} alt="Profile picture" />
        <div>
          <h1 className="text-black font-bold">Hello {auth ? auth["name"]:""}</h1>
          <h2 className="text-black font-bold">Email: {auth ? auth["email"]:""}</h2>
        </div>
      </div>
      
      <button className='bg-indigo-500 rounded-md text-white' onClick={()=>handleLogout()}>Logout</button>
    </div>
    <div className='pt-5'>
      <Dropdown callBack={callBack}/>
      </div>
      <div className="container mx-auto max-w-sm h-5/6 min-h-[800px] grid grid-cols-2 grid-rows-4 gap-x-0 shadow-md">
        <button onClick={() => sendEvent(state,1)} className="relative flex flex-col pt-12   bg-indigo-500 hover:bg-indigo-700  w-full h-full rounded-tl-md">
        <h1 className='text-left text-shadow px-6 text-white text-bold text-3xl font-bold'>
          GOAL
        </h1>
        <FootballSVG className='absolute w-24 bottom-0 right-0'/>
          
        </button>

        <button onClick={() => sendEvent(state,1)} className="relative flex flex-col pt-12 items-end   bg-orange-500 hover:bg-orange-700  w-full h-full rounded-tr-md ">
        <h1 className='text-shadow px-6 text-white text-bold text-3xl font-bold'>
          GOAL
        </h1>
        <FootballSVG className='absolute w-24 -scale-x-[1] bottom-0 left-0'/>
          
        </button>

        <button onClick={() => sendEvent(state,2)} className="relative flex flex-col pt-12  bg-indigo-400 hover:bg-indigo-700  w-full h-full ">
        <h1 className='text-left text-shadow px-6 text-white text-bold text-3xl font-bold'>
          RED CARD
        </h1>
        <div className='absolute w-24 h-32 bg-red-600 rounded-md -rotate-12 -bottom-12 right-3'></div>
  
        </button>

        <button onClick={() => sendEvent(state,2)} className="relative flex flex-col pt-12  items-end bg-orange-400 hover:bg-orange-700  w-full h-full ">
        <h1 className='text-right text-shadow px-6 text-white text-bold text-3xl font-bold'>
          RED CARD
        </h1>
        <div className='absolute w-24 h-32 bg-red-600 rounded-md rotate-12 -bottom-12 left-3'></div>
        
        </button>

        <button onClick={() => sendEvent(state,3)} className="relative flex flex-col pt-12  bg-indigo-500 hover:bg-indigo-700  w-full h-full ">
        <h1 className='text-left text-shadow px-6 text-white text-bold text-3xl font-bold'>
          YELLOW CARD
        </h1>
        <div className='absolute w-24 h-32 bg-yellow-300 rounded-md -rotate-12 -bottom-12 right-3'></div>
        
          
        </button>

        <button onClick={() => sendEvent(state,3)} className="relative flex flex-col pt-12 items-end bg-orange-500 hover:bg-orange-700  w-full h-full ">
        <h1 className='text-right text-shadow px-6 text-white text-bold text-3xl font-bold'>
          YELLOW CARD
        </h1>
        <div className='absolute w-24 h-32 bg-yellow-300 rounded-md rotate-12 -bottom-12 left-3'></div>
        </button>

      
        

        <button onClick={() => sendEvent(state,4)} className="relative  flex flex-col pt-12 bg-indigo-400 hover:bg-indigo-700  w-full h-full rounded-bl-md ">
        <h1 className='text-left text-shadow px-6 text-white text-bold text-3xl font-bold'>
          CORNER
        </h1>
        <RedFlagSVG className='absolute  w-24 -bottom-2 right-0 -rotate-12 -scale-x-[1]'/>
          
        </button>

        <button onClick={() => sendEvent(state,4)} className="relative flex flex-col pt-12 items-end bg-orange-400 hover:bg-orange-700  w-full h-full rounded-br-md ">
        <h1 className='text-right text-shadow px-6 text-white text-bold text-3xl font-bold'>
          CORNER
        </h1>
        <RedFlagSVG className='absolute  w-24 -bottom-2 left-0 rotate-12'/>
          
        </button>
        
      </div>
      
    </div>
  );
}

export default LoggedIn;