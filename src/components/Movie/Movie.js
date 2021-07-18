import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { sortGenres } from '../../utilities/utils';

class Movie extends Component {
    constructor(props) {
      super(props)
      this.state = {
        message: ''
      }
    }
    componentDidMount() {
       this.props.selectMovie(this.props.id)
    }

    determineFavoriteUnfavorite() {
      if (this.props.movieInfo.isFavorited && !this.state.message) {
        this.props.unFavoriteMovie(this.props.id)
        this.setState({message: 'Removed from Favorites'})
        setTimeout(() => this.setState({message:''}), 3000);
      } else if (!this.props.movieInfo.isFavorited && !this.state.message){
        this.props.favoriteMovie(this.props.id)
        this.setState({message: 'Added to Favorites'})
        setTimeout(() => this.setState({message:''}), 3000);
      }
    }

    render() {
        const {backdrop_path, title, average_rating,
            release_date, overview, genres = [], budget,
             revenue, runtime, tagline} = this.props.movieInfo;
       let genreTags = sortGenres(genres);
       return (
        <article className='selected-movie'>
        <div className="img-container">
          <img src={backdrop_path} alt={title} />
          <FontAwesomeIcon className={this.props.movieInfo.isFavorited? "favorite-button favorited" : "favorite-button"} icon={faHeart} size="3x" onClick={() => {this.determineFavoriteUnfavorite()}}/>
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
        {!!this.state.message && <p>{this.state.message}</p>}
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
       )
    }
    
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