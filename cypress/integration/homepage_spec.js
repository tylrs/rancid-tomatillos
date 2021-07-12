describe('Homepage User Flows', () => {
    beforeEach(() => {
        
    })
    it('Should show all movies upon visiting the page', () => {
      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
        statusCode: 200,
        body: {
            movies: [
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
      cy.visit('http://localhost:3000')
      cy.contains('Rancid Tomatillos')
      cy.contains('Loading...')
      cy.get('a').should('have.length', 7)
    });

    it('Should show an error if there is a server error', () => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
          statusCode: 500,
          response: {
              "error": "error message",
          }
        })
        cy.visit('http://localhost:3000')
        cy.contains('Rancid Tomatillos')
        cy.contains('Oops server is down')
      });
});