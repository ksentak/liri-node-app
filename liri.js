require("dotenv").config();
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//Capture command that the user inputs

var userInput = process.argv[2];
var userRequest = //Everything after process.argv[2]

console.log(userInput);
console.log(userRequest);

//Use switch or if statemnts

//Check if user input is "concert-this"
//Run API call to bands in town api
//Inject users search into the query URL
//Display name of venue, venue location, date of event
//Use moment to format date

//=================================================================================================================

//Check if user input is "spotify-this-song"
//Using spotify node package, make a call to spotify API
//Display song name, a preview link, the album
//Provide a defeault if no song is provided

//===================================================================================================================

//Check if user input is "movie-this"

//=====================================================================================================================

//Check if user input is "do-what-it-says"

