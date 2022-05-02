import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Workouts from './components/Workouts';
import WorkoutNew from './components/WorkoutNew';
import WorkoutDetails from './components/WorkoutDetails';
import WorkoutEdit from './components/WorkoutEdit';
import Exercises from './components/Exercises';
import ExerciseNew from './components/ExerciseNew';
import ExerciseDetails from './components/ExerciseDetails';
import ExerciseEdit from './components/ExerciseEdit';
import EventDetails from './components/EventDetails';
import EventNew from './components/EventNew';
import EventEdit from './components/EventEdit';
import Signup from './components/Signup';
import Login from './components/Login';
import API_URL from './apiConfig';
import './App.css';

export default function App()
{
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [workoutsList, setWorkoutsList] = useState([]);
  const [exercisesList, setExercisesList] = useState([]);
  const [exerciseInfosList, setExerciseInfosList] = useState([]);
  const [eventsList, setEventsList] = useState([]);

  // Store token in local storage for persistance.
  function handleSetLoggedIn(token)
  {
    setLoggedIn(true);
    localStorage.setItem('token', token);
    getUserInfo();
  }

  // Attempts to get user info to update UI.
  async function getUserInfo()
  {
    try
    {
      const response = await fetch(API_URL + 'users/me',
        {
          headers:
          {
            Authorization: `Token ${localStorage.getItem('token')}`
          },
        });

      if (response.status === 200)
      {
        const data = await response.json();
        setUserInfo(data);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  async function handleLogout()
  {
    // Use here to prevent weird UI caused by server error.
    setLoggedIn(false);
    setUserInfo(null);

    // Destroys token.
    try
    {
      const response = await fetch(API_URL + 'token/logout/',
        {
          method: 'POST',
          headers:
          {
            Authorization: `Token ${localStorage.getItem('token')}`
          },
        });

      if (response.status === 204)
      {
        localStorage.removeItem('token');
        alert('You have been logged out!');
        navigate('/');
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  async function getExerciseInfosList()
  {
    try
    {
      // Need token to validation.
      const response = await fetch(API_URL + 'exercise-infos/',
        {
          method: 'GET',
          headers:
          {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        });

      if (response.status === 200)
      {
        const data = await response.json();
        setExerciseInfosList(data);
      }
    }
    catch (error)
    {
      // Server error.
      console.log(error);
    }
  }

  async function getExercisesList()
  {
    try
    {
      const response = await fetch(API_URL + 'exercises/');

      if (response.status === 200)
      {
        const data = await response.json();
        setExercisesList(data);
      }
    }
    catch (error)
    {
      // Server error.
      console.log(error);
    }
  }

  async function createExerciseInfo(exerciseId)
  {
    try
    {
      // Keys match fields in Django/Python.
      const newInfo =
      {
        exercise_id: Number(exerciseId),
        notes: ""
      };

      const response = await fetch(API_URL + 'exercise-infos/',
        {
          method: 'POST',
          body: JSON.stringify(newInfo),
          headers:
          {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          }
        });

      if (response.status === 201)
      {
        navigate('/exercises');
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  async function getWorkoutsList()
  {
    try
    {
      const response = await fetch(API_URL + 'workouts/');

      if (response.status === 200)
      {
        const data = await response.json();
        setWorkoutsList(data);
      }
    }
    catch (error)
    {
      // Server error.
      console.log(error);
    }
  }

  async function getEventsList()
  {
    try
    {
      // Need token to validation.
      const response = await fetch(API_URL + 'events/',
        {
          method: 'GET',
          headers:
          {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        });

      if (response.status === 200)
      {
        const data = await response.json();
        setEventsList(data);
      }
    }
    catch (error)
    {
      // Server error.
      console.log(error);
    }
  }

  console.log(eventsList);

  useEffect(() =>
  {
    if (localStorage.getItem('token'))
    {
      setLoggedIn(true);
      getUserInfo();
      getEventsList();
      getExerciseInfosList();
    }

    // Separate GET requests for flexibility.
    getExercisesList();
    getWorkoutsList();

    // Compares exercisesList to exerciseInfosList to determine if an exerciseInfo needs to be created.
    if (exercisesList.length !== exerciseInfosList.length)
    {
      exercisesList.forEach((exercise) =>
      {
        const info = exerciseInfosList.find((element) =>
        {
          return element.exercise_id === exercise.id;
        });

        if (!info)
        {
          createExerciseInfo(exercise.id);
        }
      });
    }

  }, []);

  return (
    <>
      <Navigation
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        userInfo={userInfo}
      />
      <main>
        <Container>
          <Routes>
            <Route
              path='/'
              element={<Home
                loggedIn={loggedIn}
                userInfo={userInfo}
                eventsList={eventsList}
                getEventsList={getEventsList}
              />}
            />
            <Route
              path='/workouts'
              element={<Workouts
                userInfo={userInfo}
                loggedIn={loggedIn}
                getWorkoutsList={getWorkoutsList}
                workoutsList={workoutsList}
              />}
            />
            <Route
              path='/workouts/new'
              element={<WorkoutNew
                exercisesList={exercisesList}
              />}
            />
            <Route
              path='/workouts/:id'
              element={<WorkoutDetails
                userInfo={userInfo}
                exerciseInfosList={exerciseInfosList}
              />}
            />
            <Route
              path='/workouts/:id/edit'
              element={<WorkoutEdit
                exercisesList={exercisesList}
              />}
            />
            <Route
              path='/exercises'
              element={<Exercises
                userInfo={userInfo}
                loggedIn={loggedIn}
                getExercisesList={getExercisesList}
                exercisesList={exercisesList}
                getExerciseInfosList={getExerciseInfosList}
              />}
            />
            <Route
              path='/exercises/new'
              element={<ExerciseNew />}
            />
            <Route
              path='/exercises/:id'
              element={<ExerciseDetails
                userInfo={userInfo}
                exerciseInfosList={exerciseInfosList}
              />}
            />
            <Route
              path='/exercises/:id/edit'
              element={<ExerciseEdit />}
            />
            <Route
              path='/events/:id'
              element={<EventDetails />}
            />
            <Route
              path='/events/new'
              element={<EventNew
                workoutsList={workoutsList}
              />}
            />
            <Route
              path='/events/:id/edit'
              element={<EventEdit
                workoutsList={workoutsList}
              />}
            />
            <Route
              path='/signup'
              element={<Signup />} />
            <Route
              path='/login'
              element={<Login handleSetLoggedIn={handleSetLoggedIn} />}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
}