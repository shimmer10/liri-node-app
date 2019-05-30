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
]).then(function (inquirerResponse) {
    var action = inquirerResponse.action;
    console.log(action);
});