const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const request = require('request');


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.get('/api/byCity', function(req, res){
  request.get({url:'https://www.metaweather.com/api/location/search/?query='+req.query.city},function(error,resp,body){
    res.send(body);
  });
});
app.get('/api/byCode', function(req, res){
  request.get({url:'https://www.metaweather.com/api/location/'+req.query.code},function(error,resp,body){
    res.send(body);
  });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running `));
