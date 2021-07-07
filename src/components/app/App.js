import './App.css';
import movieData from '../../movieData'
import MovieBoard from '../MovieBoard/MovieBoard'
import React,{ Component } from 'react';

class App extends Component {
  constructor() {
    super() 
      this.state = {
        movies: movieData.movies
      }
    }
  render() {
    return (
    <main> 
      <header>
      <h1>Rancid Tomatoes</h1>
      </header>
      <MovieBoard movies={this.state.movies}/>
      </main>
      )
    }
  }

export default App;
