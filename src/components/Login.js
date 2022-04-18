import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API_URL from '../apiConfig';

export default function Login({ handleSetLoggedIn })
{
  const initialFormData =
  {
    email: '',
    password: '',
  }

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  // Updates state via form input.
  function handleChange(event)
  {
    setFormData((prevState) =>
    {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  }

  // Attempts to log in.
  async function handleLogin(event)
  {
    event.preventDefault();

    try
    {
      const response = await fetch(API_URL + 'token/login/',
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers:
          {
            'Content-Type': 'application/json',
          },
        });

      if (response.status === 200)
      {
        // Stores token in local storage for persistance.
        const data = await response.json();
        handleSetLoggedIn(data.auth_token);
        navigate('/');
      }
    }
    catch (error)
    {
      // 400 bad request, 500 server error.
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Log in</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            autoFocus
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  );
}