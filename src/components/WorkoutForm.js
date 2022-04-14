
import { Form, Button, Alert } from 'react-bootstrap';

export default function WorkoutForm({ handleSubmit, handleChange, formData })
{
  return (
    <div className='w-75 p-3'>
      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            autoFocus
            type='text'
            name='name'
            onChange={handleChange}
            value={formData.name}
          />
        </Form.Group>
        <Form.Group controlId='notes'>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            autoFocus
            type='text'
            name='name'
            onChange={handleChange}
            value={formData.name}
          />
        </Form.Group>
        <Form.Group controlId='exercises'>
          <Form.Label>Exercises</Form.Label>
          <Form.Control
            type='text'
            name='exercises'
            onChange={handleChange}
            value={formData.exercises}
          />
        </Form.Group>

        <Button className='mt-4' type='submit' disabled={error}>
          Submit
        </Button>
        {error && (
          <Alert variant='danger'>
            Oops, something went wrong! Please try again!
          </Alert>
        )}
      </Form>
    </div>
  );
}