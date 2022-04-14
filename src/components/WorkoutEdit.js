import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkoutForm from './WorkoutForm';

import API_URL from '../apiConfig';

export default function WorkoutEdit({ exercisesList })
{
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedWorkout, setUpdatedWorkout] = useState(null);

  async function getWorkoutDetails()
  {
    try
    {
      const response = await fetch(API_URL + `workouts/${id}`);
      if (response.status === 200)
      {
        const data = await response.json();
        setUpdatedWorkout(data);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  useEffect(() =>
  {
    getWorkoutDetails();
  }, [])

  function handleChange(event)
  {
    setUpdatedWorkout((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleAdd(exerciseToAdd)
  {
    console.log(exerciseToAdd);

    const temp = [...updatedWorkout.exercises, exerciseToAdd];
    setUpdatedWorkout({ ...updatedWorkout, exercises: temp });
  }

  async function handleSubmit(event)
  {
    event.preventDefault();

    try
    {
      const response = await fetch(API_URL + `workouts/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedWorkout),
          headers:
          {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });

      if (response.status === 200)
      {
        navigate(`/workouts/${id}`);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  console.log(updatedWorkout);

  if (!updatedWorkout)
  {
    return null;
  }

  return (
    <div>
      <h2>Edit Workout </h2>
      < WorkoutForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleAdd={handleAdd}
        exercisesList={exercisesList}
        formData={updatedWorkout}
      />
    </div>
  );
}