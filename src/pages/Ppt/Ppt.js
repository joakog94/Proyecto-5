import { Button } from '../../components/Button/Button'
import './Ppt.css'

export const PiedraPapelTijera = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const gameContainer = document.createElement('div')
  gameContainer.className = 'game-container'

  const title = document.createElement('h2')
  title.textContent = '¡Elige tu jugada!'
  gameContainer.appendChild(title)

  const choices = ['piedra', 'papel', 'tijera']
  choices.forEach((choice) => {
    const img = document.createElement('img')
    img.src = `./assets/${choice}.png`
    img.alt = choice.charAt(0).toUpperCase() + choice.slice(1)
    img.id = choice
    img.style.cursor = 'pointer'
    img.addEventListener('click', () =>
      playGame(choice.charAt(0).toUpperCase() + choice.slice(1))
    )
    gameContainer.appendChild(img)
  })

  const resultContainer = document.createElement('div')
  resultContainer.className = 'result'

  const playerChoiceText = document.createElement('h3')
  playerChoiceText.innerHTML = 'Jugador elige: <span id="playerChoice">-</span>'
  resultContainer.appendChild(playerChoiceText)

  const computerChoiceText = document.createElement('h3')
  computerChoiceText.innerHTML =
    'Computadora elige: <span id="computerChoice">-</span>'
  resultContainer.appendChild(computerChoiceText)

  const gameResultText = document.createElement('h3')
  gameResultText.innerHTML = 'Resultado: <span id="gameResult">-</span>'
  resultContainer.appendChild(gameResultText)

  gameContainer.appendChild(resultContainer)

  const scoreContainer = document.createElement('div')
  scoreContainer.id = 'score'
  scoreContainer.innerHTML = `
    <h3>Jugador: <span id="playerScore">0</span></h3>
    <h3>Computadora: <span id="computerScore">0</span></h3>
  `

  gameContainer.appendChild(scoreContainer)

  const resetButton = Button('Reiniciar', 'resetppt')
  resetButton.addEventListener('click', () => {
    sessionStorage.clear()
    playerScore = 0
    computerScore = 0
    document.getElementById('playerScore').textContent = playerScore
    document.getElementById('computerScore').textContent = computerScore
    document.getElementById('playerChoice').textContent = '-'
    document.getElementById('computerChoice').textContent = '-'
    document.getElementById('gameResult').textContent = '-'
  })
  gameContainer.appendChild(resetButton)

  divContent.appendChild(gameContainer)

  let playerScore = parseInt(sessionStorage.getItem('playerScore')) || 0
  let computerScore = parseInt(sessionStorage.getItem('computerScore')) || 0

  document.getElementById('playerScore').textContent = playerScore
  document.getElementById('computerScore').textContent = computerScore

  const playGame = (playerChoice) => {
    document.getElementById('playerChoice').textContent = playerChoice

    const computerChoices = ['Piedra', 'Papel', 'Tijera']
    const randomIndex = Math.floor(Math.random() * computerChoices.length)
    const computerChoice = computerChoices[randomIndex]
    document.getElementById('computerChoice').textContent = computerChoice

    let result
    if (playerChoice === computerChoice) {
      result = '¡Es un empate!'
    } else if (
      (playerChoice === 'Piedra' && computerChoice === 'Tijera') ||
      (playerChoice === 'Papel' && computerChoice === 'Piedra') ||
      (playerChoice === 'Tijera' && computerChoice === 'Papel')
    ) {
      result = '¡Has ganado!'
      playerScore++
      sessionStorage.setItem('playerScore', playerScore)
    } else {
      result = '¡Perdiste!'
      computerScore++
      sessionStorage.setItem('computerScore', computerScore)
    }

    document.getElementById('gameResult').textContent = result
    document.getElementById('playerScore').textContent = playerScore
    document.getElementById('computerScore').textContent = computerScore
  }
}
