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
      // Use token to validate filter in API views.
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

  // async function createExerciseInfo()
  // {
  //   try
  //   {
  //     const response = await fetch(API_URL + 'exercise-infos/',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify(newExercise),
  //         headers:
  //         {
  //           'Content-Type': 'application/json',
  //           Authorization: `Token ${localStorage.getItem('token')}`,
  //         }
  //       });

  //   }
  // }

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

  console.log(exercisesList);
  console.log(exerciseInfosList);

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
                getExerciseInfosList={getExerciseInfosList}
                exerciseInfosList={exerciseInfosList}
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