import React, { Component } from 'react';
import './App.css';
import fetch from 'isomorphic-fetch'
import { Grid, Row, Col, Image, Modal, Button, Table} from 'react-bootstrap';
import questionMark from './icons/question-mark.jpg'



class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : [{original_title: '', id:'0'}]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
      this.setState({value: ''})
      this.setState({value: event.target.value})
  }


  handleSubmit(event){
    if(this.state.value !== ''){
      fetch("http://localhost:3000/search?q=" + this.state.value, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        return response.json();
      }).then((parsedData) => {
        this.setState({movies: parsedData.results})
        console.log(parsedData);
      })
    }
  }

  handleAdd(event){
    const i = event.target.value
    let data = {"title" : this.state.movies[i].original_title}
    console.log(data);

      fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        return response.json();
      }).then((parsedData) => {

      })
  }

  render() {
    const movies = this.state.movies

    return (
      <div>
        <input type="text" value={this.state.value || ''} placeholder='Enter Movie Title Here' onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
        <Grid>
          {movies.map((movie, index) => {
            if( movie.original_title && movie.original_title !== '' && movie.poster_path){
              return (
                  <Row key={movie.id} className="show-grid">
                      <Col xs={3} md={3} xsOffset={2}>
                        <Image src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} alt={movie.original_title} responsive />
                      </Col>
                      <Col xs={4} md={4} className="content">
                        <h3 className="text-left">{movie.original_title}</h3>
                        <p className="text-left">{movie.overview}</p>
                        <Button bsStyle="success" className="add" value={index} onClick={this.handleAdd}>Add to lottery</Button>
                      </Col>
                      <Col xs={12} md={12} className="spacer-row"></Col>
                  </Row>
              )
            }
            else if( movie.original_title && movie.original_title !== '' && !movie.poster_path){
                return (
                  <Row key={movie.id} className="show-grid">
                    <Col xs={3} md={3} xsOffset={2}>
                      <Image src ={questionMark} alt="?" className="missing"  />
                      <Col xs={12} md={12}>
                        <h4 >Image Missing</h4>
                      </Col>
                    </Col>
                    <Col xs={4} md={4} className="content">
                      <h3 className="text-left">{movie.original_title}</h3>
                      <p className="text-left">{movie.overview}</p>
                      <Button bsStyle="success" value={index} className="add">Add to lottery</Button>
                    </Col>
                    <Col xs={12} md={12} className="spacer-row"></Col>
                  </Row>
              )
            }
            else{
              return(
              <Row className="show-grid" key={index}></Row>
              )
            }
          })}
        </Grid>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 id="title">Movie Night</h1>
        </div>
        <SearchBar />
      </div>
    );
  }
}

export default App;
