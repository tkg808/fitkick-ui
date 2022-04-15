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
        setLoggedIn(false);
        setUserInfo(null);
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
    }

    // Separate GET requests for flexibility.
    getExercisesList();
    getWorkoutsList();

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
              />}
            />
            <Route
              path='/workouts'
              element={<Workouts
                loggedIn={loggedIn}
                getWorkoutsList={getWorkoutsList}
                workoutsList={workoutsList}
                setWorkoutsList={setWorkoutsList}
              />}
            />
            <Route
              path='/workouts/new'
              element={<WorkoutNew
                loggedIn={loggedIn}
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
              />}
            />
            <Route
              path='/exercises'
              element={<Exercises
                loggedIn={loggedIn}
                getExercisesList={getExercisesList}
                exercisesList={exercisesList}
                setExercisesList={setExercisesList}
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
              />}
            />
            <Route
              path='/exercises/:id/edit'
              element={<ExerciseEdit />}
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