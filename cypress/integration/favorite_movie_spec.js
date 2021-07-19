describe('Favorite a Movie User Flow', () => {
    const singleMovieReq = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    const moviesReq = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
    const favoriteMoviesReq = 'http://localhost:3001/favorites'

    it('Should show an empty heart when first visiting movie details', () => {
        cy.intercept('GET', singleMovieReq, {
            statusCode: 200,
            fixture: 'movie'
          }) 
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            response: {
                "favorites": []
            }
        }) 
        cy.LoadHome()
        .get('a[href="/movies/694919"]')
        .click()
        cy.get('.img-container > .svg-inline--fa')
        .should('have.css', 'background-color', 'rgba(147, 178, 190, 0.8)')
    })
    it('Should be able to click on a heart and favorite a movie', () => {
        cy.intercept('GET', singleMovieReq, {
            statusCode: 200,
            fixture: 'movie'
          }) 
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        let count = 0;  

        cy.intercept('GET', favoriteMoviesReq, (req) => {   
        req.reply(res => {     
            if (count === 0) {
            count += 1;
            res.send({"favorites": []})
            } else {
            res.send({"favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    }
                ]})
            }
        }); 
        });
        cy.intercept('POST', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "id": 694919,
                "title": "Money Plane",
                "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
            }
        }) 
        cy.LoadHome()
        .get('a[href="/movies/694919"]')
        .click()
        cy.get('.img-container > .svg-inline--fa')
        .click()
        cy.get('.img-container > .svg-inline--fa')
        .should('have.css', 'color', 'rgb(254, 38, 27)')
        cy.get('body')
        .contains('Added to Favorites')
    })
    it('Should be able to click on a heart and unFavorite a movie', () => {
        cy.intercept('GET', singleMovieReq, {
            statusCode: 200,
            fixture: 'movie'
          }) 
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    }
                ]
            }
        }) 
        cy.intercept('DELETE', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": []
            }
        })  
        cy.LoadHome()
        .get('a[href="/movies/694919"]')
        .click()
        cy.get('.img-container > .svg-inline--fa')
        .click()
        cy.get('body')
        .contains('Removed from Favorites')
    })
    it('Should be able to see an error message if post was not successful', () => {
        cy.intercept('GET', singleMovieReq, {
            statusCode: 200,
            fixture: 'movie'
          }) 
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        let count = 0;  

        cy.intercept('GET', favoriteMoviesReq, (req) => {   
        req.reply(res => {     
            if (count === 0) {
            count += 1;
            res.send({"favorites": []})
            } else {
            res.send({"favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    }
                ]})
            }
        }); 
        });
        cy.intercept('POST', favoriteMoviesReq, {
            statusCode: 422,
            response: {
                "error": "error message"
            }
        }) 
        cy.LoadHome()
        .get('a[href="/movies/694919"]')
        .click()
        cy.get('.img-container > .svg-inline--fa')
        .click()
        cy.get('body')
        .contains('Could not add to favorites, please try again')
    })
    it('Should be able to see an error message if delete was not successful ', () => {
        cy.intercept('GET', singleMovieReq, {
            statusCode: 200,
            fixture: 'movie'
          }) 
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    }
                ]
            }
        }) 
        cy.intercept('DELETE', favoriteMoviesReq, {
            statusCode: 500,
            response: {
                "error": "error message"
            }
        })  
        cy.LoadHome()
        .get('a[href="/movies/694919"]')
        .click()
        cy.get('.img-container > .svg-inline--fa')
        .click()
        cy.get('body')
        .contains('Could not delete movie')
    })
    it('Should be able to see a heart filled in if a movie was previously favorited', () => {
        cy.intercept('GET', singleMovieReq, {
            statusCode: 200,
            fixture: 'movie'
          }) 
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    }
                ]
            }
        }) 
        cy.LoadHome()
        .get('a[href="/movies/694919"]')
        .click()
        cy.get('.img-container > .svg-inline--fa')
        .should('have.css', 'color', 'rgb(254, 38, 27)')
    })
    it('Should be able to click on the favorites view and see favorited movies', () => {
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    },
                    {
                        "id": 337401,
                        "poster_path": "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
                        "title": "Mulan",
                    },
                    {
                        "id": 718444,
                        "poster_path": "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
                        "title": "Rogue",
                    }

                ]
            }
        }) 
        cy.LoadHome()
        cy.get('[href="/favorites"] > .svg-inline--fa')
        .click()
    })
    it('Should be able to click on the favorites view and see a message if no movies have been favorited', () => {
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": []
            }
        }) 
        cy.LoadHome()
        cy.get('[href="/favorites"] > .svg-inline--fa')
        .click()
        cy.get('body')
        .contains('No Movies!')
    })
    it('Should be able to click on a movie poster to view the movie details', () => {
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    },
                    {
                        "id": 337401,
                        "poster_path": "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
                        "title": "Mulan",
                    },
                    {
                        "id": 718444,
                        "poster_path": "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
                        "title": "Rogue",
                    }

                ]
            }
        }) 
        cy.LoadHome()
        cy.get('[href="/favorites"] > .svg-inline--fa')
        .click()
        cy.get('a[href="/movies/337401"]')
        .click()
        cy.get('body')
        .contains('Mulan')
        cy.get('.img-container > .svg-inline--fa')
        .should('have.css', 'color', 'rgb(254, 38, 27)')
    })
    it('Should be able to click on the back button to get back to home', () => {
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    },
                    {
                        "id": 337401,
                        "poster_path": "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
                        "title": "Mulan",
                    },
                    {
                        "id": 718444,
                        "poster_path": "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
                        "title": "Rogue",
                    }

                ]
            }
        }) 
        cy.LoadHome()
        cy.get('[href="/favorites"] > .svg-inline--fa')
        .click()
        cy.get('.active > .svg-inline--fa')
        .click()
        cy.get('.movies-container a').should('have.length', 8)
    })
    it('Should be able to click on the title to get back to home', () => {
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        }) 
        cy.intercept('GET', favoriteMoviesReq, {
            statusCode: 200,
            body: {
                "favorites": [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "title": "Money Plane"
                    },
                    {
                        "id": 337401,
                        "poster_path": "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
                        "title": "Mulan",
                    },
                    {
                        "id": 718444,
                        "poster_path": "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
                        "title": "Rogue",
                    }

                ]
            }
        }) 
        cy.LoadHome()
        cy.get('[href="/favorites"] > .svg-inline--fa')
        .click()
        cy.get('h1')
        .click()
        cy.get('.movies-container a').should('have.length', 8)
    })
})