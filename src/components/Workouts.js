import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import API_URL from '../apiConfig';

export default function Workouts({ loggedIn, workoutsList, setWorkoutsList })
{
  return (
    <Container>
      <h1>Workouts</h1>
      {loggedIn && (
        <Link to='/workouts/new'>
          <Button className='mb-4'>Add a Workout</Button>
        </Link>
      )}

      <Row xs={1} s={2} md={3}>
        {workoutsList.map((workout) =>
        {
          return (
            <Col key={workout.id} className='mb-4'>
              <Link
                to={`/workouts/${workout.id}`}
                style={{ color: 'black', textDecoration: 'none' }}>
                <Card>
                  <Card.Body>
                    <Card.Title>{workout.name}</Card.Title>
                    <Card.Text>
                      Number of exercises: {workout.exercises.length}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
        <Link to={'/workouts/new'}>
          <Col className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>Add New Workout</Card.Title>
                <Card.Text>Add new</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Link>

      </Row>
    </Container>
  );
}