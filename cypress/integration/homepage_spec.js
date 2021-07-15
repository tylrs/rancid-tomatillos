describe('Homepage User Flows', () => {

  const homePage = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
  const moviePage  = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'

    it('Should show all movies upon visiting the page', () => {
      cy.intercept('GET', homePage, {
        statusCode: 200,
        fixture: 'movies' 
      })
      cy.visit('http://localhost:3000')
      cy.contains('Rancid Tomatillos')
      cy.contains('Loading...')
      cy.get('a').should('have.length', 8)
      cy.get('a[href="/movies/694919"] img').should('be.visible')
    });

    it('Should show an error if there is a server error', () => {
        cy.intercept('GET', homePage, {
          statusCode: 500,
          response: {
              "error": "error message"
          }
        })
        cy.visit('http://localhost:3000')
        cy.contains('Rancid Tomatillos')
        cy.contains('Oops server is down! Please Refresh the page')
        cy.get('body').should('not.contain', 'button')
    });

    it('Should show a full view of a movie when clicked', () => {
        cy.intercept('GET', homePage, {
          statusCode: 200,
          fixture: 'movies'
      })
        cy.intercept('GET', moviePage , {
          statusCode: 200,
          fixture: 'movie'
        }) 
        .visit('http://localhost:3000')
        .get('a[href="/movies/694919"]')
        .click()
        .url().should('include', '/movies/694919')
        cy.contains('Money Plane')
        cy.contains(`It's a movie!`)
        cy.contains('Bad')
        cy.contains('6.666666666666667')
        cy.contains('2020-09-29')
        cy.get('.genre-container').should('include.text', 'Drama')
        cy.contains('Drama')
      });

    it('Should show an error if movie id is not found', () => {
        cy.intercept('GET', homePage, {
            statusCode: 200,
            fixture: 'movies'           
            })
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
            statusCode: 404,
            response: {
                "error": "error message"
            }
        })
        cy.visit('http://localhost:3000')
        .get('a[href="/movies/694919"]')
        .click()
        cy.contains('Could not retrieve selected movie, please try again')
        cy.get('button').should('be.visible')
    });
    it('Should show an error if user visits a bad url', () => {
      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/NaN', {
          statusCode: 404,
          response: {
              "error": "error message"
          }
      })
      cy.visit('http://localhost:3000/movies/potato')
      cy.contains('Could not retrieve selected movie, please try again')
      cy.get('button').should('be.visible')
  });
    it('Should be able to click back button on error to go back to homepage', () => {
        cy.intercept('GET', homePage, {
            statusCode: 200,
            fixture: 'movies'
            })
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
            statusCode: 404,
            response: {
                "error": "error message"
            }
        })
        cy.visit('http://localhost:3000')
        .get('a[href="/movies/694919"]').click()
        .get('button').click()
        cy.get('a').should('have.length', 8)
        .url().should('includes', '/')
    });
    it('Should be able to click back button on full movie view to go back to homepage', () => {
        cy.intercept('GET', homePage, {
            statusCode: 200,
            fixture: 'movies'
            })
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
            statusCode: 200,
            body: {
              movie: {
                  "id": 694919,
                  "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                  "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
                  "title": "Money Plane",
                  "average_rating": 6.666666666666667,
                  "release_date": "2020-09-29",
                  "overview": "Some overview that is full of buzzwords to attempt to entice you to watch this movie! Explosions! Drama! True love! Robots! A cute dog!", 
                  genres: ["Drama", "Mystery", "Animals", "Bad"], 
                  budget:63000000, 
                  revenue:100853753, 
                  runtime:139, 
                  tagline: "It's a movie!" 
              }
            }
        })
        cy.visit('http://localhost:3000')
        .get('a[href="/movies/694919"]').click()
        .get('button').click()
        cy.get('a').should('have.length', 8)
        .url().should('includes', '/')
    });
});