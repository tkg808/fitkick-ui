import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import enUS from 'date-fns/locale/en-US';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListDropdown from './ListDropdown';
import { FaCalendarPlus } from "react-icons/fa";
import API_URL from '../apiConfig';

export default function Home({ loggedIn, userInfo, eventsList, getEventsList })
{
  const navigate = useNavigate();

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

  function handleSelectEvent(event)
  {
    navigate(`/events/${event.id}`);
  }

  useEffect(() =>
  {
    getEventsList();
  }, []);

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
      <Link to='/events/new'>
        <Button className='mb-4'>
          Add Event
        </Button>
      </Link>
      <Calendar
        localizer={localizer}
        events={eventsList}
        // Fixes issue of event rendering on the wrong day.
        startAccessor={({ date }) => addDays(new Date(date), 1)}
        // endAccessor={({ date }) => addDays(new Date(date), 1)}
        endAccessor="date"
        defaultView='month'
        views={['month']}
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={handleSelectEvent}
      />
    </Container>
  );
}