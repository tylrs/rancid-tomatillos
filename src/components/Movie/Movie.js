import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { sortGenres } from '../../utilities/utils';

class Movie extends Component {
    constructor(props) {
      super(props)
      this.timer = ''
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
        this.timer = setTimeout(() => this.setState({message:''}), 3000);
      } else if (!this.props.movieInfo.isFavorited && !this.state.message){
        this.props.favoriteMovie(this.props.id)
        this.setState({message: 'Added to Favorites'})
        this.timer = setTimeout(() => this.setState({message:''}), 3000);
      }
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    render() {
        const {backdrop_path, title, average_rating,
            release_date, overview, genres = [], budget,
             revenue, runtime, tagline, isFavorited} = this.props.movieInfo;
       let genreTags = sortGenres(genres);
       return (
        <article className='selected-movie'>
        <div className="img-container">
          <img src={backdrop_path} alt={title} />
          <FontAwesomeIcon className={isFavorited ? "favorite-button favorited" : "favorite-button"} icon={faHeart} size="3x" onClick={() => {this.determineFavoriteUnfavorite()}}/>
          {!!this.state.message && <div className="message-container">
            <h3>{this.state.message}</h3>
          </div>}
          <div className="tagline-container">
            <h3>{tagline}</h3>
          </div>
      
        </div>
        <div className='title-container'>
          <h2>{title}</h2>
          <Link to='/'>
            <button className="movie-back-button" 
            onClick={()=>{this.props.unselectMovie()}}
            >back
            </button>
          </Link>
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
       )
    }
    
}

export default Movie

Movie.propTypes = {
    movieInfo: PropTypes.shape({
      title: PropTypes.string,
      average_rating: PropTypes.string,
      release_date: PropTypes.string,
      overview: PropTypes.string,
      genres: PropTypes.array,
      runtime: PropTypes.number,
      tagline: PropTypes.string,
      isFavorited: PropTypes.bool
    })
    
}