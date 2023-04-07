const mysql = require('mysql2');
const databaseName = 'lilnotes';

class DB 
{
  static con

  static conectUser = (user, pass) => new Promise((resolve, reject) =>
  {
    //console.log(`Connecting to user: ${user} with password: ${pass}`)
    var con = mysql.createConnection({
      host: "localhost",
      user: user,
      password: pass,
    });

    con.connect(function(err) {
      try {
        if (err) throw err.message;
        console.log("Connected!");
        resolve('Connected!');
      } catch (err) 
      {
        if(err.includes('Access denied'))
        {
          err = 'Access denied for user';
        }
        reject(err);
      }
    });

    this.con = con
  })

  static createDatabase = () => new Promise((resolve, reject) =>
  {
    const con = this.con
    con.query(`SHOW DATABASES LIKE '${databaseName}'`, (err, rows) => 
    {
      if (err) 
      {
        console.log(err);
        return;
      }

      if (rows.length === 0) 
      {
        con.query(`CREATE DATABASE ${databaseName}`, (err) => 
        {
          if (err) 
          {
            console.log(err);
            return;
          }
          console.log(`Database '${databaseName}' created`);
        });
      } 
      else 
      {
        console.log(`Database '${databaseName}' already exists`);
      }

      con.query(`USE ${databaseName}`, (err) =>
      {
        if (err) 
        {
          console.log(err);
          return;
        }
      });
    });

    resolve('Database created!');
  })

  static createNotesTable ()
  {
    const qury = `SELECT * FROM information_schema.tables WHERE table_schema = 'lilnotes' AND table_name = 'notes';`
    const con = this.con

    con.query(qury, function (err, result, fields)
    {
      if (err) throw err;

      if (result.length > 0) console.log("Table exists");
      else
      {
        console.log("Table does not exist");
        const query = `
          CREATE TABLE notes (
          id int,
          title varchar(20),
          text varchar(2000)
          );`;

          con.query(query, function (err, result, fields) {
          if (err) throw err;
        }); 
      }
    }); 
  }

  static insertNote(id, title, text)
  {
    const con = this.con

    con.query(`SELECT * FROM notes WHERE id = '${id}'`, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
    
      if (rows.length > 0)console.log(`Value '${id}' exists in the table`);
      else 
      {
        const q2 = ` INSERT INTO notes VALUES ('${id}', '${title}', '${text}');`
        con.query(q2); 
      }
    });
  }

  static deleteNote(id)
  {
    const con = this.con
    con.query(`DELETE FROM notes WHERE id = '${id}'`, function (err, result, fields) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  }

  static getNotes = () => new Promise((resolve, reject) =>
  {
    const con = this.con
    con.query("SELECT * FROM notes", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      resolve(result);
    });
  })

  static updateNote = (id, title, text) => new Promise((resolve, reject) =>
  {
    const con = this.con
    con.query(`UPDATE notes SET title = '${title}', text = '${text}' WHERE id = '${id}'`, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      resolve(result);
    });
  })
}


module.exports = DB;

