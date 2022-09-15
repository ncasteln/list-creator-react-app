import React, { useState } from "react";

const ModalForm = () => {
  const [form, setForm] = useState({
    topic: '',
    items: []
  });
  const [fields, setFields] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'topic') {
      setForm(prevForm => ({
        ...prevForm,
        [e.target.name]: e.target.value
      }))
    }
    if (e.target.name === 'item') {
      setForm(prevForm => ({
        ...prevForm,
        // Modify the fucking array
      }))
    }
  }

  const displayInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < fields; i++) {
      inputFields.push(
        <input className='modal-input'
        name='item'
        value={form.items[i]}
        type='text'
        placeholder='Write a new item'
        onChange={handleChange} />
      );
    }
    return inputFields;
  }

  return (
    <form className="ModalForm">
      <label className='modal-label'>Title:</label>
      <input className='modal-input'
        name='topic'
        value={form.topic}
        type='text'
        placeholder='Write a title for your list'
        onChange={handleChange} />
      <label className='modal-label'>Items: </label>
      <div>
        <input className='modal-input'
        name='item'
        value={form.items[0]}
        type='text'
        placeholder='Write a new item'
        onChange={handleChange} />

        {displayInputFields()}

        <button className='add-field-button' 
          type='button'
          onClick={() => setFields(prevFields => prevFields + 1)}>
            Add input field
        </button>
      </div>
      <button className='create-list-button'>Create List!</button>
    </form>
  )
}

export default ModalForm;