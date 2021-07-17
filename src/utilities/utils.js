export const cleanMovies = (movies) => {
    return movies.map(movie => {
        return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path
        }
    })
}

export const sortGenres = (genres) => genres.map((genre, index) => <p key={index}>{genre}</p>)

const restructureDate = (release_date) => {
    let separateDates = release_date.split('-');
    let [year, month, day] = separateDates;
    return `${month}-${day}-${year}`;
}

export const cleanMovie = ({backdrop_path, title, average_rating,
    release_date, overview, genres, budget,
     revenue, runtime, tagline, isFavorited}) => {
    average_rating = average_rating.toFixed(2);
    release_date = restructureDate(release_date);
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
        tagline,
        isFavorited
    }
}