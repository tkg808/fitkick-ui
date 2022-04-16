import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutForm from './WorkoutForm';

import API_URL from '../apiConfig';

export default function WorkoutNew({ loggedIn, exercisesList })
{
  const initialData =
  {
    name: '',
    notes: '',
    exercises: []
  };

  const navigate = useNavigate();
  const [newWorkout, setNewWorkout] = useState(initialData);

  function handleChange(event)
  {
    setNewWorkout((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  async function createWorkout(event)
  {
    event.preventDefault();
    console.log(newWorkout);
    try
    {
      const response = await fetch(API_URL + 'workouts/',
        {
          method: 'POST',
          body: JSON.stringify(newWorkout),
          headers:
          {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          }
        });

      if (response.status === 201)
      {
        navigate('/workouts');
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  function handleAdd(exerciseToAdd)
  {
    console.log(exerciseToAdd);

    const temp = [...newWorkout.exercises, exerciseToAdd];
    setNewWorkout({ ...newWorkout, exercises: temp });
  }

  console.log(newWorkout);

  return (
    <div>
      <h2>Create New Workout</h2>
      <WorkoutForm
        handleSubmit={createWorkout}
        handleChange={handleChange}
        formData={newWorkout}
        setFormData={setNewWorkout}
        // handleAdd={handleAdd}
        exercisesList={exercisesList}
      />
    </div>
  );
}