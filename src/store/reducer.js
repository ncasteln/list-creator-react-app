import { 
  ADD_ITEM, 
  REMOVE_ITEM, 
  NEW_LIST, 
  REMOVE_LIST, 
  MARK_TOGGLE } from './actions'

const reducer = (prevState, action) => {
  const stateCopy = JSON.parse(JSON.stringify(prevState));
  switch (action.type) {
    case ADD_ITEM:
      stateCopy[action.listIndex].items[action.value] = false;
      return stateCopy;
    case REMOVE_LIST:
      stateCopy.splice(action.listIndex, 1)
      return stateCopy;
    case MARK_TOGGLE:
      stateCopy[action.listIndex].items[action.itemName] = !stateCopy[action.listIndex].items[action.itemName];
      return stateCopy;
    case REMOVE_ITEM:
      delete stateCopy[action.listIndex].items[action.itemName];
      return stateCopy;
    case NEW_LIST:
      const items = Object.values(action.list)
        .filter((item, i) => i > 0)
        .reduce((accumulator, item) => {
          return {...accumulator, [item]: false}
      }, {});
      stateCopy.push({
        topic: action.list.topic,
        items
      })
      return stateCopy;        
    default:
      throw new Error('reducer() function failed');
  }
};

export default reducer;