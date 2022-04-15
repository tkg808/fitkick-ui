import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Exercises({ loggedIn, getExercisesList, exercisesList })
{
  useEffect(() =>
  {
    getExercisesList();
  }, []);

  return (
    <Container>
      <h1>Exercises</h1>
      {loggedIn && (
        <Link to='/exercises/new'>
          <Button className='mb-4'>Create an Exercise</Button>
        </Link>
      )}

      <Row xs={1} s={2} md={3}>
        {exercisesList.map((exercise) =>
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