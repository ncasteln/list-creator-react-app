import React, { useContext, useState } from "react";
import DispatchContext from "./DispatchContext";
import { FaTrashAlt } from "react-icons/fa";

const EditForm = ({ listIndex }) => {
  const dispatch = useContext(DispatchContext)

  const [userInput, setUserInput] = useState('');


  const handleClick = (type) => {
    if (type === 'ADD_ITEM') {
      dispatch({ 
        type,
        listIndex,
        value: userInput
      })
    }
    if (type === 'REMOVE_LIST') {
      dispatch({
        type,
        listIndex
      })
    }
    setUserInput('');
  }

  return (
    <form className="EditForm">
      <input
        value={userInput}
        type='text'
        placeholder='Add an item to the list...'
        onChange={(e) => setUserInput(e.target.value)} />
      <div>
        <button 
          type='button'
          onClick={() => handleClick('ADD_ITEM')}> + </button>
        <button 
          type='button'
          onClick={() => handleClick('REMOVE_LIST')}> 
          <FaTrashAlt color='white' />
        </button>
      </div>
    </form>
  )
}

export default EditForm;