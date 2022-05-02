import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import API_URL from '../apiConfig';

export default function EventEdit({ workoutsList })
{
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedEvent, setUpdatedEvent] = useState(null);

  async function getEventDetails()
  {
    try
    {
      const response = await fetch(API_URL + `events/${id}`);

      if (response.status === 200)
      {
        const data = await response.json();
        const date = new Date(data.date);
        setUpdatedEvent({ ...data, date: date });
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  function handleChange(event)
  {
    setUpdatedEvent((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  async function handleEditRequest(event)
  {
    event.preventDefault();

    try
    {
      // Converts Date object to proper format for request.
      const formattedDate = JSON.stringify(updatedEvent.date).substring(1, 11);

      const response = await fetch(API_URL + `events/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ ...updatedEvent, date: formattedDate }),
          headers:
          {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });

      if (response.status === 200)
      {
        navigate(`/events/${id}`);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  function handleChoice(workoutChoice)
  {
    setUpdatedEvent((prevState) =>
    {
      return {
        ...prevState,
        workout_id: workoutChoice.id,
        workout_name: workoutChoice.name
      }
    });
  }

  useEffect(() =>
  {
    getEventDetails();
  }, []);

  if (!updatedEvent)
  {
    return null;
  }

  return (
    <div>
      <h2>Edit Exercise</h2>
      < EventForm
        formData={updatedEvent}
        setFormData={setUpdatedEvent}
        workoutsList={workoutsList}
        handleChange={handleChange}
        handleChoice={handleChoice}
        handleSubmit={handleEditRequest}
      />
    </div>
  );
}