import MovieBoard from '../MovieBoard/MovieBoard';
import Movie from '../Movie/Movie';
import Error from '../Error/Error';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { cleanMovies, cleanMovie } from '../../utilities/utils';
import {fetchMovie, fetchMovies, submitFavoriteMovie} from '../../utilities/apiCalls';

class App extends Component {
  constructor() {
    super() 
      this.state = {
        movies: [],
        selectedMovie: {},
        favoriteMovies: [],
        error: ''
      }
    }

  componentDidMount() {
    fetchMovies()
    .then(movieData => {
      let cleanedMovies = cleanMovies(movieData.movies)
      this.setState({movies: cleanedMovies});
    })
    .catch(error => this.setState({error: 'Oops server is down! Please Refresh the page'}))
  }

  favoriteMovie = (id) => {
    let favorited = this.state.movies.find(movie => movie.id === id)
    submitFavoriteMovie(favorited)
    .then(data => console.log(data))
  }
  
  selectMovie = (id) => {
    fetchMovie(id)
    .then(selectedMovie => {
      let cleanedMovie = cleanMovie(selectedMovie.movie);
      this.setState({
        selectedMovie: cleanedMovie
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
        <Switch>
          <Route exact path='/' render={() => {
              return (
                <>
                  {this.state.error && <Error error={this.state.error} />}
                  {!this.state.movies.length && !this.state.error && <p>Loading...</p>}
                  {!this.state.error && <MovieBoard 
                    movies={this.state.movies} 
                    selectMovie={this.selectMovie}
                  />}
                </>
              )
            }}
          />
          <Route exact path='/movies/:id' render={({match}) => {
            const id = parseInt(match.params.id);
            return (
              <>
                {this.state.error && <Error error={this.state.error} leaveError={this.leaveError}/>}
                {!this.state.selectedMovie && !this.state.error && <p>Loading...</p>}
                {!this.state.error && <Movie 
                  key={this.state.selectedMovie.id} 
                  movieInfo={this.state.selectedMovie} 
                  selectMovie = {this.selectMovie}
                  unselectMovie={this.unselectMovie}
                  favoriteMovie={this.favoriteMovie}
                  id={id}
                />}
              </>
            )
            }}
          />
          <Route path=''render={() => <Error error='404 Not Found' leaveError={this.leaveError}/>}/>
        </Switch>
      </main>
      )
    }
  }

export default App;
