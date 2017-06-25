const express = require('express');
const app = express()
const http = require('http');
const path = require('path');
const cors = require('cors');
const key = process.env.SECRET_KEY;



const options = {
  host: 'api.themoviedb.org',
  port: 80,
  path: '/3/search/movie?api_key=' + key + '&language=en-US&query=logan&page=1&include_adult=false'
};


app.use(cors())

app.route('/')
  .post((req,res) => {
    console.log('ok')
    http.get(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      })

      res.on('end', () => {
        let res = JSON.parse(body);
        console.log(body);
      })
    })
})

app.listen(3000, ()=>{
  console.log('App listening on port 3000!')
});
