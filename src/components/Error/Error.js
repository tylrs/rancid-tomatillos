import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Error = ({error, leaveError}) => {
    return (
        <div>
            <p>{error}</p>
            {leaveError && <Link to='/'><button onClick={() => {leaveError()}}>Back</button></Link>}
        </div>
    )
}

export default Error

Error.propTypes = {
    error: PropTypes.string,
    leaveError: PropTypes.func
}