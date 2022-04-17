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

  //check if it's a valid date using Date.parse
  if(!isNaN(Date.parse(req.params.time))){

    //intilize time
    let dateNow = new Date(req.params.time);
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
