// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")

//Link our files 
//==========================================
var db = require("./02-Homework/Develop/db/db.json")


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
//=============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//==========================================================

// SET PARAMETERS:
//======================================================


// ROUTES:
//=====================================
//1.GET

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db.json"))
})

//2.POST

app.post("/api/notes", function(req, res) {

});

//3.DELETE 

app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id
});

// write with fs
//====================================================





//listen:
//======================================================

app.listen(PORT, function() {
    console.log("App port listening on PORT " + PORT)
});