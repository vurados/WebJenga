import { useState } from 'react';
import './App.css'
import {renderer} from './InitEngine/Init'
import {scene, camera, controls} from './Logick/index'
import { JengaBlock } from './Logick/Blocks';
import * as TWEEN from '@tweenjs/tween.js'
import {} from './Logick/eventListeners'


function App() {

  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  
  const [play, setPlay] = useState<boolean>(true)
  const [started, setStarted] = useState<boolean>(false)
  
  // const defaultX = scene.rotation.x 
  // const defaultY = scene.rotation.y 
  // const defaultZ = scene.rotation.z 
  
  function render() {
    requestAnimationFrame( render );
    TWEEN.update()
    controls.update()
    renderer.render( scene, camera );
  }

  if (!started){
    console.log("run animate");
    
    setStarted(true)
    render();
  }

  
  return (
    <>
      {/* <button onClick={rotate}>rotate</button> */}
      <button onClick={() => console.log(camera.position)}>{play ? 'play' : 'stop'}</button>
      {/* <div id="game-container"></div> */}
    </>
  )
}

export default App
