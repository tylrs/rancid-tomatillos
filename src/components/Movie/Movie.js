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
               <img src={backdrop_path} alt={title}/>
               <div className="date-container">
               <h4>Release Date: <span>{release_date}</span></h4>
            </div>
               <Link to='/'><button onClick={()=> {this.props.unselectMovie()}}>back</button></Link>
            </div>
        
               <div className="genre-container">Genres:<span>{genreTags}</span></div>
                <div className="detail-container">
                    <h4>Rating:<span>{average_rating}</span></h4>
                    <h4>Duration:<span>{runtime} mins</span></h4>
                </div>
                <div className="detail-container">
                    <h4>Budget: <span>${budget}</span></h4>
                    <h4>Revenue: <span>${revenue}</span></h4>
                </div>


               <hr/>
               <p className="overview">{overview}</p>

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