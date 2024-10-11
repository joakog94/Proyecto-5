import { PickTheLaser } from '../../pages/PickTheLaser/PickTheLaser'
import { PiedraPapelTijera } from '../../pages/Ppt/Ppt'
import { TresEnLinea } from '../../pages/Tres-en-linea/Tres-en-linea'
import { Button } from '../Button/Button'
import './Header.css'

export const Header = (divApp) => {
  const header = document.createElement('header')
  const Ppt = Button('Piedra, Papel o Tijera')
  const Ptl = Button('Pick The Laser')
  const Tel = Button('Tres en Linea')

  Ppt.addEventListener('click', PiedraPapelTijera)
  Ptl.addEventListener('click', PickTheLaser)
  Tel.addEventListener('click', TresEnLinea)
  header.append(Ppt)
  header.append(Ptl)
  header.append(Tel)
  divApp.append(header)
}
