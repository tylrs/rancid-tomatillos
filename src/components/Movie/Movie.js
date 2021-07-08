import React from 'react'

const Movie = (props) => {
    let {backdrop_path, title, average_rating,
         release_date, overview, genres, budget,
          revenue, runtime, tagline} = props;
    let genreTags = genres.map(genre => <p>{genre}</p>)   
    return (
        <article className='selected-movie'>
            <img src={backdrop_path} alt={title}/>
            <p>Release Date:<span>{release_date}</span></p>
            <p>Genres:<span>{genreTags}</span></p>
            <div>
                <p>Rating:<span>{average_rating}</span></p>
                <p>Duration:<span>{runtime} mins</span></p>   
            </div>
            <hr />
            <h2>{overview}</h2>
            <p>Budget:<span>${budget}</span></p>
            <p>Revenue:<span>${revenue}</span></p>
            <p>Tagline:<span>${tagline}</span></p>
        </article>
    )
}

export default Movie