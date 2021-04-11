import React, { Component } from 'react';
import Pallete from './Palette';
import seedColors from "./seedColors"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pallete {...seedColors[4]} />
      </div>
    )
  }
}

export default App;

