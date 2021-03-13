const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  const url = 'https://freegeoip.app/json/' + ip;
  return request(url);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
  // const issPasses = JSON.parse(body).response
  // printPassTimes(issPasses);
};




  // // success, print out the deets!

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };