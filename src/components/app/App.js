import MovieBoard from '../MovieBoard/MovieBoard';
import Movie from '../Movie/Movie';
import Error from '../Error/Error';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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
    })
    .catch(error => this.setState({error: 'Oops server is down!'}))
  }
  
  selectMovie = (id) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    .then(response => response.json())
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
        <Route exact path='/' render={() =>{
            if (this.state.error) {
              return <Error error={this.state.error} leaveError={this.leaveError}/>
            } else if (!this.state.movies.length) {
              return <p>Loading...</p>
            } else {
              return <MovieBoard 
                movies={this.state.movies} 
                selectMovie={this.selectMovie}
              />
            }
          }}
        />
        <Route exact path='/:id' render={({match}) => {
          const id = parseInt(match.params.id);
          if (this.state.error) {
            return <Error error={this.state.error} leaveError={this.leaveError}/>
          } else if (!this.state.selectedMovie) {
            return <p>Loading...</p>
          } else {
            return <Movie 
              key={this.state.selectedMovie.id} 
              movieInfo={this.state.selectedMovie} 
              selectMovie = {this.selectMovie}
              unselectMovie={this.unselectMovie}
              id={id}
            />
          }
        }}/>
      </main>
      )
    }
  }

export default App;
