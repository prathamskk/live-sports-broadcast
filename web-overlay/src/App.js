import './App.css';
import GoalOverlay from './component/goaloverlay';
import { useState , useEffect } from 'react';
import {socket} from './socket';
import { motion , AnimatePresence} from "framer-motion"
import RedOverlay from './component/redoverlay';
import YellowOverlay from './component/yellowoverlay';
import CornerOverlay from './component/corneroverlay';



function App() {

  

  const [goalactive , setGoalActive] = useState({view:false,playerid: 0})
  const [redactive , setRedActive] = useState({view:false,playerid: 0})
  const [yellowactive , setYellowActive] = useState({view:false,playerid: 0})
  const [corneractive , setCornerActive] = useState({view:false,playerid: 0})


  const delay = ms => new Promise(res => setTimeout(res, ms));
  var isDisplaying = false;

  async function displayGoal(arg){
    setGoalActive({view:true,playerid:arg});
    isDisplaying = true;
    await delay(5000);
    setGoalActive({view:false});
    isDisplaying = false;
  }

  async function displayRed(arg){
    setRedActive({view:true,playerid:arg});
    isDisplaying = true;
    await delay(5000);
    setRedActive({view:false});
    isDisplaying = false;
  }

  async function displayYellow(arg){
    setYellowActive({view:true,playerid:arg});
    isDisplaying = true;
    await delay(5000);
    setYellowActive({view:false});
    isDisplaying = false;
  }

  async function displayCorner(arg){
    setCornerActive({view:true,playerid:arg});
    isDisplaying = true;
    await delay(5000);
    setCornerActive({view:false});
    isDisplaying = false;
  }
  
  useEffect(()=>{

    socket.on("goalevent", (arg) => {
      console.log(arg); // world
      console.log(isDisplaying);
      if (!isDisplaying){
        displayGoal(arg.id);
      }
      else{
        console.log('goal skipped');
      }
      
    });

    socket.on("redevent", (arg) => {
      console.log(arg); // world
      console.log(isDisplaying);
      if (!isDisplaying){
        displayRed(arg.id);
      }
      else{
        console.log('red skipped');
      }
      
    });

    socket.on("yellowevent", (arg) => {
      console.log(arg); // world
      console.log(isDisplaying);
      if (!isDisplaying){
        displayYellow(arg.id);
      }
      else{
        console.log('yellow skipped');
      }
      
    });

    socket.on("cornerevent", (arg) => {
      console.log(arg); // world
      console.log(isDisplaying);
      if (!isDisplaying){
        displayCorner(arg.id);
      }
      else{
        console.log('corner skipped');
      }
      
    });

    return () => {
      socket.off("goalevent");
      socket.off("redevent");
      socket.off("yellowevent");
      socket.off("cornerevent");
    };
  }, []);


  
  
  return (
    <div className='w-[1920] h-[1080]'>
      
      {/* more than one one will never be displaying at same time because of isDisplaying */}
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {goalactive.view && <GoalOverlay  goalactive={goalactive}/>}
      {/* <GoalOverlay  goalactive={goalactive}/> */}
    </AnimatePresence>
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {redactive.view && <RedOverlay  redactive={redactive}/>}
    </AnimatePresence>
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {yellowactive.view && <YellowOverlay  yellowactive={yellowactive}/>}
    </AnimatePresence>
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {corneractive.view && <CornerOverlay  corneractive={corneractive}/>}
      {/* <CornerOverlay  corneractive={corneractive}/> */}
    </AnimatePresence>
    
    </div>
  );
}

export default App;
