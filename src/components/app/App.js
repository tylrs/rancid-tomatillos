import './App.css';
// import movieData from '../../movieData'
import MovieBoard from '../MovieBoard/MovieBoard'
import Movie from '../Movie/Movie'
import React,{ Component } from 'react';

class App extends Component {
  constructor() {
    super() 
      this.state = {
        movies: [],
        selectedMovie: {},
        error: ''
      }
    }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => response.json())
    .then(movieData => {
      this.setState({movies: movieData.movies})
      console.log(this.state.movies)
    })
    .catch(error => this.setState({error: 'Oops server is down!'}))
  }

  
  selectMovie = (id) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    .then(response => response.json())
    .then(selectedMovie => {
      console.log(selectedMovie)
      this.setState({
        selectedMovie: selectedMovie.movie
      })
    })
    .catch(error => {
      this.setState({error: 'could not retrieve movie'})
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
        {this.state.error && <p>Whoopsie, the server is down!</p> }
        {!this.state.movies.length && !this.state.error && <p>Movies Loading...</p>}
        {
          this.state.selectedMovie.title && !this.state.error ?
          <Movie 
            key={this.state.selectedMovie.id} 
            movieInfo={this.state.selectedMovie} 
            unselectMovie={this.unselectMovie}
          /> : 
          <MovieBoard 
            movies={this.state.movies} 
            selectMovie={this.selectMovie}
          />
        }
      </main>
      )
    }
  }

export default App;
