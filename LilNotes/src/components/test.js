import { useState, useEffect } from "react";
import NoteCard from "./NoteCard";

const Note = () =>
{
    return(
        <div style={{
            width: "100px",
            height: "100px",
            backgroundColor: "red",
            margin: "10px",
        }}>
            <h1>Test</h1>
        </div>
    )
}


const Test = () =>
{
    const [Notes, setNotes] = useState([<Note/> ,<Note/>, <Note/>, <Note/>]);

    return(
        <div style={{
            display: "flex",
        }}>
            {Notes.map((note) => {
                return note
            })}
        </div>
    );
}

export default Test;