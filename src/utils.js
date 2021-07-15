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
    let {backdrop_path, title, average_rating,
        release_date, overview, genres, budget,
         revenue, runtime, tagline} = selectedMovie;
    average_rating = average_rating.toFixed(2);
    let reorder = release_date.split('-')
    let year = reorder.shift();
    reorder.splice(2, 0, year)
    release_date = reorder.join('-');
    if (budget) {
        budget = budget.toLocaleString('en-us');
    }
    if (revenue) {
        revenue = revenue.toLocaleString('en-us');
    }
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