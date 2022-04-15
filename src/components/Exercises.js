import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Exercises({ loggedIn, getExercisesList, exercisesList })
{
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("names");

  useEffect(() =>
  {
    getExercisesList();
  }, []);

  function handleChange(event)
  {
    setSearchTerm(event.target.value);
  }

  function handleRadio(event)
  {
    setSearchType(event.target.value);
  }

  console.log(searchType);

  return (
    <Container>
      <h1>Exercises</h1>
      {loggedIn && (
        <Link to='/exercises/new'>
          <Button className='mb-4'>Create an Exercise</Button>
        </Link>
      )}

      <form>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={searchTerm}
        />
        <input type="radio" id="name" name="search-type" value="name" onClick={handleRadio} />
        <label htmlFor="name">Name</label>
        <input type="radio" id="notes" name="search-type" value="notes" onClick={handleRadio} />
        <label htmlFor="notes">Notes</label>
      </form>

      <Row xs={1} s={2} md={3}>
        {exercisesList.filter((exercise) =>
        {
          if (searchTerm === "" || exercise[searchType].toLowerCase().includes(searchTerm.toLowerCase()))
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
                      Notes: {exercise.notes}
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