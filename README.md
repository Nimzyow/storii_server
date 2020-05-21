Storii_server

List of things to do:

- install dependencies
    nodemon [x]
    express [x]
    bcrypt [x]
    jwt [x]
    mocha [x]
    supertest [x]

- make a get request to "/" for a response x

- install dependencies
    mongoose [x]

- mongoose
    set up User Schema [x]
    set up Story Schema [x]
    set up Entry Schema [x]

- node/express
    
    API/AUTH
    1 - create a new user [x] tests []
    2 - login and authenticate user [x] tests []

    API/STORY
    3 - add a story(use only once for MVP) [] tests []
    4 - get a story [] tests []
    
    API/ENTRY
    5 - add a new entry to entry table [x] tests []
    
# Storii

So you have an idea for a story and you've written your first line. Wouldn't it be great to collobarte and get a community to contribute to your work? As your contributes create entries to your story, see the seeds of your story grow as they twist and turn before you creating adventures never before thought of. Who knows where your next story will lead you? Let's create memories, let's create Storiis, together.

![book](https://www.incimages.com/uploaded_files/image/970x450/getty_883231284_200013331818843182490_335833.jpg)

### THIS REPO ONLY INCLUDES THE BACKEND FOR STORII. FOR THE FRONTEND REPO, [CLICK HERE](https://github.com/ShinyVerse/Storii).

## Table of content

- [Installation](#installation)
- [Database](#database)
- [Testing](#testing)
- [Running the application](#running-the-application)
- [Tech stack](#tech-stack)
- [Extra notes](#extra-notes)
- [Team who collaborated on this project](#team-who-collaborated-on-this-project)

## Installation

Follow these steps to install required dependencies:

1. In the root of the projecttype the following in your terminal:

```
$ npm install
```

That's it! Phew!

## Database

INSTRUCTIONS TO BE GIVEN HERE AS TO HOW TO SETUP ENVIROMENTAL VARIABLES.

## Testing

Follow these steps to run tests for the backend:

1. In the root of the project, type the following in your terminal:

```
$ npm run test
```

You should see the tests for the backend in the terminal.

## Running the application

Follow these steps to run the server:

1. In the root of the project, type the following in your terminal:

```
$ npm run server
```

Yay! You just turned on the server for this project! This won't do us much good though as you won't be able to see anything. Fire up an API testing application to test the end points.

A collection for Postman can be found here: "Nima: Hey Laura, shall we include link to postman collection?"

## Planning

This was a group project done for the presentation day at Makers Academy. It involved us giving a presentation on a project we worked. We were given just over a week to come up with an idea and create an application in just over a week. The original backend was done in Rails using a SQL database and the front end was done in React using Reacts Context API for state management. I was resposible for the front end. I wanted more responsibilites in the backend and thought it would be a great exercise to rip out the Rails backend and convert that to a JavaScript backend using Node.js, Express.js and MongoDB as the DB. 

The aim is not only convert the backend but to also thoroughly test it. I believe I've demonstrated my capabilites in using Reacts Context API but I also wanted to demonstrate my capabilites in Redux. To that end I made another aim to convert Reacts Context API to Redux as I believe this will be a great evidence that I am more than competant in the use of Redux.

**From the below paragraph to the end of the Planning portion of this README is the original brainstorming and planning of this project involving Rails as the backend.**

The planning of this application started out with a brainstorming session where we laid out all of our ideas. The group had many interesting ideas which we discussed in depth:

![ideas](https://raw.githubusercontent.com/rafahg/travel-final-project/master/images/ideas.png)

In the end, we chose to work on an application we felt could challenge us in many areas, called DateSpot. It is an date curator which will get rid of the stress of thinking of a location or what you should do on a date.

![dateSpotBrainStorm](https://raw.githubusercontent.com/rafahg/travel-final-project/master/images/dateSpotBrainStorm.png)

For our MVP we decided to keep it as simple as possible. Our MVP would be to simple display a list of curated dating spots on the main page.

![mvp](https://raw.githubusercontent.com/rafahg/travel-final-project/master/images/mvp.png)

## Tech stack

- JavaScript
- React (hooks)
- Redux
- Jest and Enzyme
- Cypress
- Node
- Express
- Supertest
- chai
- nyc
- MongoDB
- Mongoose
- eslint
- prettier

## Team who collaborated on the original project which includes Ruby on Rails as the backend

### and their daily roles

| Name                 | Favourite color           | Favourite food           | favourite activity           | Favourite country           | Recommended book           |
| :------------------- | :-------------- | :-------------- | :-------------- | :-------------- | :-------------- |
| Laura Jackson       | Game    | of      | thrones    | in | Chinese          |
| Nima Soufiani        | blue      | thinking    | Scuba diving | Japan          | Animal farm    |



## Extra notes

This project is turning to be a great exercise to really test my capabilites. I am not only trying to convert the backend to Node and Express with MongoDB as my database, I am also converting Reacts Context API to Redux. I am also doing all of this with testing in mind. I aim to have the backend and front end thoroughly tested. My use of Tests and implementation of Redux will be the main showcase of this project.


    




