import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Movie extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
       this.props.selectMovie(this.props.id)
    }

    render() {
        let {backdrop_path, title, average_rating,
            release_date, overview, genres, budget,
             revenue, runtime, tagline} = this.props.movieInfo;
       // console.log(genres);
       let genreTags;
       if (genres) {
          genreTags = genres.map((genre, index) => <p key={index}>{genre}</p>)   
       }
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
    average_rating: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.string,
    budget: PropTypes.string,
    revenue: PropTypes.string,
    runtime: PropTypes.string,
    tagline: PropTypes.string
}