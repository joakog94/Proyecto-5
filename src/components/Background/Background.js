import './Background.css'

export const Background = () => {
  // Seleccionar el cuerpo del documento
  const body = document.body

  // Crear el elemento <video>
  const videoElement = document.createElement('video')

  // Configurar las propiedades del video
  videoElement.autoplay = true
  videoElement.muted = true
  videoElement.loop = true
  videoElement.id = 'background-video' // Asignar un id para poder aplicar estilos

  // Crear la fuente del video <source>
  const sourceElement = document.createElement('source')
  sourceElement.src = './assets/fondo.mp4' // Aquí va la URL del video
  sourceElement.type = 'video/mp4' // Especificar el tipo de video

  // Añadir la fuente al video
  videoElement.appendChild(sourceElement)

  // Añadir el video al body
  body.appendChild(videoElement)
}
