var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var PORT = process.env.PORT || 3000;

// Serve static content for the app from the "app" directory in the application directory.
app.use(express.static("app"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
