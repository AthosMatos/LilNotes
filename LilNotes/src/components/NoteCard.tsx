import React,{useEffect} from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

interface NoteCardProps
{
    id: number;
    title: string;
    text: string;
    color?: string;
    deleteNote: (id:number) => void;
    updateNote: (id:number, title:string, text:string) => void;
}

const NoteCard = (props:NoteCardProps) =>
{
    const [title, setTitle] = React.useState(props.title);
    const [text, setText] = React.useState(props.text);

    useEffect(() =>
    {
        if(title === props.title && text === props.text)return;
        //console.log(`Title: ${title} Text: ${text}`)
        props.updateNote(props.id,title,text)

    },[title,text])

    return (
        <div 
        style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1vw 1vw 2vw 1vw',
        }}>
            <div 
            style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                marginBottom: '1vw',
            }}
            onClick={() =>props.deleteNote(props.id)}
            >
                <p style={{color:'black', marginRight:'0.2vw'}}>Delete</p>

                <motion.div 
                whileHover={{scale:1.05}} 
                whileTap={{scale:0.94}}
                style={{
                    cursor: 'pointer',
                    width: '1.4vw',
                    height: '1.4vw',
                    backgroundColor: 'red',
                    borderRadius: '500rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                }}>
                    <AiOutlineClose size='1vw' color='white'/>
                </motion.div >
            </div>

            <motion.div 
            whileHover={{scale:1.1}}
            key={props.id}
            
            transition={{type:'tween'}}
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            style={{
                display: 'flex',
                width: '13vw',
                height: 'fit-content',
                minHeight: '14vw',
                background: '#FFD88E',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '6px',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                
                <p 
                suppressContentEditableWarning
                style={{
                    maxWidth: '80%',
                    fontSize: '2vw',
                    margin: '0px',
                    marginTop: '20px',
                    cursor: 'pointer',
                }}
                contentEditable 
                onBlur={(e)=>setTitle(e.currentTarget.innerText)}>
                    {props.title}

                </p>

                <p 
                suppressContentEditableWarning
                style={{
                    maxWidth: '80%',
                    fontSize: '1.2vw',
                    margin: '0px',
                    marginTop: '10px',
                    color: '#826A3E',
                    marginBottom: '20px',
                    cursor: 'pointer',
                }}
                contentEditable 
                onBlur={(e)=>setText(e.currentTarget.innerText)}>
                    {props.text}

                </p>
            </motion.div>
        </div>
    )
}

export default NoteCard;