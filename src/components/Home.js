import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import DatePicker from "react-datepicker";

export default function Home({ loggedIn, userInfo })
{
  // Check with both states to prevent weird UI caused by server error.
  if (!loggedIn || !userInfo)
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

  const locales = {
    'en-US': enUS,
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  const events = [
    {
      title: "Workout",
      allDay: true,
      start: new Date(2022, 3, 0),
      end: new Date(2022, 3, 0),
    },
    {
      title: "Routine",
      start: new Date(2022, 3, 4),
      end: new Date(2022, 3, 11)
    },
    {
      title: "Cycle",
      start: new Date(2022, 3, 11),
      end: new Date(2022, 4, 9)
    },
  ]

  return (
    <Container className='p-5 border rounded-3 bg-light'>
      <h1>{userInfo.username.toUpperCase()}</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </Container>
  );
}