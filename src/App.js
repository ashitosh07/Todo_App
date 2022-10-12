import { useReducer } from 'react'
import { useState } from 'react'
// import { FaEdit, FaTrash } from 'react-icons/fa'
import './App.css'
import data from './data'
import List from './List'
import Modal from './Modal'

const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload]
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: 'Item Added',
    }
  }
  if (action.type === 'NO_VALUE') {
    return {
      ...state,
      isModalOpen: true,
      modalContent: 'No Value',
    }
  }
  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state,
      isModalOpen: false,
    }
  }
  if (action.type === 'REMOVE_ITEM') {
    const newPeople = state.people.filter(
      (person) => person.id !== action.payload
    )
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: 'Item Removed',
    }
  }
  if (action.type === 'CLEAR_ITEMS') {
    return {
      ...state,
      people: [],
    }
  }
  throw new Error('No Matching action type')
}

const defaultState = {
  people: data,
  isModalOpen: false,
  modalContent: '',
}

function App() {
  // const [people, setPeople] = useState(data)
  const [name, setName] = useState('')
  const [state, dispatch] = useReducer(reducer, defaultState)

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' })
  }
  const clearItems = () => {
    dispatch({ type: 'CLEAR_ITEMS' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      const newPeople = { id: new Date().getTime().toString(), name }
      dispatch({ type: 'ADD_ITEM', payload: newPeople })
      setName('')
    } else {
      dispatch({ type: 'NO_VALUE' })
    }
  }

  return (
    <section className='section-center'>
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
      <form className='grocery-form' onSubmit={handleSubmit}>
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            ADD
          </button>
        </div>
      </form>
      {state.people.length > 0 && (
        <div className='grocery-container'>
          <List people={state.people} dispatch={dispatch} />

          <button className='clear-btn' onClick={clearItems}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
