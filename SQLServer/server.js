const express = require("express");
const cors = require("cors");
const DB = require("./Sql");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/conectUser/:user/:pass", async(req, res) =>
{
  console.log(`Connecting to user: ${req.params.user} with password: ${req.params.pass}`);
  await DB.conectUser(req.params.user, req.params.pass).then(async() =>
  {
    res.json({ message: "User connected." });
    await DB.createDatabase();
    DB.createNotesTable();
  }).catch((err) =>
  {
    res.json({ message: err });
  });

});

app.get("/insertNote/:title/:text/:id", (req, res) => 
{
  console.log(`Inserting note: ${req.params.title} with text: ${req.params.text} for user: ${req.params.id}`);
  DB.insertNote(req.params.id, req.params.title,  req.params.text);
  res.json({ message: "Note added." });
});

app.get("/deleteNote/:id", (req, res) => 
{
  console.log(`Deleting note: ${req.params.id}`);
  DB.deleteNote(req.params.id);
  res.json({ message: "Note deleted." });
});

app.get("/getNotes", async(req, res) => 
{
  console.log(`Getting notes`);
  const notes = await DB.getNotes();
  res.json(notes);
});

app.get("/updateNote/:title/:text/:id", async(req, res) =>
{
  console.log(`Updating note: ${req.params.id} with title: ${req.params.title} and text: ${req.params.text}`);
  await DB.updateNote(req.params.id, req.params.title,  req.params.text);
  res.json({ message: "Note updated." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});