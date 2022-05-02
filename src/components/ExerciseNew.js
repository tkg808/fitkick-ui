import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseForm from './ExerciseForm';
import API_URL from '../apiConfig';

export default function ExerciseNew()
{
  const initialData =
  {
    name: '',
    exercise_type: '',
    primary_muscles: '',
    secondary_muscles: '',
  }

  const navigate = useNavigate();
  const [newExercise, setNewExercise] = useState(initialData);

  function handleChange(event)
  {
    setNewExercise((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  async function createExercise(event)
  {
    event.preventDefault();

    try
    {
      const response = await fetch(API_URL + 'exercises/',
        {
          method: 'POST',
          body: JSON.stringify(newExercise),
          headers:
          {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          }
        });

      if (response.status === 201)
      {
        // User can see exercise was added to list.
        navigate('/exercises');
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Create New Exercise</h2>
      <ExerciseForm
        formData={newExercise}
        handleChange={handleChange}
        handleSubmit={createExercise}
      />
    </div>);
}