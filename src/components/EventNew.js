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
        // Converts Date object to proper format for request.
        const formattedDate = JSON.stringify(newEvent.date).substring(1, 11);

        const response = await fetch(API_URL + 'events/',
          {
            method: 'POST',
            body: JSON.stringify({ ...newEvent, date: formattedDate }),
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