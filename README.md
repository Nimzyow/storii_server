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
- [A bit about us](#a-bit-about-us)
- [Extra notes](#extra-notes)

## Installation

Follow these steps to install required dependencies:

1. In the root of the projecttype the following in your terminal:

```
$ npm install
```

That's it! Phew!

## Database

You will need to sign up to MongoDB and create a cluster.

Once you have created a cluster, you will need to find what the connection URI is.

Click on connect when viewing your cluster and a model should pop up with 3 options. click on "Connect your application" to see your MongoURI.

You will need to create 4 environmental variables.

1. storiiJwtSecret (can be a secret word of your choice)

2. testURI (this will be your MongoURI)

3. developmentURI (this will be your MongoURI except that the word "test" in the MongoURI needs to be replaced with "development")

4. storii_server_url (set this to "http://localhost:4000")

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

Yay! You just turned on the server for this project! Don't expect to see anything though as there is no frontend in this repo. [Go to the frontend repo](https://github.com/ShinyVerse/Storii) and follow the instructions there to fire up the front end to see this application running!

## Planning

This project was done as a pair by Laura Jackson and Nima Soufiani. We decided to give ourselves an exciting and cute project to do to level up ourselves. The majority of thought was placed into TDD and readability. Everyday we discussed ways to make our work more readable and we vigirously stuck to TDD'ing with Supertest, Chai and Sinon.

The backend, which is this very repo you're on, was built with Node and Express. A lot of thought and time was put into the structure, the file layout of this repo and to the quality of tests. This was all done with the end goal being very readable and easily maintainable code.

We also decided early on to user MongoDB to handle our database and the ORM to be handled by Mongoose. The reason for this is the flexibility and ease of adaptiablity to our frequent changing needs, which we anticipate will happen, with this application.

## Tech stack

- Node
- Express
- Supertest
- chai
- MongoDB
- Mongoose
- eslint
- prettier

### A bit about us

| Name          | Favourite color | Favourite food | favourite activity | Favourite country | Recommended book         |
| :------------ | :-------------- | :------------- | :----------------- | :---------------- | :----------------------- |
| Laura Jackson | Yellow          | Potato Wedges  | gaming             | England           | The morbidly obese Ninja |
| Nima Soufiani | blue            | thinking       | Scuba diving       | Japan             | Animal farm              |

## Extra notes

This project was done entirely remotely which allowed us practice pairing and remote working. Altogether it's been very productive so far and demonstrated that even when working remotely we can still get stuff done. Putting real thought into the structure, naming and placement of files in this repo was great fun and has paid off in dividends as it is very intuitive where any file should be. We will apply this same thought process as the application grows further.
