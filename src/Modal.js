import React from 'react'
import { useEffect } from 'react'

function Modal({ modalContent, closeModal }) {
  useEffect(() => {
    setInterval(() => {
      closeModal()
    }, 3000)
  })
  return <div className='alert'>{modalContent}</div>
}

export default Modal
