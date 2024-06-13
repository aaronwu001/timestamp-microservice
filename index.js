// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date", function (req, res) {

  const url = req.params.date;

  if (isValidUnixTimestamp(url)) {
    let timestamp = parseInt(url);
    let date = new Date(timestamp);
    let utcTime = date.toUTCString();
    res.json({"unix": timestamp, "utc": utcTime});

  } else if (isValidDateFormat(url)) {
    const date = new Date(url + "T00:00:00Z");
    const unix_time = parseInt(date.getTime());
    const utc_time = date.toUTCString();
    res.json({"unix": unix_time, "utc": utc_time});
  } else {
    res.json({"error": "Invalid Date"});
  }
});


function isValidUnixTimestamp(url) {
  const regex = /(\d{13})/;
  const match = url.match(regex);

  if (match) {
      // Parse the extracted timestamp as an integer
      const timestamp = parseInt(match[1], 10);

      // Create a Date object using the timestamp
      const date = new Date(timestamp);

      // Check if the date is valid
      if (!isNaN(date.getTime())) {
          return true;
      }
  }
  return false;
}

function isValidDateFormat(url) {
  // Define the regex pattern for "YYYY-MM-DD"
  const regex = /(\d{4})-(\d{2})-(\d{2})/;

  // Extract the date part from the URL
  const match = url.match(regex);

  if (match) {
      // Extract the year, month, and day
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const day = parseInt(match[3], 10);

      // Create a Date object using the extracted values
      const date = new Date(year, month - 1, day);

      // Validate the date components
      if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
          return true;
      }
  }
  return false;
}



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
