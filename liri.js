require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require('moment'); 
moment().format();

//Capture commands that the user inputs
var nodeArgs = process.argv;
var userCommand = process.argv[2];
var userSearch = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        userSearch = userSearch + "+" + nodeArgs[i];
    } else {
        userSearch += nodeArgs[i];
    }
}
// console.log(userCommand);
// console.log(userSearch);

//Adds line space
console.log("\n");

//Switch between movie, spotify, concert, and do what it says
switch (userCommand) {
    case "movie-this":
        if (userSearch == "") {
            console.log("If you haven't watched 'Mr. Nobody', then you should!");
            console.log("It's on Netflix!");
            userSearch = "Mr. Nobody"
        }
        movieThis(userSearch);  
      break;

    case "concert-this":       
        concertThis(userSearch);
        break;

    case "spotify-this-song":
        if (userSearch == "") {
            userSearch = "the+sign";
        }
        spotifyThisSong(userSearch); 
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        var unrecognized = "Not a recognized command...";
        console.log(unrecognized)
}

//Movie-this function that grabs movie data from omdb
//=====================================================================================================================
function movieThis() {
    axios.get("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy").then(
        function (movieResponse) {
            console.log("\n Title: " + movieResponse.data.Title);
            console.log("\n Release Year: " + movieResponse.data.Year);
            console.log("\n IMDB Rating: " + movieResponse.data.imdbRating);
            console.log("\n Country: " + movieResponse.data.Country);
            console.log("\n Language: " + movieResponse.data.Language);
            console.log("\n Plot: " + movieResponse.data.Plot);
            console.log("\n Actors: " + movieResponse.data.Actors);
            //Current rotten tomatoes rating not clean!!
            console.log(movieResponse.data.Ratings[1]);
     })
}
//=====================================================================================================================

//Concert-this function that grabs concert data from bands-in-town
//=====================================================================================================================
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
            function (concertResponse) {
                var dateTime = moment(concertResponse.data[0].datetime);
                console.log("Here is where " + userSearch + " is playing next:");
                console.log("\n Venue: " + concertResponse.data[0].venue.name);
                console.log("\n Location: " + concertResponse.data[0].venue.city);
                console.log("\n Date: " + dateTime.format("MM-DD-YYYY"));
    })
}
//=====================================================================================================================

//Spotify-this-song function that grabs track data from the spotify API
//=====================================================================================================================
function spotifyThisSong() {
    spotify.search({ type: "track", query: userSearch, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < 5; i++){
            var n = i+1;
            console.log(n);
            console.log("\n Artist: " + data.tracks.items[i].artists[0].name);
            console.log("\n Song: " + data.tracks.items[i].name);
            console.log("\n Preview Here: " + data.tracks.items[i].preview_url);
            console.log("\n Album: " + data.tracks.items[i].album.name);
            console.log("-----------------------------------------");
        }
    });
}
//====================================================================================================================

//Do-what-it-says function that grabs information from txt file and gives automated userCommand and userSearch
//=====================================================================================================================
function doWhatItSays () {
fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var output = data.split(",");
    
    // console.log(output[0]);
    // console.log(output[1]);

    userSearch = output[1];
    spotifyThisSong(userSearch);    
});
}
//=====================================================================================================================