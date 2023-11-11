import { useState } from 'react';
import './App.css'
import {renderer} from './InitEngine/Init'
import {scene, camera, controls} from './Logick/index'
import { JengaBlock } from './Logick/Blocks';





function App() {
  let isKeyPressed = false
  let cursor:number
  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  
  const [play, setPlay] = useState<boolean>(true)
  const [started, setStarted] = useState<boolean>(false)
  const [ghostFlag, setGhostFlag] = useState<boolean>(false)
  
  // const defaultX = scene.rotation.x 
  // const defaultY = scene.rotation.y 
  // const defaultZ = scene.rotation.z 
  
  function animate() {
    requestAnimationFrame( animate );
    controls.update()
    renderer.render( scene, camera );
  }

  if (!started){
    console.log("run animate");
    setStarted(true)
    animate();
  }

  window.addEventListener('keydown', (event) => {
    if (!isKeyPressed){
      event.stopPropagation()
      isKeyPressed = true
      const pressedKey = event.key;
      
    
      // Check if the pressed key is a number and within the valid range
      const blockPosition = parseInt(pressedKey);
      if (!isNaN(blockPosition) && blockPosition >= 1 && blockPosition <= JengaBlock.blocksInLayer) {
        // Example: remove the block at the pressed position
        cursor = blockPosition - 1 
        JengaBlock.putGhostBlock(cursor); //we subtrackt 1 couse on keyboard we get (1...n) but in class cursor is (0...n-1)
        // setGhostFlag(true)

        // Example: move the block at position 1 to position 3
        // JengaBlock.moveBlock(1, 3);
      }
      if (pressedKey === 'Enter') {
        // Example: add a real block at the pressed position
        JengaBlock.addOnCursor(cursor);
      }
    }
  });
  window.addEventListener('keyup', () => {
    // Reset the flag when the key is released
    isKeyPressed = false;
  });
  window.addEventListener('keyup', () => {
    // Reset the flag when the key is released
    isKeyPressed = false;
  });
  
  
  return (
    <>
      {/* <button onClick={rotate}>rotate</button> */}
      <button onClick={() => {new JengaBlock()}}>{play ? 'play' : 'stop'}</button>
      <div id="game-container"></div>
    </>
  )
}

export default App
