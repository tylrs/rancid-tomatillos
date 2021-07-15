export const cleanMovies = (movies) => {
    return movies.map(movie => {
        return ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path
        })
    })
}