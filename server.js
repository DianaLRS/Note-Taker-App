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

})



//API POST Requests:

app.post("/api/notes", function(req, res) {
    // fs read file 
    var newNote = req.body;
    newNote.id = 6;
    fs.readFile("./db/db.json", (err, fileData) => {


        var parsedData = JSON.parse(fileData);

        parsedData.push(newNote);

        var stringData = JSON.stringify(parsedData);

        fs.writeFile("./db/db.json", stringData, function() {
            return res.json("./db/db.json");
        })
    })



    //parse data 
    // push new note into parse data

    //convert data back into a string
    //fs.writefile to write new string back into JSON file
    //return new note to client


})

//API DELETE Requests: 
app.delete("/api/notes/:id", function(req, res) {

    var currentNoteID = req.params.id;
    //read data
    fs.readFile("./db/db.json", (err, fileData) => {


        var parsedData = JSON.parse(fileData);

        // array.filter(function(currentValue, index, arr), thisValue)

        var filterdData = parsedData.filter(data => data.id != currentNoteID);

        var stringData = JSON.stringify(filterdData);

        fs.writeFile("./db/db.json", stringData, function() {
                return res.json("./db/db.json");
            })
            //parse data
            //.filter method to return everything based on conditions (id) // where id =/= currentNoteID. filter automatically deletes
            //rewrite notes to db.json\

    })
});


// =============================================================================
// LISTENER 

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});