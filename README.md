# FitKick-UI

This is the repo for the front-end of the FitKick app. The purpose of this app is to make it easier for people to get/stay fit by helping users find exercises and create workouts based on their needs.

### FitKick Back-End

The back-end for this app can be found at:

> https://github.com/tkg808/fitkick-api

## Technologies Used

* VScode
* Netlify
* JavaScript
* React.js
* React-router-dom
* Bootstrap
* React-bootstrap
* React-router-bootstrap
* React-big-calendar
* Date-fns
* React-datepicker
* Pages
* Pixabay

## Installation Instructions

* Fork and clone this repo

> git clone https://github.com/tkg808/fitkick-ui.git

* Change into this directory

> cd fitkick-ui

* Open in your preferred IDE

* Install dependencies

```
npm i react@17 react-dom@17 react-router-dom bootstrap react-bootstrap react-router-bootstrap react-big-calendar date-fns react-datepicker
```
    * Some dependencies can't exceed version 17.02 to be able to work with calendar dependencies

### Important Note

In order to use this code, you will need to set up the api for it:

> https://github.com/tkg808/fitkick-api

* Open http://localhost:3000 to view the app in the browser

## Contribution Guidelines

### How to Contribute

Feel free to contribute to this app with code or suggestions. If you would like to contribute code - install the app, checkout to a dev branch, play with the code, then submit a pull request.

### How to Identify Bugs

You can submit an issue on the git repo, or work on a dev branch and submit a pull request with suggested code to fix the bug. Please detail the bug and recommendations for solutions if possible.

### How to Propose Improvements

You can submit an issue on the git repository detailing your suggestion.

# Planning

## Wireframes

### Component Architecture
![component-architecture](http://tinyimg.io/i/FuMF4eH.png)

### Model UI
![model-ui](http://tinyimg.io/i/BPV54O7.png)

### Form UI
![form-ui](http://tinyimg.io/i/qfUDWUx.png)

## User Stories

### MVP Goals

* As a user, I want to be able to create/retrieve/update/delete a workout so I can accurately maintain a list of workouts I like for future reference.
* As a user, I want to be able to create/retrieve/update/delete an exercise so I can accurately maintain a list of exercises I like for future reference.
* As a user, I want to be able to see other users' workouts and exercises so I can get ideas for workouts and exercises I can do.
* As a user, I want to be able to search for exercises based on different criteria so I can get ideas for exercises I can do.
* As a user, I want to be able to login so that the workouts and exercises I create can only be changed or deleted by me.

### Stretch Goals

* As a user, I want to be able to save certain information for exercises (ie notes, sets, reps, weights, etc.) that are exclusive to me even if I didn't create that exercise so that I can effectively track my experiences with those exercises.
* As a user, I want to be able to look back at past workouts so that I can see my progress and possibly make adjustments to my workouts.
* As a user, I want to be able to connect with other users so that I can feel a sense of community that can help keep me accountable.
