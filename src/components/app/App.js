import './App.css';
import movieData from '../../movieData'
import MovieBoard from '../MovieBoard/MovieBoard'
import Movie from '../Movie/Movie'
import React,{ Component } from 'react';

class App extends Component {
  constructor() {
    super() 
      this.state = {
        movies: movieData.movies,
        selectedMovie: {}
      }
    }
  
  selectMovie = (id) => {
    const selectedMovie = this.state.movies.find(movie => movie.id === id)
    this.setState({
      selectedMovie
    })
  }

  render() {
    return (
      <main> 
        <header className='app-title'>
          <h1>Rancid Tomatillos</h1>
        </header>
        {
          this.state.selectedMovie.title ? 
          <Movie movieInfo={this.state.selectedMovie}/> : 
          <MovieBoard movies={this.state.movies} selectMovie={this.selectMovie}/>
        }
      </main>
      )
    }
  }

export default App;
