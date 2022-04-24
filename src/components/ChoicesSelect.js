export default function ChoicesSelect({ title, choices, handleChange })
{
  return (
    <>
      <select
        className='mx-4'
        name={title}
        onChange={handleChange}>
        <option
          disabled
          selected
          value=""
        >
          -- select an option --
        </option>
        {choices.map((choice, index) =>
        {
          return (
            <option key={index} value={choice}
            // onClick={() => handleChange(choice)}
            >
              {choice}
            </option>
          )
        })}
      </select>
    </>
  );
}