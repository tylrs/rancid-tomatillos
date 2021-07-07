import React from "react"
import MovieCover from "../MovieCover/MovieCover"
import "./MovieBoard.css"

 const MovieBoard = ({movies}) => {
        let movieCovers = movies.map(movie => <MovieCover key={movie.id} id={movie.id} poster={movie.poster_path} title={movie.title}/>)

  return (
    <section className='movies-container'>
      {movieCovers}
    </section>
   )
 }
 
export default MovieBoard