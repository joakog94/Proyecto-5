import './Ppt.css'

export const PiedaPapelTijera = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  let playerScore = 0
  let computerScore = 0

  // Función que inicializa el juego
  function playGame(playerChoice) {
    const computerChoice = computerPlay()
    const result = checkWinner(playerChoice, computerChoice)
    updateScore(result)
  }

  // Función que simula la elección de la computadora
  function computerPlay() {
    const choices = ['Piedra', 'Papel', 'Tijeras']
    const randomIndex = Math.floor(Math.random() * 3)
    return choices[randomIndex]
  }

  // Función que determina quién gana
  function checkWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return 'Empate'
    }

    if (
      (playerChoice === 'Piedra' && computerChoice === 'Tijeras') ||
      (playerChoice === 'Papel' && computerChoice === 'Piedra') ||
      (playerChoice === 'Tijeras' && computerChoice === 'Papel')
    ) {
      return 'Jugador'
    } else {
      return 'Computadora'
    }
  }

  // Función que actualiza el marcador
  function updateScore(winner) {
    if (winner === 'Jugador') {
      playerScore++
    } else if (winner === 'Computadora') {
      computerScore++
    }

    document.getElementById(
      'playerScore'
    ).textContent = `Jugador: ${playerScore}`
    document.getElementById(
      'computerScore'
    ).textContent = `Computadora: ${computerScore}`
  }
}
