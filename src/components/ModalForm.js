import React, { useContext, useState } from "react";
import DispatchContext from "./DispatchContext";
import { FaTimes } from 'react-icons/fa';

const ModalForm = ({ setIsFormActive }) => {
  const dispatch = useContext(DispatchContext);

  const [fields, setFields] = useState(1);
  const [list, setList] = useState({ 
    topic: '',
    'item_0': ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'NEW_LIST',
      list
    });
    setIsFormActive(false);
  }

  const handleChange = (e) => {
    setList(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const displayInputFields = () => {
    const inputFields = [];
    for (let i = 1; i < fields; i++) {
      inputFields.push(
        <input key={`inputField_${i}`} 
          className='modal-input'
          name={`item_${i}`}
          value={list[`item_${i}`]}
          type='text'
          placeholder='Write a new item'
          onChange={(e, i) => handleChange(e, i)} />
      );
    }
    return inputFields;
  }

  return (
    <form onSubmit={handleSubmit} className="Modal Form">
      <button className='close-form' onClick={() => setIsFormActive(false)}>
        <FaTimes color='white' />
      </button>
      <div className='modal-form-box'>
        <label className='modal-label'>Title:</label>
        <input className='modal-input'
          name='topic'
          value={list.topic}
          type='text'
          placeholder='Write a title for your list'
          onChange={(e) => handleChange(e)} />
        <label className='modal-label'>Items: </label>
        <input className='modal-input'
          name={`item_0`}
          value={list[`item_0`]}
          type='text'
          placeholder='Write a new item'
          onChange={(e) => handleChange(e)} />
        {displayInputFields()}
      </div>

      {/* Only input check pourpose */}
      {/* {Object.values(list).map((item, i) => <p key={`item_${i}`}>{item}</p>)} */}

      <div className="modal-form-buttons">
        <button className='add-field-button' 
          type='button'
          onClick={() => setFields(prevFields => prevFields + 1)}>
            Add input field
        </button>
        <button
          className='create-list-button'
          type="submit">
            Create List!
        </button>
      </div>
    </form>
  )
}

export default ModalForm;