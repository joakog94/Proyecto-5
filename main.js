import { Background } from './src/components/Background/Background'
import { Header } from './src/components/Header/Header'
import './style.css'

const divApp = document.querySelector('#app')

const divContent = document.createElement('div')

divContent.className = 'content'
Background()

Header(divApp)
divApp.append(divContent)
