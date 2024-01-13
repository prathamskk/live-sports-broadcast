import {motion} from "framer-motion";

const Backdrop = ({children}) => {
return(
    <motion.div 
    className="relative w-[1920px] h-[1080px] bg-[#000000e1]"
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}>
        {children}
    </motion.div>
);
};

export default Backdrop