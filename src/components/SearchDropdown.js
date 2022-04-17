import { Dropdown } from 'react-bootstrap';

export default function SearchDropdown({ title, choices, handleChoice })
{
  return (
    <Dropdown >
      <Dropdown.Toggle variant='success'>{title}</Dropdown.Toggle>
      <Dropdown.Menu >
        {choices.map((choice, index) =>
        {
          return (
            <Dropdown.Item
              key={index}
              onClick={handleChoice}
            >
              {choice}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}