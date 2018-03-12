import 'react-fa'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import initReactFastclick from 'react-fastclick'
import EntryPoint from './containers'

function preventScroll(event) {
  if (event.touches[0].target.tagName.toLowerCase() === 'canvas') event.preventDefault()
}

document.addEventListener('touchstart', preventScroll, false)
document.addEventListener('touchmove', preventScroll, false)
document.addEventListener('touchend', preventScroll, false)
document.addEventListener('gesturestart', preventScroll, false)
document.addEventListener('gesturechange', preventScroll, false)
document.addEventListener('gestureend', preventScroll, false)

injectTapEventPlugin()
initReactFastclick()

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(<EntryPoint />, document.getElementById('root')),
)
