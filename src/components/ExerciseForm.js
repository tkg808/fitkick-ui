import { Form, Button, Alert } from 'react-bootstrap';
import ChoicesSelect from './ChoicesSelect';

export default function ExerciseForm({ handleSubmit, handleChange, formData })
{
  const typeChoices = ["Aerobic", "Anaerobic", "Mobility"];
  const muscleChoices = ["Legs", "Back", "Chest", "Shoulders", "Arms", "Core", "Cardio", "None"]

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
        <Form.Group className='mt-4' controlId='exercise_type'>
          <Form.Label>Exercise Type</Form.Label>
          <ChoicesSelect
            title="exercise_type"
            choices={typeChoices}
            handleChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='my-2' controlId='primary_muscles'>
          <Form.Label>Primary Muscles</Form.Label>
          <ChoicesSelect
            title="primary_muscles"
            choices={muscleChoices}
            handleChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-4' controlId='secondary_muscles'>
          <Form.Label>Secondary Muscles</Form.Label>
          <ChoicesSelect
            title="secondary_muscles"
            choices={muscleChoices}
            handleChange={handleChange}
          />
        </Form.Group>
        <Button className='mt-4' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}