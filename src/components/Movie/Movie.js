import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Movie extends Component {
    componentDidMount() {
       this.props.selectMovie(this.props.id)
    }

    render() {
        const {backdrop_path, title, average_rating,
            release_date, overview, genres = [], budget,
             revenue, runtime, tagline} = this.props.movieInfo;
       let genreTags = genres.map((genre, index) => <p key={index}>{genre}</p>)
       return (
          <article className='selected-movie'>
            <div className='title-container'>
              <h2>{title}</h2>
              <h3>{tagline}</h3>
            </div>
            <div className="img-container">
              <img src={backdrop_path} alt={title} />
              <div className="date-container">
                <h4>Release Date:</h4>
                <p>{release_date}</p>
              </div>
              <Link to='/'><button onClick={()=> {this.props.unselectMovie()}}>back</button></Link> 
            </div>
            <h4>Genres:</h4>
            <div className="genre-container">
            {genreTags}
            </div>
            <div className="detail-container">
              <h4>Rating:</h4>
              <p>{average_rating}</p>
              <h4>Duration:</h4>
              <p>{runtime} mins</p>
            </div>
            <div className="detail-container">
              {!!budget && 
              <>
                <h4>Budget:</h4>
                <p>${budget}</p>
              </>
              }
              {!!revenue && 
              <>
                <h4>Revenue:</h4>
                <p>${revenue}</p>
              </>}
            </div>
            <hr />
            <p className="overview">{overview}</p>
          </article>
       )
    }
    
}

export default Movie

Movie.propTypes = {
    movieInfo: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    average_rating: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    budget: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    runtime: PropTypes.number.isRequired,
    tagline: PropTypes.string.isRequired
}