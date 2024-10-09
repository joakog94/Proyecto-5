import { PickTheApple } from '../../pages/PickTheApple/PickTheApple'
import { PiedaPapelTijera } from '../../pages/Ppt/Ppt'
import { TresEnLinea } from '../../pages/Tres-en-linea/Tres-en-linea'
import { Button } from '../Button/Button'
import './Header.css'

export const Header = (divApp) => {
  const header = document.createElement('header')
  const Ppt = Button('Piedra, Papel o Tijera')
  const Pta = Button('Pick The Apple')
  const Tel = Button('Tres en Linea')

  Ppt.addEventListener('click', PiedaPapelTijera)
  Pta.addEventListener('click', PickTheApple)
  Tel.addEventListener('click', TresEnLinea)
  header.append(Ppt)
  header.append(Pta)
  header.append(Tel)
  divApp.append(header)
}
