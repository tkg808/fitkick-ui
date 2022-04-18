import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseForm from './ExerciseForm';
import API_URL from '../apiConfig';

export default function ExerciseNew()
{
  const initialData =
  {
    name: '',
    notes: ''
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
        handleSubmit={createExercise}
        handleChange={handleChange}
        formData={newExercise}
      />
    </div>);
}