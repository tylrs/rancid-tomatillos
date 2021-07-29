# Rancid Tomatillos 

This two week React project was our entry into the framework, amongst other new technologies (Express & Cypress). We created an application in which the user can choose whichever movie available and learn more about it, as well as favorite it. 

[View Deployed App](https://rancid-tomatillos-tylrs.herokuapp.com/)

## Badges

<p text-align="center"> 
    <img alt="React Badge" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat-square)" />
    <img alt="JavaScript Badge" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat-square" />
    <img alt="HTML5 Badge" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=flat-square" />
    <img alt="CSS3 Badge" src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=flat-square" />
    <img alt="Sass Badge" src="https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff&style=flat-square" />
    <img alt="Express Badge" src="https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=flat-square" />
    <img alt="Cypress Badge" src="https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=fff&style=flat-square" />
</p>

## Features

- Full screen of available movies to select from
- Each movie has information displayed upon being selected
- User may favorite and unfavorite their movies
- Completely dynamic and fluid media queries
- Passed Waves & Lighthouse accessability with a 100%
- 100% test coverage with Cypress
- Express API server that holds user's favorites

## Demo

<p align="center">
  <img width="100%" src="https://user-images.githubusercontent.com/17935770/126243516-dde319cb-5ea3-426e-93f3-9708bac11d2d.gif">
</p>
  
## Installation

Clone the project and install dependencies

```szh 
git clone git@github.com:tylrs/rancid-tomatillos.git
cd rancid-tomatillos
npm install 
cd ..
```

Clone the Express server and install dependencies

```szh 
git clone git@github.com:tylrs/rancid-tomatillos-microservice.git
cd rancid-tomatillos-microservice
npm install 
```




    
## Deployment

To deploy, `cd` into the project folder and run

```zsh
npm start
``` 

After that, open up a new terminal and `cd` into the *rancid-tomatillos-microservice* repository and run

```zsh
nodemon server.js
```



  
## Future Changes

- Additional browser support
- Add a way for user to rate movies
- Add a dynamic search bar
- Add a user login
- Add page transition animations

## Project Reflections
We were asked to share the evolution of our project, our learning goals, and reflections

### Learning Goals
* What were the individual or joint goals?

> **Andrew's Goals**
> - Learn how to make CSS modular and more dynamic
> - Become more familiar with how APIs work in React

> **Tayler's Goal**
> - Becoming proficient in using Express

> **Mutual Goals**
> - Gain competency with React fundamentals
> - Learn how to use express to create our own API server
> - Deep understanding on Router & Asynchronous JS
> - Use Cypress to test the UI with 100% test coverage

### Evolution
- **Iteration 1:** We had to create sample data from our API and render the front page with it. With a little CSS, we created a grid of movie covers on the page with a header. At this point, we only had the `app.js` file and two components called MovieBoard and MovieCover
- **Iteration 2:**  Our next component, Movie , is where we display all of the movie data from the API. We initially used `onClick` to render the full movie page (with a back button) upon clicking one of the movie posters. We also had the other movies disappear by taking advantage of React's state attribute. 
- **Iteration 3:** This was where we added error handling and spruced up the page's elements with Sass. 
- **Iteration 4 - Part 1:** This was where we introduced Router into our projects. Once this was included we had to change how our states rendered because we ran into challenges with the data being fetched after the rendering. We were able to solve this problem by adding `componentDidMount` to our `Movie.js` component. 
- **Iteration 4 - Part 2:** We implemented cypress and eventually achieved 100% test coverage. There were challenges such as learning how to store stubs inside of fixtures and how to simulate "404" and "500" errors. 
- **Iteration 5:** Many challenges came with Iteration 5 due to the nature of adding another API element to our project. While building Express did not leave us with too many issues, connecting the user Favorites was difficult due to figuring out whether or not the boolean should live within the state or in the server. The CSS at this point is tidied and dynamic (with the help of mixins). The website is also fluid using `clamp` to allow clean growth/shrinkage while also having transitions in the breakpoints. 

### Reflections

Overall this project has served as a great launch into React. Both of us felt like this project taught us a lot. Each problem we faced led us to learning a lot more after spending a lot of time researching all of the possible solutions. It was compelling to have to learn two near technologies along side React and be able to incorporate it into our projects. We both met our learning goals and were both able to understand most aspect of the project, including all of the new technologies.
  
## Authors

- [@Taylor Galloway](https://github.com/tylrs)
- [@Andrew Vallejo](https://github.com/andrewvallejo)

  
