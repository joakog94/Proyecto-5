import { Button } from '../../components/Button/Button'
import { showMessage } from '../../components/Message/Message'
import './PickTheLaser.css'

let Count = 0
let intervalo = null
let pausado = true
let velocidad = 1000

export const PickTheLaser = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''
  Count = 0
  velocidad = 1000

  const vader = document.createElement('img')
  const textoContador = document.createElement('h2')
  const jugar = Button('JUGAR')
  const pausar = Button('PAUSAR')
  const highScore = document.createElement('h4')
  const audio = document.createElement('audio')

  textoContador.textContent = Count
  textoContador.className = 'contador'
  vader.className = 'vader'
  vader.src = './assets/darthVader.png'

  jugar.classList.add('boton-laser')
  pausar.classList.add('boton-laser')
  highScore.textContent =
    'El record es : ' + (parseInt(localStorage.getItem('highScore')) || 0)
  audio.src = './assets/pop.mp3'

  jugar.addEventListener('click', () => {
    pausado = false
    toggleButton(jugar, pausar)
    iniciarJuego()
  })

  pausar.addEventListener('click', () => {
    pausado = true
    toggleButton(jugar, pausar)
    clearInterval(intervalo)
  })

  toggleButton(jugar, pausar)
  divContent.append(audio)
  divContent.append(jugar)
  divContent.append(pausar)
  divContent.append(highScore)
  divContent.append(textoContador)
  divContent.append(vader)
}

const createLaser = () => {
  const divContent = document.querySelector('.content')
  let randomLeft = Math.random() * (window.innerWidth - 100)
  let randomTop = Math.random() * (window.innerHeight - 350)

  const imgLaser = document.createElement('img')
  imgLaser.className = 'laser'
  imgLaser.style.top = `${randomTop + 270}px`
  imgLaser.style.left = `${randomLeft}px`
  imgLaser.style.transform = `rotate(${Math.random() * 360}deg)`
  imgLaser.classList.add('recoger')

  imgLaser.addEventListener('click', recogerLaser)
  imgLaser.src = './assets/sable-de-luz.png'

  divContent.append(imgLaser)
  comprobar()
}

const recogerLaser = (e) => {
  const audio = document.querySelector('audio')
  audio.volume = 0.4
  audio.play()

  Count++
  repintarTexto(Count)

  e.target.classList.remove('recoger')

  let randomTop = Math.random() * 20 + 80
  let randomLeft = Math.random() * 20 + 80
  e.target.style.top = `${window.innerHeight - randomTop}px`
  e.target.style.left = `${window.innerWidth - randomLeft}px`
}

const repintarTexto = (cont) => {
  const texto = document.querySelector('.contador')
  texto.textContent = cont
}

const comprobar = () => {
  let result
  const allLasers = document.querySelectorAll('.recoger')

  if (allLasers.length > 50) {
    result = 'El lado oscuro te ha superado'
    showMessage(result, 'lose')
    pausado = true
    clearInterval(intervalo)

    const highScore = localStorage.getItem('highScore')
      ? parseInt(localStorage.getItem('highScore'))
      : 0

    if (Count > highScore) {
      localStorage.setItem('highScore', Count) // Solo guarda si es más alto
      showMessage(`¡Nuevo récord! ${Count}`, 'high-score')
    }

    PickTheLaser() // Reinicia el juego
  }
}

const iniciarJuego = () => {
  clearInterval(intervalo)
  intervalo = setInterval(() => {
    if (!pausado) {
      createLaser()
    }
  }, velocidad)
  incrementarVelocidad()
}

const incrementarVelocidad = () => {
  const intervalosVelocidad = [
    5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000
  ]

  intervalosVelocidad.forEach((delay) => {
    setTimeout(() => {
      if (!pausado) {
        velocidad -= 100
        clearInterval(intervalo)
        intervalo = setInterval(() => {
          if (!pausado) {
            createLaser()
          }
        }, velocidad)
      }
    }, delay)
  })
}

const toggleButton = (jugar, pausar) => {
  if (pausado) {
    jugar.classList.add('show')
    pausar.classList.remove('show')
  } else {
    pausar.classList.add('show')
    jugar.classList.remove('show')
  }
}
