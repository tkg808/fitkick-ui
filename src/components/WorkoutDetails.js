import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import API_URL from '../apiConfig';

export default function WorkoutDetails({ userInfo })
{
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);

  async function getWorkoutDetails()
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

  async function handleDelete()
  {
    const confirm = window.confirm('Are you sure you want to delete?');

    if (confirm)
    {
      try
      {
        const response = await fetch(API_URL + `workouts/${id}`,
          {
            method: 'DELETE',
            headers:
            {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
          });

        if (response.status === 204)
        {
          navigate('/workouts');
        }
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }

  useEffect(() =>
  {
    getWorkoutDetails();
  }, []);

  // Prevents weird UI before state can update.
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
      {
        workout.exercises.length > 0 &&
        workout.exercises.map((exercise, index) =>
        {
          return (
            <Container
              className='m-4 p-3 border rounded-3 bg-light'
              key={index}>
              <h4>{exercise}</h4>
            </Container>
          );
        })
      }
    </Container >
  );
}