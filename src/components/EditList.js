import React, { useContext, useState } from "react";
import DispatchContext from "./DispatchContext";
import { FaTrashAlt } from "react-icons/fa";
import ModalMessage from "./ModalMessage";

const EditList = ({ listIndex }) => {
  const dispatch = useContext(DispatchContext)

  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [promise, setPromise] = useState({})

  const handleClick = (type) => {
    if (userInput) {
      if (type === 'ADD_ITEM') {
        dispatch({ 
          type,
          listIndex,
          value: userInput
        })
      }
    }
    if (type === 'REMOVE_LIST') {
      dispatch({
        type,
        listIndex
      })
    }
    setUserInput('');
  }
  
  const getAnswer = async () => {
    // The function can be marged at the place of call getAnswer()
    return new Promise((resolve, reject) => {
      setPromise({ resolve, reject });
    })
  }

  const showAlertMessage = async () => {
    setIsActive(true);
    try {
      const answer = await getAnswer();
      if (answer === 'confirm') {
        console.log(answer)
        handleClick('REMOVE_LIST');
      }
      setIsActive(false)
    }
    catch(error) {
      throw new Error(`Error occured - ${error}`)
    }
  }

  return (
    <form className="EditList">
      <input
        value={userInput}
        type='text'
        placeholder='Add an item to the list...'
        onChange={(e) => setUserInput(e.target.value)} />
      <div className='edit-form-buttons-box'>
        <button 
          type='button'
          onClick={() => handleClick('ADD_ITEM')}> + </button>
        <button 
          type='button'
          onClick={() => showAlertMessage()}> 
          <FaTrashAlt color='white' />
        </button>
      </div>
      {
        isActive
          ? <ModalMessage
              promise={promise} />
          : null
      }
    </form>
  )
}

export default EditList;