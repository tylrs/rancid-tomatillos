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
               <h2>{title}</h2>
               <Link to='/'><button onClick={()=> {this.props.unselectMovie()}}>Back</button></Link>
               <img src={backdrop_path} alt={title}/>
               <p>Release Date:<span>{release_date}</span></p>
               <div>Genres:<span>{genreTags}</span></div>
               <div>
                   <p>Rating:<span>{average_rating}</span></p>
                   <p>Duration:<span>{runtime} mins</span></p>   
               </div>
               <hr/>
               <h3>{overview}</h3>
               <p>Budget:<span>${budget}</span></p>
               <p>Revenue:<span>${revenue}</span></p>
               <p>Tagline:<span>${tagline}</span></p>
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