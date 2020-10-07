# Moodify

Moodify is a single-page application built using React and Styled-Components. It allows users to filter through their Spotify playlists using custom filtering based on Spotify's audio features data. Users can also create new playlists, create their own custom filter presets, or apply and like existing presets. Data is persisted by the API server using a PostgreSQL database. 

A live version of Moodify can be found at [moodify.ca](https://moodify.ca).

## Team

### [Jeffrey Cao](https://github.com/jeffreycao1998)
### [Scott Grunerud](https://github.com/ScottGrun)
### [Tania Nardandrea-Isakovic](https://github.com/rtnrtn)

## Final Product

### Landing Page
![landing page](https://github.com/ScottGrun/moodify/blob/master/client/docs/landing.png?raw=true)

### Main Page On Login
![screenshot]()

### Adjust Sliders to Filter Music
![screenshot]()

### Save Values of Adjusted Sliders as a Preset (Save Preset Modal)
![screenshot]()

### Presets Dropdown: Your Presets
![screenshot]()

### Save Filtered Songs as a New Playlist (Create Playlist Modal)
![screenshot]()

### Select Different Playlist On Sidebar
![screenshot]()

### Apply a Preset From Popular Presets to Filter Music
![screenshot]()

### Right Click On Track For Options
![screenshot]()

## Tech Stack

- React
- Styled-Components
- Node.JS
- Express
- PostgreSQL

## Dependencies

- axios
- chart.js
- cookie-parser
- cors
- dotenv
- express
- material-ui
- node-sass
- pg 
- pg-native
- querystring
- react-chartjs-2
- react-cookie
- react-dom
- react-elastic-carousel
- react-ga
- react-scripts
- request
- styled-components
- tippyjs
- uuid

## Setup

1. Create your .env file by referencing the .env.example. You'll need to set up a database and get a Spotify API key/secret.  
2. Install dependencies in both `client` and `server` directories using `npm install`. 
3. Create the database, then set and seed the database using `npm run db:reset`. 
4. From the `client` directory: `npm start`.
5. From the `server` directory: `npm run server`.
6. Visit `http://localhost:3000/`
