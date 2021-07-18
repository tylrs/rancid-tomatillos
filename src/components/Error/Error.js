import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Error = ({error, leaveError}) => {
    return (
        <section className="error">
            <p>{error}</p>
            {leaveError && 
            <Link to='/'>
            <button onClick={() => {leaveError()}}>Back</button>
            </Link>}
        </section>
    )
}

export default Error

Error.propTypes = {
    error: PropTypes.string.isRequired,
    leaveError: PropTypes.func
}