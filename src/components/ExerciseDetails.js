import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import API_URL from '../apiConfig';

export default function ExerciseDetails({ userInfo, getExerciseInfosList, exerciseInfosList })
{
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  // const [info, setInfo] = useState(null);

  async function getExerciseDetails()
  {
    try
    {
      const response = await fetch(API_URL + `exercises/${id}`);

      if (response.status === 200)
      {
        const data = await response.json();
        setExercise(data);
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
        const response = await fetch(API_URL + `exercises/${id}`,
          {
            method: 'DELETE',
            headers:
            {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
          });

        if (response.status === 204)
        {
          navigate('/exercises');
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
    getExerciseInfosList();
    getExerciseDetails();

    // Comparing String to Number.
    // const infoData = exerciseInfosList.find((element) => element.exercise_id == id);

    // PUT or POST.
    // if (infoData)
    // {
    //   getExerciseInfoDetails(infoData.id);
    // }
    // else
    // {
    //   createExerciseInfoDetails();
    // }
  }, []);

  if (!exercise || !info)
  {
    return null;
  }

  return (
    <Container className='p-5 border rounded-3 bg-light'>
      <div className='d -flex justify-content-between'>
        <div>
          <h2>{exercise.name}</h2>
          <h5>Type: {exercise.exercise_type}</h5>
          <h5>Primary: {exercise.primary_muscles}</h5>
          <h5>Secondary: {exercise.secondary_muscles}</h5>
        </div>
        {userInfo && userInfo.username === exercise.owner && (
          <div>
            <Link
              to={`/exercises/${exercise.id}/edit`}
              className='btn btn-secondary'>
              Edit
            </Link>
            <Button onClick={handleDelete} variant='danger'>
              Delete
            </Button>
          </div>
        )}
      </div>
    </Container >
  );
}