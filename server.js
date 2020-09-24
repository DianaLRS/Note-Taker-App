//Dependencies
const path = require("path")
const express = require("express");
const fs = require("fs");

//=============================================================================

//Path
const db = path.join(__dirname, "/db")
const mainPath = path.join(__dirname, "/public")

// ==============================================================================

// Setting the express server
const app = express();
//===============================================================================
// Adding the port 
const PORT = process.env.PORT || 8000;

//==============================================================================

// Handling parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


// ================================================================================
// OUR ROUTES

// HTML GET Requests:
app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainPath, "notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(mainPath, "index.html"));
});

//API GET Requests:
app.get("/api/notes", function(req, res) {
    //google return json files using app.get
    res.sendFile(path.join(__dirname, "/db/db.js"))
    return res.body
})

//API POST Requests:
app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    return res.json(savedNotes);
})


//API DELETE Requests: 
app.delete("/api/notes/:id", function(req, res) {

    //read data
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })

    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    return res.json(savedNotes);
});


// =============================================================================
// LISTENER 

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});