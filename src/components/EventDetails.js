import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import API_URL from '../apiConfig';

export default function EventDetails({ getEventsList })
{
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  async function getEventDetails()
  {
    try
    {
      const response = await fetch(API_URL + `events/${id}`);

      if (response.status === 200)
      {
        const data = await response.json();
        console.log(data);
        const date = new Date(data.date);
        setEvent({ ...data, date: date });
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  async function handleDelete()
  {
    const confirm = window.confirm('Are you sure you want to delete?');

    if (confirm)
    {
      try
      {
        const response = await fetch(API_URL + `events/${id}`,
          {
            method: 'DELETE',
            headers:
            {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
          });

        if (response.status === 204)
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

  useEffect(() =>
  {
    getEventDetails();
  }, []);

  console.log(event);

  // Prevents weird UI before state can update.
  if (!event)
  {
    return null;
  }

  return (
    <Container className='p-5 border rounded-3 bg-light'>
      <div className='d -flex justify-content-between'>
        <div>
          <h2>{event.title}</h2>
        </div>
        <div>
          <Link
            to={`/events/${event.id}/edit`}
            className='btn btn-secondary'>
            Edit Event
          </Link>
          <Button onClick={handleDelete} variant='danger'>
            Delete
          </Button>
        </div>

        <Link
          to={`/events/${event.workout_id}/edit`}
          className='btn btn-secondary'>
          {event.workout_name}
        </Link>
      </div>
    </Container >
  );
}