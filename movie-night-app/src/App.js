import React, { Component } from 'react';
import './App.css';
import fetch from 'isomorphic-fetch'



class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {"movie" : "ok"};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({value: ''})
      this.setState({value: event.target.value})

  }

  handleSubmit(event){
    console.log(this.state.value);
    fetch("http://localhost:3000/search?q=" + this.state.value, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      return response.json();
    }).then((parsedData) => {
      console.log(parsedData);
    })
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.value || ''} placeholder='Enter Movie Title Here' onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }

}

class App extends Component {
  render() {
    return (
      <SearchBar />
    );
  }
}

export default App;
