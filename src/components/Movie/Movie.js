import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { sortGenres } from '../../utils'
import PropTypes from 'prop-types';

class Movie extends Component {
  componentDidMount() {
    this.props.selectMovie(this.props.id)
  }
  render() {
      const {backdrop_path, title, average_rating,
          release_date, overview, genres = [], budget,
            revenue, runtime, tagline} = this.props.movieInfo;
      let genreTags = sortGenres(genres)
      return (         
        <article className='selected-movie'>
        <div className="img-container">
          <img src={backdrop_path} alt={title} />
          <div className="tagline-container">
            <h3>{tagline}</h3>
          </div>
        </div>
        <div className='title-container'>
          <h2>{title}</h2>
          <Link to='/'><button className="movie-back-button" onClick={()=>
            {this.props.unselectMovie()}}>back</button></Link>
        </div>
        <div className="info-container">
          <div className="rating-container">
            <h4>Rating:</h4>
            <p>{average_rating}</p>
          </div>
          <div className="date-container">
            <h4>Release Date:</h4>
            <p>{release_date}</p>
          </div>
        </div>
        <div className="full-detail-container">
          <div className="detail-container">
            <h4>Genres:</h4>
            <div className="genre-container"> {genreTags} </div>
          </div>
          <div className="detail-container">
            <h4>Duration:</h4>
            <p>{runtime} mins</p>
          </div>
          {!!budget && 
          <div className="detail-container">
            <h4>Budget:</h4>
            <p>${budget}</p>
          </div> }
          {!!revenue &&
          <div className="detail-container">
            <h4>Revenue:</h4>
            <p>${revenue}</p>
          </div> }
        </div>
      {!!overview &&
      <>
        <hr />
        <p className="overview">{overview}</p>
        </>}
      </article> 
    )}
  }

export default Movie

Movie.propTypes = {
    movieInfo: PropTypes.object,
    title: PropTypes.string,
    average_rating: PropTypes.number,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.array,
    budget: PropTypes.number,
    revenue: PropTypes.number,
    runtime: PropTypes.number,
    tagline: PropTypes.string
}