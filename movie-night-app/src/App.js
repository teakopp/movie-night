import React, { Component } from 'react';
import './App.css';
import fetch from 'isomorphic-fetch'
import { Grid, Row, Col, Image, Modal, Button, Table} from 'react-bootstrap';



class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {"movie" : "ok"};
    this.state.movies = ['']
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({value: ''})
      this.setState({value: event.target.value})
  }

  handleSubmit(event){
    fetch("http://localhost:3000/search?q=" + this.state.value, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      return response.json();
    }).then((parsedData) => {
      this.setState({movies:parsedData.results})
      console.log(this.state.movies[0].id);
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value || ''} placeholder='Enter Movie Title Here' onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.movies.map((movie) => {
          return (
            <Table responsive>
              <tbody>
                <tr><td key={movie.id}>{movie.original_title}</td></tr>
              </tbody>
            </Table>

          )
        })}
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
