import './Button.css'

export const Button = (text, id) => {
  const button = document.createElement('button')
  button.textContent = text
  button.classList.add('button')
  button.id = id

  return button
}
