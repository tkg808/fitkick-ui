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
  const [error, setError] = useState(false);

  // Store token in local storage for persistance.
  function handleSetLoggedIn(token)
  {
    console.log(token);
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
        console.log(data);
        setUserInfo(data);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  // Destroys token.
  async function handleLogout()
  {
    setError(false);
    // Use here to prevent weird UI caused by server error.
    setLoggedIn(false);
    setUserInfo(null);

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
      setError(true);
      console.log(error);
    }
  }

  async function getExerciseInfosList()
  {
    setError(false);

    try
    {
      // Requests use token to validate filter in API views.
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
    catch
    {
      // Server error.
      setError(true);
    }
  }

  async function getExercisesList()
  {
    setError(false);

    try
    {
      const response = await fetch(API_URL + 'exercises/');

      if (response.status === 200)
      {
        const data = await response.json();
        setExercisesList(data);
      }
    }
    catch
    {
      // Server error.
      setError(true);
    }
  }

  async function getWorkoutsList()
  {
    setError(false);

    try
    {
      const response = await fetch(API_URL + 'workouts/');

      if (response.status === 200)
      {
        const data = await response.json();
        setWorkoutsList(data);
      }
    }
    catch
    {
      // Server error.
      setError(true);
    }
  }

  useEffect(() =>
  {
    if (localStorage.getItem('token'))
    {
      setLoggedIn(true);
      getUserInfo();
      getExerciseInfosList();
    }

    // Separate GET requests for flexibility.
    getExercisesList();
    getWorkoutsList();

  }, []);

  console.log(exerciseInfosList);

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
              />}
            />
            <Route
              path='/workouts'
              element={<Workouts
                userInfo={userInfo}
                loggedIn={loggedIn}
                getWorkoutsList={getWorkoutsList}
                workoutsList={workoutsList}
                getExerciseInfosList={getExerciseInfosList}
                exerciseInfosList={exerciseInfosList}
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
                loggedIn={loggedIn}
                exercisesList={exercisesList}
                setExercisesList={setWorkoutsList}
              />}
            />
            <Route
              path='/workouts/:id/edit'
              element={<WorkoutEdit
                exercisesList={exercisesList}
                exerciseInfosList={exerciseInfosList}
              />}
            />
            <Route
              path='/exercises'
              element={<Exercises
                userInfo={userInfo}
                loggedIn={loggedIn}
                getExercisesList={getExercisesList}
                setExercisesList={setExercisesList}
                exercisesList={exercisesList}
                getExerciseInfosList={getExerciseInfosList}
                exerciseInfosList={exerciseInfosList}
              />}
            />
            <Route
              path='/exercises/new'
              element={<ExerciseNew
                loggedIn={loggedIn}
              />}
            />
            <Route
              path='/exercises/:id'
              element={<ExerciseDetails
                userInfo={userInfo}
                loggedIn={loggedIn}
                getExerciseInfosList={getExerciseInfosList}
                exerciseInfosList={exerciseInfosList}
              />}
            />
            <Route
              path='/exercises/:id/edit'
              element={<ExerciseEdit exerciseInfosList={exerciseInfosList} />}
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