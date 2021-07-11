import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({error, leaveError}) => {
    return (
        <div>
            <p>{error}</p>
            <Link to='/'><button onClick={() => {leaveError()}}>Back</button></Link>
        </div>
    )
}

export default Error