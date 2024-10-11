import { Button } from '../Button/Button'
import './Message.css'

export const showMessage = (message, type) => {
  const messageDiv = document.createElement('div')
  messageDiv.className = `game-message ${type}`
  messageDiv.textContent = message
  const button = Button('Aceptar', 'close-btn')
  messageDiv.append(button)
  document.body.append(messageDiv)

  const closeButton = messageDiv.querySelector('#close-btn')
  closeButton.addEventListener('click', () => {
    messageDiv.remove()
  })

  /* setTimeout(() => {
    messageDiv.remove()
  }, 3000) */
}
