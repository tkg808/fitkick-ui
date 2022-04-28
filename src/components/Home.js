import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListDropdown from './ListDropdown';
import API_URL from '../apiConfig';

export default function Home({ loggedIn, userInfo, workoutsList, eventsList, getEventsList })
{
  const locales = {
    'en-US': enUS,
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const emptyEvent = {
    title: "",
    workout_id: "",
    workout_name: "",
    date: "",
  };

  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState(emptyEvent);


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
          setNewEvent(emptyEvent);
          getEventsList();
        }
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }

  // useEffect(() =>
  // {

  // }, []);

  console.log(eventsList);

  // Check with both states to prevent weird UI caused by server error.
  if (!loggedIn && !userInfo)
  {
    return (
      <Container className='p-5 border rounded-3 bg-light'>
        <h1>FitKick</h1>
        <h4>Your sidekick to being fit! Sign up today!</h4>
        <Image
          rounded
          fluid
          src='https://cdn.pixabay.com/photo/2021/01/04/06/20/man-5886570_960_720.jpg'
        />
      </Container>
    )
  }
  else if (!userInfo)
  {
    return null;
  }

  return (
    <Container className='p-5 border rounded-3 bg-light'>
      <h1>{userInfo.username.toUpperCase()}</h1>
      <h3>Add New Event:</h3>
      <div className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={handleChange}
        />
        <div>
          <input type="text" placeholder="Select a Workout" value={newEvent.workout_name} disabled />
          <ListDropdown
            title="Workouts"
            name="workout"
            list={workoutsList}
            handleChoice={handleChoice}
          />
        </div>
        <DatePicker
          placeholderText="Workout Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.date}
          onChange={(date) => setNewEvent({ ...newEvent, date: date })}
        />
        <button onClick={createEvent}>Submit</button>
      </div>
      <Calendar
        localizer={localizer}
        events={eventsList}
        startAccessor="date"
        endAccessor="date"
        view='month'
        views={['month']}
        style={{ height: 500, margin: "50px" }}
      />
    </Container>
  );
}