import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieCover = ({id, poster, title}) => {
  return (
    <Link to={`/movies/${id}`}>
      <article className='movie-card'>
        <img src={poster} alt={title}/>
      </article>
    </Link>
  )
}

export default MovieCover;

MovieCover.propTypes = {
  id: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}