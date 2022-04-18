
import { Container, Form, Button } from 'react-bootstrap';
import ExerciseDropdown from './ExerciseDropdown';

export default function WorkoutForm({ handleSubmit, handleChange, formData, setFormData, exercisesList })
{
  // Selecting an exercise from dropdown.
  function handleAdd(exerciseToAdd)
  {
    const tempArray = [...formData.exercises, exerciseToAdd];
    setFormData({ ...formData, exercises: tempArray });
  }

  function handleRemove(index)
  {
    let tempArray = [...formData.exercises];
    tempArray.splice(index, 1);
    setFormData({ ...formData, exercises: tempArray });
  }

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
        <Form.Group controlId='exercises'>
          <ExerciseDropdown
            handleAdd={handleAdd}
            exercisesList={exercisesList} />
        </Form.Group>

        <Button className='mt-4' type='submit'>
          Submit
        </Button>

        {!formData.exercises.length && <p>Try adding some exercises!</p>}
        {
          formData.exercises.length > 0 &&
          formData.exercises.map((exercise, index) =>
          {
            return (
              <Container
                className='d-flex justify-content-between m-4 p-3 border rounded-3 bg-light'
                key={index}>
                <h4>{exercise}</h4>
                <Button
                  onClick={() => handleRemove(index)}
                  variant='danger'>
                  X
                </Button>
              </Container>
            );
          })
        }
      </Form>
    </div>
  );
}