import { Dropdown } from 'react-bootstrap';

export default function ExerciseDropdown({ exercisesList, handleAdd })
{
  console.log(exercisesList);
  return (
    <Dropdown >
      <Dropdown.Toggle variant='success'>Exercises</Dropdown.Toggle>
      <Dropdown.Menu >
        {exercisesList.map((exercise) =>
        {
          return (
            <Dropdown.Item
              key={exercise.id}
              onClick={() => handleAdd(exercise.name)}
            >
              {exercise.name}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}