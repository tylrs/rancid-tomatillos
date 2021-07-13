import MovieBoard from '../MovieBoard/MovieBoard';
import Movie from '../Movie/Movie';
import Error from '../Error/Error';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

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
    .then(response => {
      if (!response.ok) {
        throw Error()
      }
      return response.json()
    })
    .then(movieData => {
      this.setState({movies: movieData.movies})
    })
    .catch(error => this.setState({error: 'Oops server is down!'}))
  }
  
  selectMovie = (id) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    .then(response => {
      if (!response.ok) {
        throw Error()
      }
      return response.json()
    })
    .then(selectedMovie => {
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
        <Switch>
          <Route exact path='/' render={() => {
              return (
                <>
                  {this.state.error && <Error error={this.state.error} leaveError={this.leaveError}/>}
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
