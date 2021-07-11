import React from "react"

const MovieCover = ({id, poster, title, selectMovie}) => {
  return (
    <article className='movie-card' onClick={() => {selectMovie(id)}}>
      <img src={poster} alt={title}/>
    </article>
  )
}

export default MovieCover