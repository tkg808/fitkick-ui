import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  // Dynamically updates state.
  function handleChange(event)
  {
    setUpdatedWorkout((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  // PUT request.
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
        // Let user see updated workout details.
        navigate(`/workouts/${id}`);
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
  }, []);

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
        formData={updatedWorkout}
        setFormData={setUpdatedWorkout}
        exercisesList={exercisesList}
      />
    </div>
  );
}