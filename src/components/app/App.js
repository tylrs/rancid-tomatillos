import MovieBoard from '../MovieBoard/MovieBoard';
import Movie from '../Movie/Movie';
import Error from '../Error/Error';
import Header from '../Header/Header'
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { cleanMovies, cleanMovie } from '../../utilities/utils';
import {deleteFavoriteMovie, fetchFavorites, fetchMovie, fetchMovies, submitFavoriteMovie} from '../../utilities/apiCalls';

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
    fetchFavorites()
    .then(data => {
      this.setState ({
        favoriteMovies: data.favorites
      })
    })
  }

  favoriteMovie = (id) => {
    let favorited = this.state.movies.find(movie => movie.id === id)
    submitFavoriteMovie(favorited)
    .then(() => {
      this.setState((prevState) => {
        let updatedMovie = prevState.selectedMovie;
        updatedMovie.isFavorited = true;
        prevState.favoriteMovies.push(favorited)
        return ({
          selectedMovie: updatedMovie,
          favoriteMovies: prevState.favoriteMovies
        })
      })
    })
    .catch(error => {
      this.setState({error: 'Could not add to favorites, please try again'})
    })
  }

  unFavoriteMovie = (id) => {
    deleteFavoriteMovie(id)
    .then(data => {
      console.log(data.favorites)
      this.setState((prevState) => {
        let updatedMovie = prevState.selectedMovie;
        updatedMovie.isFavorited = false;
        return ({
          selectedMovie: updatedMovie,
          favoriteMovies: data.favorites
        })
      })
    })
    .catch(error => {
      this.setState({error: 'Could not delete movie'})
    })
  }
  
  getFavorites = () => {
    fetchFavorites()
    
  }

  selectMovie = (id) => {
    fetchMovie(id)
    .then(selectedMovie => {
      let isFavorite = this.state.favoriteMovies.find(movie => movie.id === id)
      if (!isFavorite) {
        selectedMovie.movie.isFavorited =  false;
      } else {
        selectedMovie.movie.isFavorited =  true;
      }
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
      {/* <Header /> */}
        <Switch>
          <Route exact path='/' render={({match}) => {
              const homePath = match.path
              return (
                <>
                  {this.state.error && <Error error={this.state.error} />}
                  {!this.state.movies.length && !this.state.error && <p>Loading...</p>}
                  {!this.state.error && 
                    <>
                      <Header path={homePath} />
                      <MovieBoard 
                        movies={this.state.movies} 
                        selectMovie={this.selectMovie}
                      />
                    </>
                  }
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
                  unFavoriteMovie={this.unFavoriteMovie}
                  id={id}
                />}
              </>
            )
            }}
          />
          <Route exact path='/favorites' render={({match}) => {
            const favoritePath = match.path
            return (
              <>
                  {this.state.error && <Error error={this.state.error} />}
                  {!this.state.movies.length && !this.state.error && <p>Loading...</p>}
                  {!this.state.favoriteMovies.length && <p>No Movies!</p>}
                  {!this.state.error && 
                  <>
                    <Header path={favoritePath} />
                    <MovieBoard 
                      movies={this.state.favoriteMovies} 
                      selectMovie={this.selectMovie}
                    />
                  </>
                  }
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
