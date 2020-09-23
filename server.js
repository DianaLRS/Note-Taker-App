//Dependencies
const path = require("path")
const express = require("express");
const fs = require("fs")
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// ==============================================================================

// Setting the express server
const app = express();
//========================================================================
// Adding the port 
const PORT = process.env.PORT || 8000;

//==================================================================

// Handling parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


// ================================================================================
// ROUTES



// =============================================================================
// LISTENER 

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});