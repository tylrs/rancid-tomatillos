describe('Favorite Movies User Flow', () => {
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
        cy.get('.svg-inline--fa')
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
        cy.get('.svg-inline--fa')
        .click()
        cy.get('.svg-inline--fa')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
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
        cy.get('.svg-inline--fa')
        .click()
        cy.get('body')
        .contains('Removed from Favorites')
    })
})