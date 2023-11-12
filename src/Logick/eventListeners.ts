import { camera } from ".";
import { renderer } from "../InitEngine/Init";
import { JengaBlock } from "./Blocks";


let isKeyPressed = false
let cursor:number

window.addEventListener('keydown', (event) => {
  if (!isKeyPressed){
    event.stopPropagation()
    isKeyPressed = true
    const pressedKey = event.key;
    
    // Check if the pressed key is a number and within the valid range
    const blockPosition = parseInt(pressedKey);
    if (!isNaN(blockPosition) && blockPosition >= 1 && blockPosition <= JengaBlock.blocksInLayer) {
      cursor = blockPosition - 1 //we subtrackt 1 couse on keyboard we get (1...n) but in class cursor is (0...n-1)
      JengaBlock.putGhostBlock(cursor); 
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

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

export default {}