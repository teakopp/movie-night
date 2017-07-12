const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const http = require('http');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const key = process.env.SECRET_KEY;



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())

app.route('/search')
  .get((req,res) => {

    let movieTitle = req.query.q
    let movies = {}

    const options = {
      host: 'api.themoviedb.org',
      port: 80,
      path: '/3/search/movie?api_key=' + key + '&language=en-US&query=' + movieTitle + '&page=1&include_adult=false'
    };

    http.get(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      })

      res.on('end', (movies) => {
        movies = JSON.parse(body);
      })
    })

    console.log(movies);



})

app.listen(3000, ()=>{
  console.log('App listening on port 3000!')
});
