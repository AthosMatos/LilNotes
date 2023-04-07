import axios from 'axios';

class server 
{
    public static login = (username: string, password: string) => new Promise<any>(async (resolve, reject) =>
    {
        // Login to server
        axios.get(`http://127.0.0.1:8080/conectUser/${username}/${password}`).then(response => 
        {
            //console.log(response.data.message);
            if(response.data.message.includes("denied"))
            {
                reject('denied');
                return
            }
            console.log(`Logged in as ${username}`);
            resolve(response.data);
            return
        })
    })

    public static insertNote = (id: number, title: string, text: string)=> new Promise<any>(async (resolve,reject)=>
    {
        // Insert note into database
        axios.get(`http://127.0.0.1:8080/insertNote/${title}/${text}/${id}`).then(response => 
        {
            console.log(`Inserted note with id: ${id} `);
            this.getNotes().then((notes)=>
            {
                resolve(notes);
                return
            }); // Refresh
        })
    })

    public static getNotes = () => new Promise<any[]>(async (resolve, reject) =>
    {
        // Get notes from database
        axios.get(`http://127.0.0.1:8080/getNotes`).then(response =>
        {
            /* response.data.forEach((note: any) => {
                console.log(`Note: ${note.title} ${note.text} ${note.id}`);
            });
        */
            resolve(response.data);
            return
        })
    })

    public static deleteNote = (id: number)=> new Promise<any>(async (resolve,reject)=>
    {
        // Delete note from database
        axios.get(`http://127.0.0.1:8080/deleteNote/${id}`).then(response =>
        {
            console.log(`Deleted note with id: ${id} `);
            this.getNotes().then((notes)=>
            {
                resolve(notes);
                return
            }); // Refresh
        })
    })

    public static updateNote = (id: number, title: string, text: string)=> new Promise(async (resolve,reject)=>
    {
        // Insert note into database
        axios.get(`http://127.0.0.1:8080/updateNote/${title}/${text}/${id}`).then(response => 
        {
            console.log(`Updated note with id: ${id} `);
            resolve(response.data);
            return
        })
    })
}

export default server;