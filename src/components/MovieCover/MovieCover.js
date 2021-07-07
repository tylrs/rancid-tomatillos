import React from "react"

const MovieCover = ({id, poster, title}) => {
  return (
    <article>
      <img src={poster} alt={title} />
    </article>
  )
}

export default MovieCover