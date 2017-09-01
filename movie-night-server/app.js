const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const http = require('http');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const key = process.env.SECRET_KEY;
const MongoClient = require('mongodb').MongoClient



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())

app.post('/', (req, res) => {
  const movieName = req.body
  const title = movieName.title
  const overview = movieName.overview
  const posterurl = movieName.posterurl
  const movieId = movieName.id

  MongoClient.connect('mongodb://localhost:27017/movienight', function (err, db) {
    (db.collection('lottery').count({ "title" : title })).then((thing)=>{
      console.log(count);
      if(count == 0){
        db.collection('lottery').insert(
          {
          "title" : title,
          "movieid" : movieId,
          "overview" : overview,
          "posterurl" : posterurl
          }
        )
        res.send({ "message" : title + ' has been added to lottery!'})
      }
      else{
        console.log("Entry already exists");
        res.send({"message" : "Entry already exists"});
      }
    })
    if (err) throw err
  })
})

app.get('/', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017/movienight', function (err, db) {
    if (err) throw err

    db.collection('lottery').find().toArray(function (err, result) {
      if (err) throw err
      res.send(result)
    })
  })
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
