import '../../movieData'
import './App.css';
import MovieBoard from '../MovieBoard'
import React,{ Component } from 'react';

class App extends Component {
  constructor() {
    super() 
      this.state = {
        movies: []
      }
    }
  render() {
    return (
    <main> 
      <header>
      <h1>Rancid Tomatoes</h1>
      <MovieBoard movies={this.state.movies}/>
      </header>
      </main>
      )
    }
  }

export default App;
