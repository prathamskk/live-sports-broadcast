import { motion } from "framer-motion";
import Backdrop from "./backdrop";
import '../App.css';
import PlayerData from '../players.json'


const YellowOverlay = ({yellowactive}) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
    let TeamName;
    if(yellowactive.playerid>7){
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
                              yellowactive.playerid>7 ? 'bg-orange-500' : 'bg-indigo-500',
                              'flex m-auto pr-10 overflow-hidden w-[630px] h-[80px] rounded-md  gap-3'
                            )}>
                        <img className='parallelogram-elements' src={yellowactive.playerid>7?'https://uptwocat.com/img/logo1.png':'https://uptwocat.com/img/logo2.png'}/>
                        <h1 className='parallelogram-elements ml-4 my-auto text-5xl text-white font-mono font-bold'>{TeamName}</h1>
                    </div>
                    <img className='parallelogram-elements absolute bottom-0  right-16' src={PlayerData[yellowactive.playerid-1].avatar}/>
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
                              yellowactive.playerid>7 ? 'bg-orange-500' : 'bg-indigo-500',
                              'm-auto w-[280px] h-[40px] rounded-md px-4'
                            )}>
                    <h1 className="text-right text-white text-4xl font-mono">{PlayerData[yellowactive.playerid-1].name}</h1>
                </div>
                
            </motion.div>
            <motion.div 
            animate={{ rotate: [24,16,24]}}
            transition={{ 
                type: 'linear',
                ease: 'easeInOut', 
                duration: 3, 
                repeat: Infinity }}
            className="absolute w-[400px] h-[600px] rotate-[20] left-0 -bottom-24 rounded-3xl bg-yellow-500"
            >
            </motion.div>
            <motion.div
            initial={{
                left: "-600px"
            }} 
            animate={{ 
                left: "50px"

             }}
             transition={{ 
                type: 'linear',
                ease: 'easeInOut', 
                duration: 1}}
            className="absolute top-0 ">
                <h1 className="text-border text-[200px] font-extrabold text-yellow-500 ">YELLOW CARD</h1>
            </motion.div>
      </Backdrop>
    
        );
    };
  
      
  export default YellowOverlay;