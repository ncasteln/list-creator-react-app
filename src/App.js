import { useState, useReducer } from 'react';
import { data } from './data';
import ListSection from './components/ListSection';
import ModalForm from './components/ModalForm';
import DispatchContext from './components/DispatchContext';
import reducer from './store/reducer';
import './App.css';

const App = () => {
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
          {
            lists.length > 0
              ? <ListSection lists={lists} />
              : <small>No list to render. Let's create one!</small>
          }
          {
            isFormActive 
            ? <ModalForm setIsFormActive={setIsFormActive} />
            : null
          }
          {
            isFormActive
              ? null
              : <button 
                  className='activate-form-button' 
                  onClick={() => setIsFormActive(!isFormActive)}>
                    +
                </button>
    
          }
        </DispatchContext.Provider>
      </main>
    </div>
  )
}

export default App;
