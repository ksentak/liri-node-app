require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

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

console.log(userCommand);
console.log(userSearch);

//Switch between movie, spotify, concert, and do what it says
switch (userCommand) {
    case "movie-this":
        movieThis(userSearch);  
      break;

    case "concert-this":
        concertThis(userSearch);
        break;

    case "spotify-this-song":
        spotifyThisSong(userSearch);    
        break;

    case "do-what-it-says":
        doWhatItSays(userSearch);
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
            // console.log("\n Rotten Tomatoes Rating: "+movieResponse.data.Title);
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
                console.log("Here is where " + userSearch + " is playing next:");
                console.log("\n Venue: " + concertResponse.data[0].venue.name);
                console.log("\n Location: " + concertResponse.data[0].venue.city);
                //Make sure to use moment.js to rearrange date format
                console.log("\n Date: " + concertResponse.data[0].datetime);
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
        //    for (i = 0; i < data.tracks.length; i++){
        //        console.log("\n Artist: " + data.tracks.artists[i]);
        //    }


        console.log(data.tracks);
        console.log(data.tracks[0].artists);

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
    userCommand = output[0];
    userSearch = output[1];
    console.log(userCommand);
    console.log(userSearch);
});
}
//=====================================================================================================================