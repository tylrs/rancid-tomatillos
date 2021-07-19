import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'

const Loader = () => {
    return (
        <section className="loader">
            <FontAwesomeIcon className="icon" icon={faCompactDisc} />
        </section>
    )
}

export default Loader