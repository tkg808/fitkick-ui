import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';

export default function Exercises({ userInfo, loggedIn, getExercisesList, exercisesList })
{
  const [searchTerm, setSearchTerm] = useState("");
  const [radioChoice, setRadioChoice] = useState("name");

  // Refetches when navigated here via useNavigate.
  // Cleaner UI -- list items change appropriately.
  useEffect(() =>
  {
    getExercisesList();

  }, []);

  // Check with both states to prevent weird UI caused by server error.
  if (!loggedIn || !userInfo)
  {
    return (
      <Container className='p-5 border rounded-3 bg-light'>
        <h1>Exercises</h1>
        <h4>Sign up and find exercises based on type or muscles used!</h4>
        <Image
          rounded
          fluid
          src='https://cdn.pixabay.com/photo/2017/03/04/14/00/yoga-2116093_960_720.jpg'
        />
      </Container>
    )
  }

  function handleSearchTerm(event)
  {
    setSearchTerm(event.target.value);
  }

  function handleRadioChoice(event)
  {
    setRadioChoice(event.target.value);
  }

  console.log(radioChoice);
  console.log(exercisesList);
  console.log(userInfo);


  return (
    <Container>
      <h1>Exercises</h1>
      {loggedIn && (
        <Link to='/exercises/new'>
          <Button className='mb-4'>Create</Button>
        </Link>
      )}

      <form className='mb-2'>
        <input
          autofocus
          type="text"
          placeholder="Search..."
          onChange={handleSearchTerm}
          value={searchTerm}
        />
      </form>

      <form className='mb-4'>
        <input type="radio" id="name" name="search-type" value="name" onClick={handleRadioChoice} checked />
        <label className='mx-2' htmlFor="name">Name</label>
        <input type="radio" id="primary_muscles" name="search-type" value="primary_muscles" onClick={handleRadioChoice} />
        <label className='mx-2' htmlFor="primary_muscles">Primary</label>
        <input type="radio" id="secondary_muscles" name="search-type" value="secondary_muscles" onClick={handleRadioChoice} />
        <label className='mx-2' htmlFor="secondary_muscles">Secondary</label>
      </form>

      <Row xs={1} s={2} md={3}>
        {exercisesList.filter((exercise) =>
        {
          if (searchTerm === "" || exercise[radioChoice].toLowerCase().includes(searchTerm.toLowerCase()))
          {
            return exercise;
          }
        }).map((exercise) =>
        {
          return (
            <Col key={exercise.id} className='mb-4'>
              <Link
                to={`/exercises/${exercise.id}`}
                style={{ color: 'black', textDecoration: 'none' }}>
                <Card>
                  <Card.Body>
                    <Card.Title>{exercise.name}</Card.Title>
                    <Card.Text>
                      Type: {exercise.exercise_type}
                    </Card.Text>
                    <Card.Text>
                      Primary: {exercise.primary_muscles}
                    </Card.Text>
                    <Card.Text>
                      Secondary: {exercise.secondary_muscles}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}