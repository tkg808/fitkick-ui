import { useEffect, useState, } from 'react';
import API_URL from '../apiConfig';

export default function ExerciseInfoForm({ exerciseInfo })
{
  // From GET request.
  const [info, setInfo] = useState(null);

  // Compares to database => used for PUT request.
  const [newInfo, setNewInfo] = useState(null);

  async function getExerciseInfoDetails(infoId)
  {
    try
    {
      const response = await fetch(API_URL + `exercise-infos/${infoId}`);

      if (response.status === 200)
      {
        const data = await response.json();
        setInfo(data);
        setNewInfo(data);
      }
    }
    catch (error)
    {
      console.log(error);
    }
  }

  async function updateExerciseInfoDetails()
  {
    // Memoization => only send request if info needs to be updated.
    if (info.notes !== newInfo.notes)
    {
      try
      {
        const response = await fetch(API_URL + `exercise-infos/${newInfo.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(newInfo),
            headers:
            {
              'Content-Type': 'application/json',
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          });
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }

  function handleChange(event)
  {
    setNewInfo((prevState) =>
    {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  useEffect(() =>
  {
    getExerciseInfoDetails(exerciseInfo.id);
  }, []);

  if (!info || !newInfo)
  {
    return null;
  }

  return (
    <div className="form-outline">
      <textarea
        name="notes"
        cols="30"
        rows="3"
        placeholder="Notes"
        className="notes-input"
        onChange={handleChange}
        onBlur={updateExerciseInfoDetails}
        value={newInfo.notes}
      />
    </div>
  )
}