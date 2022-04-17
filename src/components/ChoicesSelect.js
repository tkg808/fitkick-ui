export default function ChoicesSelect({ title, choices, handleChoice })
{
  return (
    <>
      <select className='mx-4' id={title}>
        {choices.map((choice, index) =>
        {
          return (
            <option key={index} onClick={() => handleChoice(index)}>
              {choice}
            </option>
          )
        })}
      </select>
    </>
  );
}