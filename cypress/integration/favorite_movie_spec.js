describe('Favorite Movies User Flow', () => {
    const singleMovieReq = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    const favoriteMoviesReq = 'http://localhost:3001/favorites'

    it('Should show an empty heart when first visiting movie details', () => {
        cy.intercept('GET', singleMovieReq, {
            statusCode: 200,
            fixture: 'movie'
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
})