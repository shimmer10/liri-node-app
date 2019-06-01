/***********************
 * UNH Bootcamp
 * 
 * @author Jennifer Grace
 * 
 * Liri Node App
 ***********************/

// adding node dependencies
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var inquirer = require('inquirer');

inquirer.prompt([
    // Ask the user what they would like to do today
    {
        type: "list",
        message: "What should we search?",
        choices: ["Concerts", "Songs", "Movies", "Suprise Me"],
        name: "action"
    }
]).then(function (concertResponse) {
    var action = concertResponse.action;

    if (action === "Concerts") {
        inquirer.prompt([
            //We ask for the name of the artist
            {
                type: "input",
                message: "What artist would you like the concert information of?",
                name: "artist"
            }
        ]).then(function (artistResponse) {
            var artist = artistResponse.artist;
            var concertQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
            axios.get(concertQuery).then(function (bandsResponse) {
                for (var i = 0; i < bandsResponse.data.length; i++) {
                    var event = bandsResponse.data[i];
                    buildConcert(event);
                }
            })
                .catch(function (err) {
                    console.log(err);
                })
        });
    }
    if (action === "Songs") {
        inquirer.prompt([
            //We ask for the name of the song
            {
                type: "input",
                message: "What song would you like to search?",
                name: "song"
            }
        ]).then(function (songResponse) {
            var song = songResponse.song;
            if (song === "") {
                spotify
                    .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
                    .then(function (data) {
                        buildSong(data)
                    })
                    .catch(function (err) {
                        console.error('Error occurred: ' + err);
                    });
            }
            else {
                spotify.search({ type: 'track', query: song }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    for (var i = 0; i < data.tracks.items.length; i++) {
                        buildSong(data.tracks.items[i]);
                    }
                });
            }
        });
    }
    if (action === "Movies") {
        inquirer.prompt([
            //We ask for the name of the movie
            {
                type: "input",
                message: "What movie would you like to look up?",
                name: "movie"
            }
        ]).then(function (movieResponse) {
            var movie = movieResponse.movie;
            if (movie === "") {
                var movieQuery = "https://www.omdbapi.com/?apikey=trilogy&t=Mr. Nobody";
            }
            else {
                var movieQuery = "https://www.omdbapi.com/?apikey=trilogy&t=" + movie;
            }
            console.log(movieQuery)
            axios.get(movieQuery).then(function (movieResponse) {
                buildMovie(movieResponse.data);
            }).catch(function (err) {
                console.log(err);
            })
        });
    }
    if (action === "Suprise Me") {
        console.log("Suprise!!");
        // inquirer.prompt([
        //     //We ask for the name of the song
        //     {
        //         type: "input",
        //         message: "What movie would you like to search?",
        //         name: "movie"
        //     }
        // ]).then(function (movieResponse) {
        //     var movie = movieResponse.movie;
        //     console.log(movie);
        // });
    }
});

// create concert object
function Concert(venueName, venueLocation, eventDate) {
    this.venueName = venueName;
    this.venueLocation = venueLocation;
    this.eventDate = eventDate;
    this.displayConcert = function () {
        logConcert(this.venueName, this.venueLocation, this.eventDate);
    }
}

// pull data to build concert information
function buildConcert(event) {
    var venueName = event.venue.name;
    var venueLocation = event.venue.city;
    var eventDate = event.datetime;
    m = moment(eventDate).format('MMM Do YYYY')
    var concert = new Concert(venueName, venueLocation, m)
    concert.displayConcert();
}

// log concert information
function logConcert(venueName, venueLocation, eventDate) {
    console.log("\n---------------------------------\nVenue Name: " + venueName +
        "\nVenue Location: " + venueLocation + "\nEvent Date: " + eventDate +
        "\n---------------------------------\n");

}

// create song object
function Song(artist, songName, previewLink, album) {
    this.artist = artist;
    this.songName = songName;
    this.previewLink = previewLink;
    this.album = album;
    this.displaySong = function () {
        logSong(this.artist, this.songName, this.previewLink, this.album);
    }
}

// pull data to build song information
function buildSong(data) {
    var artist = data.album.artists[0].name;
    var songName = data.name;
    var previewLink = data.preview_url;
    var album = data.album.name;
    var song = new Song(artist, songName, previewLink, album);
    song.displaySong();
}

// log song information
function logSong(artist, songName, previewLink, album) {
    console.log("\n---------------------------------\nArtist Name: " + artist +
        "\nSong Name: " + songName + "\nSpotify Preview: " + previewLink +
        "\nAlbum Name: " + album + "\n---------------------------------\n");

}

// create movie object
function Movie(title, releaseYear, imdbRating, rottenTomatoes, countryProduced, language, plot, actors) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.imdbRating = imdbRating;
    this.rottenTomatoes = rottenTomatoes;
    this.countryProduced = countryProduced;
    this.language = language;
    this.plot = plot;
    this.actors = actors;
    this.displayMovie = function () {
        logMovie(this.title, this.releaseYear, this.imdbRating, this.rottenTomatoes, this.countryProduced, this.language, this.plot, this.actors);
    }
}

// pull data to build movie information
function buildMovie(movie) {
    var title = movie.Title;
    var releaseYear = movie.Year;
    var imdbRating = movie.imdbRating;
    if (null != movie.Ratings[2].Value) {
        var rottenTomatoes = movie.Ratings[2].Value;
    }
    else {
        var rottenTomatoes = "No Rotten Tomatoes rating available"
    }
    var countryProduced = movie.Country;
    var language = movie.Language;
    var plot = movie.Plot;
    var actors = movie.Actors;
    var movie = new Movie(title, releaseYear, imdbRating, rottenTomatoes, countryProduced, language, plot, actors);
    movie.displayMovie();
}

// log movie information
function logMovie(title, releaseYear, imdbRating, rottenTomatoes, countryProduced, language, plot, actors) {
    console.log("\n---------------------------------\nMovie Title: " + title +
        "\nRelease Year: " + releaseYear + "\nIMDB Rating: " + imdbRating +
        "\nRotten Tomato Rating: " + rottenTomatoes + "\nCountry Produced In: " + countryProduced +
        "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors +
        "\n---------------------------------\n");
}