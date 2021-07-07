import React from "react"
import "./MovieCover.css"

const MovieCover = ({id, poster, title}) => {
  return (
    <article className='movie-card'>
      <img src={poster} alt={title} />
    </article>
  )
}

export default MovieCover