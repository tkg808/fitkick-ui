import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExerciseForm from './ExerciseForm';
import API_URL from '../apiConfig';

export default function ExerciseEdit()
{
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedExercise, setUpdatedExercise] = useState(null);

  async function getExerciseDetails()
  {
    try
    {
      const response = await fetch(API_URL + `exercises/${id}`);
      if (response.status === 200)
      {
        const data = await response.json();
        setUpdatedExercise(data);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  function handleChange(event)
  {
    setUpdatedExercise((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event)
  {
    event.preventDefault();

    try
    {
      const response = await fetch(API_URL + `exercises/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedExercise),
          headers:
          {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });

      if (response.status === 200)
      {
        navigate(`/exercises/${id}`);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  useEffect(() =>
  {
    getExerciseDetails();
  }, []);

  if (!updatedExercise)
  {
    return null;
  }

  return (
    <div>
      <h2>Edit Exercise </h2>
      < ExerciseForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={updatedExercise}
        setFormData={setUpdatedExercise}
      />
    </div>
  );
}