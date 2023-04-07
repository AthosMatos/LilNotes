import React,{useEffect} from 'react';
import server from './server';
import NoteCard from './NoteCard';
import PlusNote from './PlusNote';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

export interface notesInterface 
{
    id: number;
    title: string;
    text: string;
    plusComponent?: JSX.Element;
}
interface Notes2Props
{
    logedIn:boolean;
}
const Notes2 = (props:Notes2Props) =>
{
    const [notes, setNotes] = React.useState<notesInterface[]>([{id:-1, text:'', title:'', plusComponent:<PlusNote insertNote={insertNote}/>}]);

    useEffect(() => 
    {
        if(props.logedIn === false)return;

        console.log('Getting notes from server');
        server.getNotes().then((data) =>
        {
            setNotes([...data, ...notes]);
        })
    } ,[props.logedIn]);

    function insertNote()
    {
        let randomId = Math.floor(Math.random() * 200) + 1;
    
        while(true)
        {
            if(notes.find((note) => note.id === randomId) === undefined)break;
            randomId = Math.floor(Math.random() * 200) + 1;
        }
        const note:notesInterface = 
        {
            id: randomId,
            text: 'Loren',
            title: 'New Note',
        }
        setNotes((notes) => 
        {
            let newNotes = [...notes];
            newNotes.pop();
            newNotes.push(note);
            newNotes.push({id:-1, text:'', title:'', plusComponent:<PlusNote insertNote={insertNote}/>});
            return newNotes;
        }); 
        
       
        server.insertNote(note.id,note.title,note.text)
    }

    function deleteNote(id:number)  
    {
        setNotes((notes)=>
        {
            let newNotes = [...notes];
            newNotes.pop();
            newNotes = newNotes.filter((note) => note.id !== id);
            newNotes.push({id:-1, text:'', title:'', plusComponent:<PlusNote insertNote={insertNote}/>});
            return newNotes;
        });
       
        server.deleteNote(id);
    };

    function updateNote(id:number, title:string, text:string) 
    {
        const NoteIndex = notes.findIndex((note) => note.id === id);
        const updatedNote = { ...notes[NoteIndex] };
        updatedNote.text = text;
        updatedNote.title = title;
        const updatedNotes = [...notes];
        updatedNotes[NoteIndex] = updatedNote;
        setNotes(updatedNotes);
        server.updateNote(id, title, text);
    }

    function separateElement() 
    {
        const columns = 6;
        let separateElements = [];

        if(!notes.length)return <></>
    
        for (let i = 0; i < columns; i++) {
            let oneColumn = [];
            for (let j = i; j < notes.length; j += columns) 
            {
                const item = notes[j];
                console.log(`id: ${item.id} title: ${item.title} text: ${item.text} `)
                if(item.plusComponent) oneColumn.push(item.plusComponent);
                else 
                {
                    oneColumn.push(
                        <NoteCard
                        deleteNote={deleteNote}
                        updateNote={updateNote}
                        id={item.id}
                        key={item.id}
                        title={item.title} 
                        text={item.text} 
                        // color={item.color}
                        /> 
                    ) 
                }
             
            }
            separateElements.push(<div> {oneColumn}</div>);
        }
        return separateElements;
    }

    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          
        }}>
            <p style={{
                alignSelf: 'flex-start',
                fontSize: '2.0vw',
                marginBottom: '2.6rem',
            }}>Fast Notes</p>

            <div style={{
                display: 'flex',
            }}>
                
                {separateElement()}
              

            </div>
        </div>
    )
}

export default Notes2;