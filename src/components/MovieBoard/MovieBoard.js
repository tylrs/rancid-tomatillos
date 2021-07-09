import React from "react"
import MovieCover from "../MovieCover/MovieCover"
import "./MovieBoard.scss"

 const MovieBoard = ({movies, selectMovie}) => {
    let movieCovers = movies.map(movie => 
      <MovieCover 
        key={movie.id} 
        id={movie.id} 
        poster={movie.poster_path} 
        title={movie.title} 
        selectMovie={selectMovie}
      /> 
    )

  return (
    <section className='movies-container'>
      {movieCovers}
    </section>
   )
 }
 
export default MovieBoard