import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";

interface plusNoteProps
{
    insertNote: () => void;
}

const plusNote = (props:plusNoteProps)=>
{
    
    return (
        <motion.div 
        layout
        onClick={() => props.insertNote()}
        style={{
            cursor: 'pointer',
            width: '14vw',
            height: '14vw',
            //backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <p style={{
                fontSize: '1.2vw',
                color: '#B8B8B8',
            }}>New fast Note
            </p>
            <AiOutlinePlus size='3rem' color='#B8B8B8'/>
        </motion.div >
    )
}

export default plusNote