import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
function List({ people, dispatch }) {
  return (
    <div className='grocery-list'>
      {people.map((person) => {
        const { id, name } = person
        return (
          <article className='grocery-item' key={id}>
            <p className='title'>{name}</p>
            <div className='btn-container'>
              <button type='button' className='edit-btn'>
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() =>
                  dispatch({ type: 'REMOVE_ITEM', payload: person.id })
                }
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
