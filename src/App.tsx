import { useState } from 'react';
import './App.css'
import {} from './InitEngine/Init'
import {} from './Logick/index'
import {} from './Logick/eventListeners'


function App() {

  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  
  const [play, setPlay] = useState<boolean>(true)
  const [started, setStarted] = useState<boolean>(false)
  
  // const defaultX = scene.rotation.x 
  // const defaultY = scene.rotation.y 
  // const defaultZ = scene.rotation.z 
  
  return (
    <>
      {/* <button onClick={rotate}>rotate</button> */}
      {/* <button >{play ? 'play' : 'stop'}</button> */}
      {/* <div id="game-container"></div> */}
    </>
  )
}

export default App
