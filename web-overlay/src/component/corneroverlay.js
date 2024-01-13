import { motion } from "framer-motion";
import Backdrop from "./backdrop";
import '../App.css';
import PlayerData from '../players.json'
import {ReactComponent as RedFlagSVG} from '../static/red-flag.svg'


const CornerOverlay = ({corneractive}) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
    let TeamName;
    if(corneractive.playerid>7){
        TeamName = "ARSENAL"
    }else{
        TeamName = "CHELSEA"
    }
    return (
        <Backdrop>
            
            <motion.div 
            animate={{ rotate: [24,16,24]}}
            transition={{ 
                type: 'linear',
                ease: 'easeInOut', 
                duration: 3, 
                repeat: Infinity }}
            className="absolute w-[600px] rotate-[20] left-0 -bottom-32"
            >
                <RedFlagSVG/>
            </motion.div>
            <motion.div
            initial={{
                right: "-600px"
            }} 
            animate={{ 
                right: "50px"

             }}
             transition={{ 
                type: 'linear',
                ease: 'easeInOut', 
                duration: 1}}
            className="absolute right-0 bottom-0 ">
                <h1 className="text-border text-[200px] font-extrabold text-lime-600 ">CORNER!</h1>
            </motion.div>
      </Backdrop>
    
        );
    };
  
      
  export default CornerOverlay;