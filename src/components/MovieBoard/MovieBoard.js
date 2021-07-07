import React from "react"
import MovieCover from "../MovieCover/MovieCover"

 const MovieBoard = ({movies}) => {
    let movieCovers = movies.map(movie => <MovieCover key={movie.id} poster={movie.poster_path}/>)
  return (
    <section>
      {movieCovers}
    </section>
   )
 }
 
export default MovieBoard