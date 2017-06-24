const express = require('express');
const app = express()
const hhtp = require('http');
const path = require('path');

app.route('/')
  .post((req,res) => {
})

app.listen(3000, ()=>{
  console.log('App listening on port 3000!')
});
