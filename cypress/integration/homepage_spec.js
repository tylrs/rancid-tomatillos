describe('Homepage User Flows', () => {

      const requestURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'

    it('Should show all movies upon visiting the page', () => {
      cy.intercept('GET', requestURL, {
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
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
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
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
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
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
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
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
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
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
            statusCode: 200,
            body: {
                movies: [
                    {
                        "id": 694919,
                        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
                        "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
                        "title": "Money Plane",
                        "average_rating": 6.666666666666667,
                        "release_date": "2020-09-29"
                    },
                    {
                    "id": 337401,
                    "poster_path": "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
                    "backdrop_path": "https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
                    "title": "Mulan",
                    "average_rating": 4.909090909090909,
                    "release_date": "2020-09-04"
                    },
                    {
                    "id": 718444,
                    "poster_path": "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
                    "backdrop_path": "https://image.tmdb.org/t/p/original//x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg",
                    "title": "Rogue",
                    "average_rating": 5.428571428571429,
                    "release_date": "2020-08-20"
                    },
                    {
                    "id": 539885,
                    "poster_path": "https://image.tmdb.org/t/p/original//qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg",
                    "backdrop_path": "https://image.tmdb.org/t/p/original//54yOImQgj8i85u9hxxnaIQBRUuo.jpg",
                    "title": "Ava",
                    "average_rating": 5.111111111111111,
                    "release_date": "2020-07-02"
                    },
                    {
                    "id": 581392,
                    "poster_path": "https://image.tmdb.org/t/p/original//sy6DvAu72kjoseZEjocnm2ZZ09i.jpg",
                    "backdrop_path": "https://image.tmdb.org/t/p/original//gEjNlhZhyHeto6Fy5wWy5Uk3A9D.jpg",
                    "title": "Peninsula",
                    "average_rating": 7,
                    "release_date": "2020-07-15"
                    },
                    {
                    "id": 726739,
                    "poster_path": "https://image.tmdb.org/t/p/original//4BgSWFMW2MJ0dT5metLzsRWO7IJ.jpg",
                    "backdrop_path": "https://image.tmdb.org/t/p/original//t22fWbzdnThPseipsdpwgdPOPCR.jpg",
                    "title": "Cats & Dogs 3: Paws Unite",
                    "average_rating": 7.4,
                    "release_date": "2020-10-02"
                    },
                    {
                    "id": 627290,
                    "poster_path": "https://image.tmdb.org/t/p/original//irkse1FMm9dWemwlxKJ7RINT9Iy.jpg",
                    "backdrop_path": "https://image.tmdb.org/t/p/original//pGqBDYycGWsMYc57sYv5M9GAQoW.jpg",
                    "title": "Antebellum",
                    "average_rating": 6.375,
                    "release_date": "2020-09-02"
                    },
                    {
                    "id": 613504,
                    "poster_path": "https://image.tmdb.org/t/p/original//kiX7UYfOpYrMFSAGbI6j1pFkLzQ.jpg",
                    "backdrop_path": "https://image.tmdb.org/t/p/original//r5srC0cqU36n38azFnCyReEksiR.jpg",
                    "title": "After We Collided",
                    "average_rating": 5.25,
                    "release_date": "2020-09-02"
                    },
                ]
            }
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