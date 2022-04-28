import { Dropdown } from 'react-bootstrap';

export default function ListDropdown({ title, list, handleChoice })
{
  return (
    <Dropdown >
      <Dropdown.Toggle variant='success'>{title}</Dropdown.Toggle>
      <Dropdown.Menu >
        {list.map((element) =>
        {
          return (
            <Dropdown.Item
              key={element.id}
              onClick={() => handleChoice(element)}
            >
              {element.name}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}