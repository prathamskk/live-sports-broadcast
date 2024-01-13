import { motion } from "framer-motion";
import Backdrop from "./backdrop";
import '../App.css';
import PlayerData from '../players.json'
import {ReactComponent as FootballSVG} from '../static/football.svg'

function GoalOverlay({goalactive}){
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
      
    let TeamName;
    if(goalactive.playerid>7){
        TeamName = "ARSENAL"
    }else{
        TeamName = "CHELSEA"
    }
    return (
      <Backdrop>
            <motion.div 
            initial={{
                opacity: 0,
                top: "-256px",
            }}
            animate={{
                opacity: 1,
                top: "800px",}}
            transition={{ 
                    type: 'tween',
                    ease: 'easeInOut', 
                    duration: 1, 
                    }}
            exit={{opacity: 0}}
            className='absolute right-32 parallelogram flex w-[660px] h-[110px] rounded-md bg-white'>
                    <div className={classNames(
                              goalactive.playerid>7 ? 'bg-orange-500' : 'bg-indigo-500',
                              'flex m-auto pr-10 overflow-hidden w-[630px] h-[80px] rounded-md  gap-3'
                            )}>
                        <img className='parallelogram-elements' src={goalactive.playerid>7?'https://uptwocat.com/img/logo1.png':'https://uptwocat.com/img/logo2.png'}/>
                        <h1 className='parallelogram-elements ml-4 my-auto text-5xl text-white font-mono font-bold'>{TeamName}</h1>
                    </div>
                    <img className='parallelogram-elements absolute bottom-0  right-16' src={PlayerData[goalactive.playerid-1].avatar}/>
            </motion.div>
            <motion.div 
            initial={{
                opacity: 0,
                right: "-256px",
            }}
            animate={{
                opacity: 1,
                right: "176px",}}
            transition={{ 
                    type: 'tween',
                    ease: 'easeInOut', 
                    duration: 1, 
                    }}
            exit={{opacity: 0}}
            className="absolute flex parallelogram top-[950px] w-[300px] h-[60px] bg-white rounded-md">
                <div className={classNames(
                              goalactive.playerid>7 ? 'bg-orange-500' : 'bg-indigo-500',
                              'm-auto w-[280px] h-[40px] rounded-md px-4'
                            )}>
                    <h1 className="text-right text-white text-4xl font-mono">{PlayerData[goalactive.playerid-1].name}</h1>
                </div>
                
            </motion.div>
            <motion.div 
            animate={{ rotate: 360 }}
            transition={{ 
                type: 'linear',
                ease: 'linear', 
                duration: 100, 
                repeat: Infinity }}
            className="absolute w-[900px] left-[-250px] -bottom-24"
            >
                <FootballSVG/>
            </motion.div>
            <motion.div 
            animate={{ 
                rotate: [0,1,0,-1,0],
                scale: [1,1.05,1,1.05,1], 
             }}
             transition={{ 
                type: 'linear',
                ease: 'easeInOut', 
                duration: 1, 
                repeat: Infinity }}
            className="absolute left-0 bottom-0 ">
                <h1 className="text-border text-[200px] font-extrabold text-lime-600 ">GOAL!</h1>
            </motion.div>
      </Backdrop>
    );
  };

  
  export default GoalOverlay;