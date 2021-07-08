import './App.css';
import movieData from '../../movieData'
import MovieBoard from '../MovieBoard/MovieBoard'
import Movie from '../Movie/Movie'
import React,{ Component } from 'react';

class App extends Component {
  constructor() {
    super() 
      this.state = {
        movies: [],
        selectedMovie: {}
      }
    }

    componentDidMount() {
      fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then((response) => response.json())
      .then((movieData) => this.setState({movies: movieData.movies}))
    }

  
  selectMovie = (id) => {
    const selectedMovie = this.state.movies.find(movie => movie.id === id)
    this.setState({
      selectedMovie
    })
  }

  unselectMovie = () => {
    this.setState({
      selectedMovie: {}
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
          <Movie key={this.state.selectedMovie.id} movieInfo={this.state.selectedMovie} unselectMovie={this.unselectMovie}/> : 
          <MovieBoard movies={this.state.movies} selectMovie={this.selectMovie}/>
        }
      </main>
      )
    }
  }

export default App;
