import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import API_URL from '../apiConfig';

export default function EventNew({ workoutsList })
{
  const emptyState =
  {
    title: "",
    workout_id: "",
    workout_name: "",
    date: "",
  };

  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState(emptyState);

  function handleChange(event)
  {
    setNewEvent((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleChoice(workoutChoice)
  {
    setNewEvent((prevState) =>
    {
      return {
        ...prevState,
        workout_id: workoutChoice.id,
        workout_name: workoutChoice.name
      }
    });
  }

  async function createEvent(event)
  {
    event.preventDefault();

    if (newEvent.title && newEvent.workout_id && newEvent.date)
    {
      try
      {
        const response = await fetch(API_URL + 'events/',
          {
            method: 'POST',
            body: JSON.stringify(newEvent),
            headers:
            {
              'Content-Type': 'application/json',
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
          });

        if (response.status === 201)
        {
          navigate('/');
        }
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <h2>Create New Event</h2>
      <EventForm
        formData={newEvent}
        setFormData={setNewEvent}
        handleChange={handleChange}
        workoutsList={workoutsList}
        handleChoice={handleChoice}
        handleSubmit={createEvent}
      />
    </div>
  );
}