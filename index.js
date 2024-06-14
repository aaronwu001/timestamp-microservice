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
  const date = new Date(url);

  if (isNaN(date.getTime())) {
    date = new Date(parseInt(url));
  }
  
  if (!isNaN(date.getTime())) {
    // if date is valid
    let utcDate = date.toUTCString();
    let unixTime = date.getTime();
    res.json({"unix": unixTime, "utc": utcDate});
  } else {
    // if date is not valid
    res.json({"error": "Invalid Date"});
  }
});

app.get("/api", function (req, res) {
  
  // get the current time
  let currentTimeMillis = Date.now();
  let unixTimeSeconds = Math.floor(currentTimeMillis / 1000);

  // Get current date object
  let currentDate = new Date();
  let utcTimeString = currentDate.toUTCString();

  res.json({"unix": unixTimeSeconds, "utc": utcTimeString});
  
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
