import React from 'react'
import './Movie.scss'

const Movie = (props) => {
    let {backdrop_path, title, average_rating,
         release_date, overview, genres, budget,
          revenue, runtime, tagline} = props.movieInfo;
    let genreTags = genres.map((genre, index) => <p key={index}>{genre}</p>)   
    return (
        <article className='selected-movie'>
            <h2>{title}</h2>
            <button onClick={()=> {props.unselectMovie()}}>Back</button>
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

export default Movie