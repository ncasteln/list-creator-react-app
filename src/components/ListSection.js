import EditForm from './EditForm';
import React, { useContext, useState } from 'react';
import { FaTasks, FaTimes } from 'react-icons/fa';
import DispatchContext from "./DispatchContext";
import ModalForm from './ModalForm';

const ListSection = ({ lists }) => {
  const dispatch = useContext(DispatchContext)

  const [isActive, setIsActive] = useState(0)

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
  }

  const displayItems = (itemsObject, listIndex) => {
    if (Object.keys(itemsObject).length === 0) {
      return <small><em>The List is empty!</em></small>
    }
    return Object.entries(itemsObject).map((item, itemIndex) => {
      const [itemName, isDone] = item;
      return (
        <div key={`item_${itemIndex}`} className='item'>
          <li className={isDone ? 'markToggle' : null}>
            {itemName}
          </li>
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
      )
    })
  }

  const displayTopics = (lists) => {
    if (lists.length === 0) {
      return (
        <div>
          <h4><em>
            There is no list! <br />
            Begin to create one by clicking on the orange button on the bottom!
          </em></h4>
        </div>
      ) 
    }
    return lists.map((el, listIndex) => {
      return (
        <article key={`article_${listIndex}`}>
          <div className='topic-box'>
            <h3 className='topic-title'
              onClick={() => setIsActive(listIndex)}>
                {el.topic}
            </h3>
            {
              listIndex === isActive
                ? <EditForm listIndex={listIndex} />
                : null
            }
          </div>
          <ul className='item-box'>
            {
              listIndex === isActive
                ? displayItems(el.items, listIndex)
                : null
            }
          </ul>
        </article>
      )
    })
  }

  return (
    <section className='ListSection'>
      {displayTopics(lists)}
    </section>
  )
}

export default ListSection;