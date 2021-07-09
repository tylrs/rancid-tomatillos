import React from 'react';

const Error = ({error, leaveError}) => {
    return (
        <div>
            <p>{error}</p>
            <button onClick={() => {leaveError()}}>Back</button>
        </div>
    )
}

export default Error