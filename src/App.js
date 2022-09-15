import React, { useState } from 'react';
import { useReducer } from 'react';
import { data } from './data';
import ListSection from './components/ListSection';
import ModalForm from './components/ModalForm';
import DispatchContext from './components/DispatchContext';
import './App.css';

const App = () => {
  const actions = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_LIST: 'REMOVE_LIST',
    MARK_TOGGLE: 'MARK_TOGGLE',
    REMOVE_ITEM: 'REMOVE_ITEM' 
  }

  function reducer(prevState, action) {
    const stateCopy = JSON.parse(JSON.stringify(prevState));
    switch (action.type) {
      case actions.ADD_ITEM:
        stateCopy[action.listIndex].items[action.value] = false;
        return stateCopy;
      case actions.REMOVE_LIST:
        stateCopy.splice(action.listIndex, 1)
        return stateCopy;
      case actions.MARK_TOGGLE:
        stateCopy[action.listIndex].items[action.itemName] = !stateCopy[action.listIndex].items[action.itemName];
        return stateCopy;
      case actions.REMOVE_ITEM:
        return stateCopy;
      default:
        throw new Error('reducer() function failed');
    }
  }

  const [isFormActive, setIsFormActive] = useState(false);
  const [lists, dispatch] = useReducer(reducer, data);

  return (
    <div className='App'>    
      <header>
        <h1>List Creator</h1>
        <h2>React App</h2>
      </header>
      <main>
        <DispatchContext.Provider value={dispatch}>
          <ListSection 
            lists={lists} />
        </DispatchContext.Provider>
        {
          isFormActive 
            ? <ModalForm />
            : null
        }
        <button className='activate-form-button' 
          onClick={() => setIsFormActive(!isFormActive)}> + </button>
      </main>
    </div>
  )
}

export default App;
