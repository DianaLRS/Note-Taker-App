// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs")

//Link our files 
//==========================================
const db = require("./develop/db/db.json")
const mainDir = path.join(__dirname, "/public");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
//=============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"))
    //==========================================================

// SET PARAMETERS:
//======================================================


// ROUTES:
//=====================================
//1.GET

app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));

});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));


});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/db/db.json"))
        //return all saved notes

})

app.get("/api/notes/:id", function(req, res) {
    res.sendFile(path.join(__dirname, ""))
})

//2.POST

app.post("/api/notes", function(req, res) {

});

//3.DELETE 

app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id
});

//listen:
//======================================================

app.listen(PORT, function() {
    console.log("App port listening on PORT " + PORT)
});