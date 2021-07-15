export const cleanMovies = (movies) => {
    return movies.map(movie => {
        return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path
        }
    })
}

const restructureDate = (release_date) => {
    let separateDates = release_date.split('-');
    let [year, month, day] = separateDates;
    return `${month}-${day}-${year}`;
}

export const cleanMovie = ({backdrop_path, title, average_rating,
    release_date, overview, genres, budget,
     revenue, runtime, tagline}) => {
    average_rating = average_rating.toFixed(2);
    release_date = restructureDate(release_date);
    if (budget) {
        budget = budget.toLocaleString('en-us');
    }
    if (revenue) {
        revenue = revenue.toLocaleString('en-us');
    }
    console.log(release_date);
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