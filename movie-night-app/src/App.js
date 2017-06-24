import React, { Component } from 'react';
import './App.css';
import fetch from 'isomorphic-fetch'



class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {"inputValue" : "ok"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event){

  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
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
