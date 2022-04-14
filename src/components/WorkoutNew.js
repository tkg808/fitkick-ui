import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WorkoutNew({ loggedIn })
{
  const initialData =
  {
    name: '',
    notes: '',
    exercises: []
  };

  const navigate = useNavigate();
  const [newWorkout, setNewWorkout] = useState(initialData);

  const handleChange = (event) =>
  {
    setNewWorkout((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  async function createWorkout(event)
  {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    try
    {
      const response = await fetch(API_URL + 'workouts/',
        {
          method: 'POST',
          body: formData,
          headers:
          {
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

  return (
    <div>
      <h2>Add a Workout</h2>
      <WorkoutForm
        handleSubmit={createWorkout}
        handleChange={handleChange}
        formData={newWorkout}
      />
    </div>
  );
}