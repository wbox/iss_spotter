const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
// use request to fetch IP address from JSON API
  const url = "https://api.ipify.org?format=json";
  request(url, (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null,ip);

  });
};


const fetchCoordsByIP = (ip, callback) => {
  const url = 'https://freegeoip.app/json/' + ip;
  // 174.93.123.128'
  request(url, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = Error(`Status Code ${response.statusCode} when fetching coordiates for IP. Response: ${body}`);
      callback(msg, null);
      return;
    }

    // const latitude = JSON.parse(body).latitude;
    // const longitude = JSON.parse(body).longitude;

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = Error(`Status Code ${response.statusCode} when fetching ISS pass over information. Response: ${body}`);
      callback(msg, null);
      return;
    }

    const issPasses = JSON.parse(body).response;
    callback(null, issPasses);

  });

};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = function(callback) {
  // Get ip
  fetchMyIP((error, ip) => {
    if (error) {
      console.log('Error:', error);
      return;
    } else {

      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          console.log('Error:', error);
          return;
        } else {

          fetchISSFlyOverTimes(coords, (error, times) => {
            if (error) {
              console.log('Error:', error);
              return;
            } else {
              callback(false,times);
            }
          });
        }
      });
    }
  });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
