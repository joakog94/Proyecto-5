import { Button } from '../../components/Button/Button'
import { showMessage } from '../../components/Message/Message'
import './Tres-en-linea.css'

let pointsX = 0
let pointsO = 0

export const TresEnLinea = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  if (localStorage.getItem('pointsX')) {
    pointsX = parseInt(localStorage.getItem('pointsX'))
  }
  if (localStorage.getItem('pointsO')) {
    pointsO = parseInt(localStorage.getItem('pointsO'))
  }

  let playerChoice = ''
  let currentPlayer = ''
  const board = Array(9).fill(null)

  const Reset = () => {
    const reiniciar = Button('Reiniciar', 'resetTL')
    divContent.append(reiniciar)

    reiniciar.addEventListener('click', () => {
      localStorage.removeItem('pointsX')
      localStorage.removeItem('pointsO')
      pointsX = 0
      pointsO = 0
      document.getElementById('pointsX').textContent = pointsX
      document.getElementById('pointsO').textContent = pointsO
    })
  }
  Reset()
  const contador = () => {
    const contadorDiv = document.createElement('div')
    const contadorX = document.createElement('div')
    const contadorO = document.createElement('div')
    const playerX = document.createElement('h3')
    const playerO = document.createElement('h3')
    const cuentaX = document.createElement('p')
    const cuentaO = document.createElement('p')

    contadorDiv.id = 'contador'
    playerX.textContent = 'Jugador X'
    playerO.textContent = 'Jugador O'
    cuentaX.textContent = '0'
    cuentaO.textContent = '0'
    cuentaX.id = 'pointsX'
    cuentaO.id = 'pointsO'

    contadorX.append(playerX)
    contadorX.append(cuentaX)
    contadorO.append(playerO)
    contadorO.append(cuentaO)
    contadorDiv.append(contadorX)
    contadorDiv.append(contadorO)
    divContent.append(contadorDiv)
  }

  contador()
  document.getElementById('pointsX').textContent = pointsX
  document.getElementById('pointsO').textContent = pointsO

  const boardContainer = createBoard()
  divContent.appendChild(boardContainer)

  const startScreen = createStartScreen()
  document.body.appendChild(startScreen)

  function createBoard() {
    const container = document.createElement('div')
    container.className = 'board'

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.index = i
      cell.addEventListener('click', handleClick)
      container.appendChild(cell)
    }
    return container
  }

  function createStartScreen() {
    const startScreenDiv = document.createElement('div')
    startScreenDiv.className = 'start-screen'
    startScreenDiv.innerHTML = `
      <h2>Elige tu ficha</h2>
      <button class="choose-x">Jugador X</button>
      <button class="choose-o">Jugador O</button>
    `

    startScreenDiv
      .querySelector('.choose-x')
      .addEventListener('click', () => startGame('X'))
    startScreenDiv
      .querySelector('.choose-o')
      .addEventListener('click', () => startGame('O'))

    return startScreenDiv
  }

  function startGame(player) {
    playerChoice = player
    currentPlayer = playerChoice
    startScreen.style.display = 'none'
    resetGame()
  }

  function handleClick(event) {
    const index = event.target.dataset.index

    if (board[index]) return

    board[index] = currentPlayer
    event.target.textContent = currentPlayer

    let result
    if (checkWinner()) {
      result = `¡${currentPlayer} ha ganado!`
      showMessage(result, 'win')
      if (currentPlayer === 'X') {
        pointsX++
        document.getElementById('pointsX').textContent = pointsX
        localStorage.setItem('pointsX', pointsX)
      } else {
        pointsO++
        document.getElementById('pointsO').textContent = pointsO
        localStorage.setItem('pointsO', pointsO)
      }
      resetGame()
    } else if (board.every((cell) => cell)) {
      result = 'Es un empate'
      showMessage(result, 'draw')
      resetGame()
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    }
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    return winningCombinations.some(([a, b, c]) => {
      return board[a] && board[a] === board[b] && board[a] === board[c]
    })
  }

  function resetGame() {
    board.fill(null)
    document
      .querySelectorAll('.cell')
      .forEach((cell) => (cell.textContent = ''))

    currentPlayer = playerChoice
  }
}
