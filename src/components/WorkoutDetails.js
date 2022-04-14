import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API_URL from '../apiConfig';

export default function WorkoutDetails({ userInfo, loggedIn, exercisesList, setExercisesList })
{
  const [workout, setWorkout] = useState(null);
  const { id } = useParams();

  async function getWorkout()
  {
    try
    {
      const response = await fetch(API_URL + `workouts/${id}`);

      if (response.status === 200)
      {
        const data = await response.json();
        setWorkout(data);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  async function handleAdd(newId)
  {
    console.log(newId);
    const exerciseToAdd = exercisesList[newId - 1];
    console.log(exerciseToAdd);

    const temp = [...workout.exercises, exerciseToAdd.name];
    setWorkout({ ...workout, exercises: temp });
    console.log(workout);
    console.log(temp);

    try
    {


      const response = await fetch(API_URL + `workouts/${id}`,
        {
          method: 'PUT',
          body: workout,
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });

      if (response.status === 200)
      {
        Navigate(`/workouts/${id}`);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  function handleDelete(event)
  {
    return;
  }

  useEffect(() =>
  {
    getWorkout();
  }, [])

  if (!workout)
  {
    return null;
  }

  return (
    <Container className='p-5 border rounded-3 bg-light'>
      <div className='d -flex justify-content-between'>
        <div>
          <h2>{workout.name}</h2>
        </div>
        {userInfo && userInfo.username === workout.owner && (
          <div>
            <Link
              to={`/workouts/${workout.id}/edit`}
              className='btn btn-secondary'>
              Edit
            </Link>
            <Button onClick={handleDelete} variant='danger'>
              Delete
            </Button>
          </div>
        )}
      </div>
      <h2 className='mt-4'>Exercises: </h2>
      {!workout.exercises.length && <p>Try adding some exercises!</p>}
      {loggedIn &&
        <Dropdown >
          <Dropdown.Toggle variant='success'>Add Exercise</Dropdown.Toggle>
          <Dropdown.Menu >
            {exercisesList.map((option) =>
            {
              return (
                <Dropdown.Item
                  key={option.id}
                  onClick={() => handleAdd(option.id)}
                >
                  {option.name}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>}
      {
        workout.exercises.length > 0 &&
        workout.exercises.map((exercise, index) =>
        {
          return (
            <Container
              className='m-4 p-5 border rounded-3 bg-light'
              key={index}>
              <h4>{exercise}</h4>
              {userInfo && userInfo.username === workout.owner && (
                <div>
                  <Button variant='secondary' className='m-4'>
                    Edit
                  </Button>
                  <Button variant='danger'>Delete</Button>
                </div>
              )}
            </Container>
          );
        })
      }
    </Container >
  );
}