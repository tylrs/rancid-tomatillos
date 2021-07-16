export const fetchMovies = () => {
    return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => {
      if (!response.ok) {
        throw Error()
      }
      return response.json()
    })
}

export const fetchMovie = (id) => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    .then(response => {
      if (!response.ok) {
        throw Error()
      }
      return response.json()
    })
}

export const submitFavoriteMovie = (favorited) => {
    return fetch(`http://localhost:3001/favorites`, {
        method: 'POST',
        body: JSON.stringify(favorited),
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(response => response.json())
}

export const fetchFavorites = () => {
    return fetch(`http://localhost:3001/favorites`)
    .then(response => {
      if (!response.ok) {
        throw Error()
      }
      return response.json()
    })
}