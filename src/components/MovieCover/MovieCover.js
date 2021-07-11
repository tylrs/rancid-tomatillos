import React from "react"
import "./MovieCover.css"
import {Link} from 'react-router-dom';

const MovieCover = ({id, poster, title, selectMovie}) => {
  return (
    <Link to={`/${id}`}>
      {/* <article className='movie-card' onClick={() => {selectMovie(id)}}> */}
      <article className='movie-card'>
        <img src={poster} alt={title}/>
      </article>
    </Link>
  )
}

export default MovieCover