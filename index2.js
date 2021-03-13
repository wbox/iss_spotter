const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(nextISSTimesForMyLocation)
//   .catch(error => console.log(error))

const printPassTimes = (issPasses) => { 
  //console.log(issPasses);
  for (var t of issPasses) {
    // Uncomment the following 2 lines if you want to see the original format proposed for this challenge
    var date = new Date(t['risetime']*1000);
    console.log(`Next pass at ${date} for ${t.duration} seconds!`);
  
    // Uncoment the following 3 lines if you want to see the messages with North America format and the time as HH:MM:SS
    // let time = new Date(t.duration * 1000).toISOString().substr(11, 8);
    // let date = new Date(t.risetime*1000).toLocaleString("en-US", {timeZone: 'America/Toronto'});
    // console.log(`Next pass at ${date} for ${time}`);
  }

}

nextISSTimesForMyLocation()
  .then((issPasses) => {
    printPassTimes(issPasses);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


