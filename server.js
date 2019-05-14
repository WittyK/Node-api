'use strict';

require('dotenv').config();
//require 'dotenv' needs to be above that uses .env

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();

app.use(cors());
//cors is for baseline protection

app.get('/', (request, response) => {
  response.send('Hello');
});

app.get('/location', (request, response) => {
  try {
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
  }
  catch(error) {
    console.error(error);
    response.status(500).send('Status: 500. Sorry, something went wrong');
  }
});

function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = {
    search_query: query,
    formatted_query: geoData.results[0].formatted_address,
    latitude: geoData.results[0].geometry.location.lat,
    longitude: geoData.result[0].geometry.location.lng,
  }
  console.log(location);
  // return location;
}


// // Helper Functions
// function searchToLatLong(query) {
//   const geoData = require('./data/geo.json');
//   const location = {
//     search_query: query,
//     formatted_query: geoData.results[0].formatted_address,
//     latitude: geoData.results[0].geometry.location.lat,
//     longitude: geoData.results[0].geometry.location.lng
//   };
//   return location;
// }

// // Refactor the searchToLatLong function to replace the object literal with a call to this constructor function:
// // function Location(query, geoData) {
// //   this.search_query = query;
// //   this.formatted_query = geoData.result[0].formatted_address;
// //   this.latitude = geoData.results[0].geometry.location.lat;
// //   this.longitude = geoData.results[0].geometry.location.lng;
// // }

// // Make sure the server is listening for requests
// app.listen(PORT, () => console.log(`App is listening on ${PORT}`) );

// 'use strict';

// const PORT = process.env.PORT;

// const app = express();

// app.get('/location', (response, request) => {
//     response.send('')
// }
// );
