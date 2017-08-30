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

app.post('/', (req, res) => {
    console.log(req.body);
  })

app.route('/search')
  .get((req,res) => {

    let movieTitle = encodeURIComponent(req.query.q.trim())
    console.log(req.query.q);
    const options = {
      host: 'api.themoviedb.org',
      port: 80,
      path: '/3/search/movie?api_key=' + key + '&language=en-US&query=' + movieTitle + '&page=1&include_adult=false'
    };

    http.get(options, (response) => {
      let body = '';

      response.on('data', (chunk) => {
        body += chunk;
      })

      response.on('end', () => {
        res.send(body)
      })
    })
  })


app.listen(3000, ()=>{
  console.log('App listening on port 3000!')
});
