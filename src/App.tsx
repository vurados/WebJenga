import { useState } from 'react';
import './App.css'
import {scene, camera, renderer} from './ThreeInit/Init'
import * as THREE from 'three'

function App() {
  const [play, setPlay] = useState(true)

  // Dimensions of the Jenga block
  const blockWidth = 1;
  const blockHeight = 1; 
  const blockDepth = 3;

  // Number of blocks in the tower
  const towerHeight = 10;
  const blocksInLayer = 3

  // Create a loop to place blocks in a tower
  for (let i = 0; i < towerHeight; i++) {
    for(let j=0; j<blocksInLayer; j++){
      const blockGeometry = new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth);
      const blockMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
      const block = new THREE.Mesh(blockGeometry, blockMaterial);

      // Adjust the position of each block in the tower
      block.position.y = i * blockHeight;
      if((i % 2) == 0){
        block.rotation.y = Math.PI / 2  //rotate blocks in even layers by 90 degree
        block.position.z = (j - (blocksInLayer - 1)/2) * blockWidth
      }else{
        block.position.x = (j - (blocksInLayer - 1)/2) * blockWidth
      }
      
      scene.add(block);
    }
  }

  // Set the camera position
  camera.position.z = 10;
  camera.position.y = 5
  
  const defaultX = scene.rotation.x 
  const defaultY = scene.rotation.y 
  const defaultZ = scene.rotation.z 
  
  function animate() {
    requestAnimationFrame( animate );
    // console.log(play, 'rotate');
    scene.rotation.y += 0.01;
    // if (play){
    //   scene.rotation.x += 0.01;
    //   scene.rotation.y += 0.01;
    // }
    renderer.render( scene, camera );
  }
  // animate();

  return (
    <>
      <button onClick={animate}>animate</button>
      <button onClick={() => setPlay((prev) => {return  !prev})}>{play ? 'play' : 'stop'}</button>
      <div id="game-container"></div>
    </>
  )
}

export default App
