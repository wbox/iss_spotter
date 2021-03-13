const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  //console.log(passTimes);
  for (var t of passTimes) {
    // Uncomment the following 2 lines if you want to see the original format proposed for this challenge
    var date = new Date(t['risetime']*1000);
    console.log(`Next pass at ${date} for ${t.duration} seconds!`);

    // Uncoment the following 3 lines if you want to see the messages with North America format and the time as HH:MM:SS
    // let time = new Date(t.duration * 1000).toISOString().substr(11, 8);
    // let date = new Date(t.risetime*1000).toLocaleString("en-US", {timeZone: 'America/Toronto'});
    // console.log(`Next pass at ${date} for ${time}`);
  }
});