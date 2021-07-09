import React from 'react';

const Error = ({error}) => {
    return (
        <div>
            <p>{error}</p>
            <button>Back</button>
        </div>
    )
}

export default Error