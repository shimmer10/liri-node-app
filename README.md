# liri-node-app

## **This page is designed pull information based on user input**

### **This program starts by prompting the user for a choice**
     * The options are 'Concert', 'Song', 'Movie', or 'Suprise Me'
### **If the user chooses 'Concert' they will be prompted to enter an artist**
     * The input will be used to search the Bandsintown api
     * The concert information for that artist will be displayed in the console
     * Concert information includes:
        * Venue Name
        * Venue Location
        * Event Date
### **If the user chooses 'Song' they will be prompted to enter a song name**
     * The input will be used to search the node-spotify-api
        * If the user does not enter an artist, 'The Sign' by Ace of Base will be searched
     * The song information for that song will be diplayed in the console
     * Song information includes:
        * Artist Name
        * Song Name
        * Spotify Preview
        * Album Name
### **If the user chooses 'Movie' they will be prompted to enter the movie name**
     * The input will be used to search the omdb api
        * If the user does not enter a movie name, 'Mr. Nobody' will be searched
     * The movie information will be diplayed in the console
     * Movie information includes:
        * Movie Title
        * Release Year
        * Rotten Tomato Rating
        * Country Produced in
        * Language
        * Plot
        * Actors
### **If the user chooses 'Suprise Me'**
     * 