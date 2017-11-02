// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Intial friend data 
// =============================================================
var friends = [
  {
    name: "Gandalf",
    photo: "https://vignette.wikia.nocookie.net/lotr/images/8/8d/Gandalf-2.jpg/revision/latest?cb=20130209172436",
    scores: [1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: "Aragorn",
    photo: "https://vignette.wikia.nocookie.net/lotr/images/6/69/Aragorn_2_-_FOTR.png/revision/latest?cb=20130320004849",
    scores: [2,2,2,2,2,2,2,2,2,2]
  },
  {
    name: "Frodo Baggins",
    number: "https://seekinggoddailyblog.files.wordpress.com/2016/07/1b9384b6de87ab45a1391d454bd695c5.jpg",
    scores: [3,3,3,3,3,3,3,3,3,3]
  },
  {
    name: "Legolas",
    number: "https://i.pinimg.com/736x/04/80/29/048029f362c484a2a46b928afbe98837--orlando-bloom-legolas-eye-candy.jpg",
    scores: [4,4,4,4,4,4,4,4,4,4]
  }
];

// Routes
// =============================================================

// Unpsecified route sends the user to the main page 
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/survey.html"));
});

// Returns the friends table 
app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

// matches friends with one another 
app.post("/api/friends", function(req, res) {
  
  // The request body (req.body) equals the JSON post sent from the user
  var newFriend = req.body;  

  //verifying what was sent from the html
  console.log(newFriend);

  // Array for storing the friend that matches closest; first value is matchValue, second value is friend
  var match = [51, 0];

  // Variable for storing the match value 
  var matchValue = 0; 

  // Cycles through all friends
  for (i = 0; i <= friends.length; i++){

    // Cycles through scores of the user and the friend 
    for (j = 0; j <= 10; j++) {

      // Debugging 
      console.log(matchValue);
      console.log(newFriend.scores[j]);

      // Finds the difference between the user score and friend score, returns absolute value, and adds that value to matchValue
      matchValue = matchValue + (Math.abs(newFriend.scores[j] - friends[i].scores[j]))

      //logs final match value to console 
      console.log(friend[i].name + " " + matchValue);

      // Checks to see if the current friend's match value is less than the friend who is in there
      if (matchValue < match[0]){
        match[0] = matchValue;
        match[1] = i;  //set the best match to the current friend 
      }

      // Resets the match value 
      matchValue = 0;

    } // Ends the for loop that cycles through scores 
  } // Ends the for loop that cycles through friends 

  var bestMatch = match[1];

  // Returns the friend with the lowest score 
  res.json(friends[bestMatch]);

});

// Clears the data in the friends table 
app.post("/api/clear", function(req, res) {

  friends = [];

});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
