export const cleanMovies = (movies) => {
    return movies.map(movie => {
        return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path
        }
    })
}

export const cleanMovie = (selectedMovie) => {
    const {backdrop_path, title, average_rating,
        release_date, overview, genres, budget,
         revenue, runtime, tagline} = selectedMovie;
    return {
        backdrop_path, 
        title, 
        average_rating,
        release_date, 
        overview, 
        genres, 
        budget,
        revenue, 
        runtime, 
        tagline
    }
}