import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API_URL from '../apiConfig';

export default function Signup()
{
  const initialFormData =
  {
    email: '',
    username: '',
    password: '',
    re_password: '',
  }

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(false);

  function handleChange(event)
  {
    setFormData((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  async function handleSignup(event)
  {
    event.preventDefault();
    setError(false);

    try
    {
      const response = await fetch(API_URL + 'users/',
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers:
          {
            'Content-Type': 'application/json',
          },
        });

      if (response.status === 201)
      {
        setTimeout(() =>
        {
          navigate('/login');
        }, 3000);
      }
      else if (response.status === 400)
      {
        // Bad request.
        setError(true);
      }
    }
    catch
    {
      // Server error.
      setError(true);
    }
  }

  function handlePasswordMatch()
  {
    if (formData.password !== formData.re_password)
    {
      // Bad request -- password.
      setError(true);
    }
    else
    {
      setError(false);
    }
  }

  return (
    <div className='w-75 p-3'>
      <h2>Create an account</h2>
      <Form onSubmit={handleSignup}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            autoFocus
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type='email'
            value={formData.email}
            name='email'
            onChange={handleChange}
          />
          <Form.Control.Feedback type='invalid'>
            Please provide a valid email .
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='re_password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type='password'
            name='re_password'
            value={formData.re_password}
            onChange={handleChange}
            onBlur={handlePasswordMatch}
          />
        </Form.Group>
        <Button type='submit' disabled={error}>
          Sign up
        </Button>
      </Form>
    </div>
  )
}