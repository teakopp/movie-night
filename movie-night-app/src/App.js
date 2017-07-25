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
                      <Col xs={3} md={3} xsOffset={3}>
                        <Image src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} alt={movie.original_title} responsive />
                      </Col>
                      <Col xs={6} md={6} className="content">
                        <h3 className="text-left">{movie.original_title}</h3>
                        <p className="text-left">{movie.overview}</p>
                      </Col>
                      <Col xs={12} md={12} className="spacer-row"></Col>
                  </Row>
              )
            }
            else if( movie.original_title && movie.original_title !== '' && !movie.poster_path){
                return (
                  <Row key={movie.id} className="show-grid">
                    <Col xs={3} md={3} xsOffset={3}>
                      <Image src ={questionMark} alt="?" className="missing"  />
                      <Col xs={12} md={12}>
                        <h4 >Image Missing</h4>
                      </Col>
                    </Col>
                    <Col xs={6} md={6} className="content">
                      <h3 className="text-left">{movie.original_title}</h3>
                      <p className="text-left">{movie.overview}</p>
                    </Col>
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
