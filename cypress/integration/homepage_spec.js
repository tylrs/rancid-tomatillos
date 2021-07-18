describe('Homepage User Flows', () => {

  const moviesReq = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
  const singleMovieReq = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
  const singleMovieReq2 = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/718444'

    it('Should show all movies upon visiting the page', () => {
      cy.intercept('GET', moviesReq, {
        statusCode: 200,
        fixture: 'movies' 
      })
      cy.visit('http://localhost:3000')
      cy.contains('Rancid Tomatillos')
      cy.contains('Loading...')
      cy.get('a').should('have.length', 9)
      cy.get('a[href="/movies/694919"] img').should('be.visible')
    });

    it('Should show an error if there is a server error', () => {
        cy.intercept('GET', moviesReq, {
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
        cy.intercept('GET', moviesReq, {
          statusCode: 200,
          fixture: 'movies'
      })
        cy.intercept('GET', singleMovieReq, {
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
        cy.contains('6.67')
        cy.contains('$63,000,000')
        cy.contains('$100,853,753')
        cy.contains('09-29-2020')
        cy.get('.genre-container').should('include.text', 'Drama')
        cy.contains('Drama')
      });

    it('Should not show budget or revenue if those values are 0', () => {
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
        })
        cy.intercept('GET', singleMovieReq2, {
            statusCode: 200,
            fixture: 'movie2'
        }) 
        .visit('http://localhost:3000')
        .get('a[href="/movies/718444"]')
        .click()
        .url().should('include', '/movies/718444')
        cy.get('body').should('not.contain', 'Budget')
        cy.get('body').should('not.contain', 'Revenue')
    });

    it('Should show an error if movie id is not found', () => {
        cy.intercept('GET', moviesReq, {
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

    it('Should be able to click back button on error to go back to moviesReq', () => {
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
            })
        cy.intercept('GET', singleMovieReq, {
            statusCode: 404,
            response: {
                "error": "error message"
            }
        })
        cy.visit('http://localhost:3000')
        .get('a[href="/movies/694919"]').click()
        .get('button').click()
        cy.get('a').should('have.length', 9)
        .url().should('includes', '/')
    });

    it('Should be able to click back button on full movie view to go back to moviesReq', () => {
        cy.intercept('GET', moviesReq, {
            statusCode: 200,
            fixture: 'movies'
            })
        cy.intercept('GET', singleMovieReq, {
            statusCode: 200,
            fixture: 'movie'
        })
        cy.visit('http://localhost:3000')
        .get('a[href="/movies/694919"]').click()
        .get('button').click()
        cy.get('a').should('have.length', 9)
        .url().should('includes', '/')
    });
});