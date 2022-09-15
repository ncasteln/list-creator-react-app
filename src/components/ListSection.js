import EditForm from './EditForm';
import React, { useContext, useState } from 'react';
import { FaTasks, FaTimes } from 'react-icons/fa';
import DispatchContext from "./DispatchContext";

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
  }

  const displayItems = (itemsObject, listIndex) => {
    return Object.entries(itemsObject).map((item, itemIndex) => {
      return (
        <div className='item'>
          <li className={item[1] ? 'markToggle' : null}>
            {item[0]}
          </li>
          <div className='item-buttons'>
            <button
              onClick={() => handleClick('MARK_TOGGLE', listIndex, item[0])}>
              <FaTasks color='white' />
            </button>
            <button
              onClick={() => handleClick('REMOVE_ITEM')}>
              <FaTimes color='white' />
            </button>
          </div>
        </div>
      )
    })
  }

  const displayTopics = (lists) => {
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