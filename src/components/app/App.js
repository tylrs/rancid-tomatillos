import './App.css';
// import movieData from '../../movieData'
import MovieBoard from '../MovieBoard/MovieBoard';
import Movie from '../Movie/Movie';
import Error from '../Error/Error';
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
    // fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/wrongURL/${id}`)
    .then(response => response.json())
    .then(selectedMovie => {
      console.log(selectedMovie)
      this.setState({
        selectedMovie: selectedMovie.movie
      })
    })
    .catch(error => {
      this.setState({error: 'Could not retrieve selected movie, please try again'})
    })
  }

  unselectMovie = () => {
    this.setState({
      selectedMovie: {}
    })
  }

  leaveError = () => {
    this.setState({
      error: ''
    })
  }

  render() {
    return (
      <main> 
        <header className='app-title'>
          <h1>Rancid Tomatillos</h1>
        </header>
        {this.state.error && <Error error={this.state.error} leaveError={this.leaveError}/>}
        {!this.state.movies.length && !this.state.error && <p>Movies Loading...</p>}
        {this.state.selectedMovie.title && !this.state.error && 
          <Movie 
            key={this.state.selectedMovie.id} 
            movieInfo={this.state.selectedMovie} 
            unselectMovie={this.unselectMovie}
          />
        }
        {!this.state.selectedMovie.title && !this.state.error && 
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
