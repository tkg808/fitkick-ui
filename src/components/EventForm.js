import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import ListDropdown from './ListDropdown';

export default function EventForm({ formData, setFormData, handleChange, workoutsList, handleChoice, handleSubmit })
{
  return (
    <div className='w-75 p-3'>
      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            autoFocus
            type='text'
            name='title'
            onChange={handleChange}
            value={formData.title}
            placeholder="Add Title"
          />
        </Form.Group>

        <Form.Group controlId='workout'>
          <Form.Control
            type='text'
            name='workout'
            value={formData.workout_name}
            disabled
          />
          <ListDropdown
            title="Workouts"
            list={workoutsList}
            handleChoice={handleChoice}
          />
        </Form.Group>

        <Form.Group controlId='date'>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            placeholderText="Date"
            selected={formData.date ? formData.date : null}
            onChange={(date) => setFormData({ ...formData, date: date })}
          />
        </Form.Group>

        <Button className='mt-4' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}