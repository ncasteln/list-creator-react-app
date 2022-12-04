import EditForm from './EditList';
import React, { useContext, useState } from 'react';
import { FaTasks, FaTimes } from 'react-icons/fa';
import DispatchContext from "./DispatchContext";

const ListSection = ({ lists }) => {
  const [isActive, setIsActive] = useState(0)
  
  const dispatch = useContext(DispatchContext)

  const handleClick = (type, listIndex, itemName) => {
    if (type === 'MARK_TOGGLE') {
      dispatch({
        type,
        listIndex,
        itemName
      })
    }
    if (type === 'REMOVE_ITEM') {
      dispatch({
        type,
        listIndex,
        itemName
      })
    }
  };

  const displayTopics = (lists) => {
    return lists.map((el, listIndex) => {
      return (
        <article
          className='list-box'
          onClick={() => setIsActive(listIndex)} 
          key={`article_${listIndex}`}>
          <div className='topic-box'>
            <h3 className='topic-title'>
                {el.topic}
            </h3>
            {
              listIndex === isActive
                ? <EditForm listIndex={listIndex} />
                : null
            }
          </div>
          {
            listIndex === isActive
              ? <ul className='list'>
                  {displayItems(el.items, listIndex)}
                </ul>
              : null
          }
        </article>
      )
    })
  };

  const displayItems = (itemsObject, listIndex) => {
    if (Object.keys(itemsObject).length === 0) {
      return <small className=''>No items in this list!</small>
    }
    return Object.entries(itemsObject).map((item, itemIndex) => {
      const [itemName, isDone] = item;
      return (
        <li 
          className={`${isDone ? 'markToggle' : null}`}
          key={`item_${itemIndex}`}>
          <div className='item'>
            <div className='item-name'>
              {itemName}
            </div>
            <div className='item-button-box'>
              <button
                onClick={() => handleClick('MARK_TOGGLE', listIndex, itemName)}>
                <FaTasks color='white' />
              </button>
              <button
                onClick={() => handleClick('REMOVE_ITEM', listIndex, itemName)}>
                <FaTimes color='white' />
              </button>
            </div>
          </div>
        </li>
      )
    })
  }

  return (
    <>
      {displayTopics(lists)}
    </>
  )
}

export default ListSection;