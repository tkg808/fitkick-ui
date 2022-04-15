import { Form, Button, Alert } from 'react-bootstrap';

export default function ExerciseForm({ handleSubmit, handleChange, formData })
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
            type='text'
            name='notes'
            onChange={handleChange}
            value={formData.notes}
          />
        </Form.Group>
        <Button className='mt-4' type='submit'>
          Submit
        </Button>
        {/* {error && (
          <Alert variant='danger'>
            Oops, something went wrong! Please try again!
          </Alert>
        )} */}
      </Form>
    </div>
  );
}