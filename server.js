// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

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

app.get("/api", (req,res)=>{
  let unix = Date.now();
  let time = new Date(unix);

  res.json({"unix":unix, "utc":time.toUTCString()})
})


app.get("/api/:time", (req,res)=>{

  //check if it's a valid date using Regex & Check if days are 31 or lower
  if(req.params.time.match(/[0-9][0-9][0-9][0-9]-1[0-2]-[1-3][0-9]/) || req.params.time.match(/[0-9][0-9][0-9][0-9]-[1-9]-[1-3][0-9]/) && Number.parseInt(req.params.time.split("-")[2]) <= 31){
    let dateSplitted = req.params.time.split("-");
    let year = dateSplitted[0]
    let month = dateSplitted[1]
    let day = dateSplitted[2]

    //intilize time in UTC timezone
    let dateNow = new Date(`${year}-${month}-${day} 00:00:00 UTC`);
    //conver it to UNIX
    let unix = Date.parse(dateNow)


    res.json({"unix":unix,"utc":dateNow.toUTCString()})
  }
  //if it's parseable INT (negative or positive) then it's a UNIX epoch
  else if(Number.parseInt(req.params.time)){
    let parsedInt = Number.parseInt(req.params.time)
    let date = new Date(parsedInt).toUTCString()
    
    res.json({"unix":parsedInt,"utc":date})
  }
  else{
    res.json({"error":"Invalid Date"});
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000,()=>{
  console.log('Your app is listening on port ' + listener.address().port);
});
