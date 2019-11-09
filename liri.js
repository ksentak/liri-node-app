require("dotenv").config();
var keys = require("./keys.js");
// var spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//Capture commands that the user inputs
var nodeArgs = process.argv;
var userCommand = process.argv[2];
var userSearch ="";

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
    //Use omdb api to "movie-this"
    case "movie-this":
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
        break;

    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
            function (concertResponse) {
                console.log("Here is where " +userSearch+ " is playing next:");
                console.log("\n Venue: " + concertResponse.data[0].venue.name);
                console.log("\n Location: " + concertResponse.data[0].venue.city);
                //Make sure to use moment.js to rearrange date format
                console.log("\n Date: " + concertResponse.data[0].datetime);
            })
        break;

    case "spotify-this-song":
        outputNum = parseFloat(num1) * parseFloat(num2);
        break;

    case "do-what-it-says":
        outputNum = parseFloat(num1) / parseFloat(num2);
        break;

    default:
        var unrecognized = "Not a recognized command...";
        console.log(unrecognized)
}



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

//Check if user input is "do-what-it-says"

