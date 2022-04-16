import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import WorkoutForm from './WorkoutForm';

import API_URL from '../apiConfig';

export default function WorkoutEdit({ exercisesList })
{
  const { id } = useParams();
  const navigate = useNavigate();

  // Request.body for PUT.
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

  // Dynamically updates state.
  function handleChange(event)
  {
    setUpdatedWorkout((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  // Selecting an exercise from dropdown.
  // function handleAdd(exerciseToAdd)
  // {
  //   console.log(exerciseToAdd);

  //   const temp = [...updatedWorkout.exercises, exerciseToAdd];
  //   setUpdatedWorkout({ ...updatedWorkout, exercises: temp });
  // }

  // Send PUT request.
  async function handleSubmit(event)
  {
    event.preventDefault();
    console.log(typeof updatedWorkout.exercises[0]);

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
        // Let user see updated workout details.
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
        // handleAdd={handleAdd}
        formData={updatedWorkout}
        setFormData={setUpdatedWorkout}
        exercisesList={exercisesList}
      />
    </div>
  );
}