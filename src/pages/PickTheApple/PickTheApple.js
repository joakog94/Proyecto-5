import { Button } from '../../components/Button/Button'
import './PickTheApple.css'

let Count = 0
let intervalo = null
let pausado = true
let velocidad = 1000

export const PickTheApple = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''
  Count = 0
  velocidad = 1000

  const cesta = document.createElement('img')
  const textoContador = document.createElement('h2')
  const jugar = Button('JUGAR')
  const pausar = Button('PAUSAR')

  const audio = document.createElement('audio')

  textoContador.textContent = Count
  textoContador.className = 'contador'
  cesta.className = 'cesta'
  cesta.src = './assets/cesta.png'

  jugar.classList.add('boton-manzana')
  pausar.classList.add('boton-manzana')
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
  divContent.append(textoContador)
  divContent.append(cesta)
}

const createManzana = () => {
  const divContent = document.querySelector('.content')

  let randomLeft = Math.random() * (window.innerWidth - 100)
  let randomTop = Math.random() * (window.innerHeight - 350)

  const imgManzana = document.createElement('img')

  imgManzana.className = 'manzana'
  imgManzana.style.top = `${randomTop + 270}px`
  imgManzana.style.left = `${randomLeft}px`
  imgManzana.style.transform = `rotate(${Math.random() * 360}deg)`
  imgManzana.classList.add('recoger')

  imgManzana.addEventListener('click', recogerManzana)
  imgManzana.src = './assets/manzana.png'

  divContent.append(imgManzana)
  comprobar()
}

const recogerManzana = (e) => {
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
  const allManzanas = document.querySelectorAll('.recoger')
  if (allManzanas.length > 50) {
    alert('Las manzanas te han superado')
    pausado = true
    clearInterval(intervalo)
    PickTheApple()
  }
}

const iniciarJuego = () => {
  clearInterval(intervalo)

  intervalo = setInterval(() => {
    if (!pausado) {
      createManzana()
    }
  }, velocidad)

  incrementarVelocidad()
}

// Función que aumenta la velocidad de aparición
const incrementarVelocidad = () => {
  const intervalosVelocidad = [
    5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000
  ]
  intervalosVelocidad.forEach((delay, index) => {
    setTimeout(() => {
      if (!pausado) {
        velocidad -= 100
        clearInterval(intervalo)
        intervalo = setInterval(() => {
          if (!pausado) {
            createManzana()
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
