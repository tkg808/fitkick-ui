import { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../apiConfig';

export default function ExerciseInfoForm({ exerciseInfo })
{
  // From GET request.
  const [info, setInfo] = useState(null);

  // Compare to other state. For PUT request.
  const [newInfo, setNewInfo] = useState(null);

  const navigate = useNavigate();

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
    // Only send request if info needs to be updated.
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

        if (response.status === 200)
        {
          const data = response.json();
          // navigate(`/exercises/${id}`);
          console.log(data);
        }
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
    // <Form.Control
    //   type='text'
    //   name='notes'
    //   onChange={handleChange}
    //   value={formData.notes}
    // />
  )
}