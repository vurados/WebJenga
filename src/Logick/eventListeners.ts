import * as THREE from "three";
import { camera } from ".";
import { renderer, scene } from "../InitEngine/Init";
import { JengaBlock } from "./Blocks";
import { Tower } from "./towerLogick";
import { isIntersectsBlock } from "./helperMethods";


let isKeyPressed = false
let cursor:number
let startMouseX = 0;
let startMouseY = 0;
// export let stillOn: boolean = false


const getBlockOnPointer = (event:any) => {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    
    pointer.x = ((event.clientX - renderer.domElement.offsetLeft)/ renderer.domElement.width) * 2 - 1;
    pointer.y = - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    
    return intersects
}
// function that deletes block that was clicked
const deleteOnIntersection = (event: any) => {
    if(event.type == 'mousedown'){
        startMouseX = event.clientX;
        startMouseY = event.clientY;
        return
    }
    if(event.type == 'mouseup'){
        const deltaX = startMouseX - event.clientX 
        const deltaY = startMouseY - event.clientY 
        if((deltaX + deltaY) != 0){
            return
        }
    }
    const intersects = getBlockOnPointer(event)
    

    console.log("🚀 ~ file: eventListeners.ts:27 ~ deleteOnIntersection ~ event.type:", event.type)

    const intersectedBlock = isIntersectsBlock(intersects)
    
    if (intersectedBlock !== null) {
        const objectId = intersectedBlock.id;
        const block = scene.getObjectById(objectId);
        for(const extendedBlock of JengaBlock.ListOfBlocks){
            if(extendedBlock.block.id == objectId){
                extendedBlock.inTower = false
            }
        }
        console.log('thats block ',block);
        console.log('scene children', scene.children);
        scene.remove(block);
    }
    Tower.isTowerStable(JengaBlock.ListOfBlocks)
}

const highlightOnIntersection = (event: any) => {
    // let intersectedObject: null | THREE.Object3D

    const intersects = getBlockOnPointer(event)
    
    const highlightedMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const intersectedBlock = isIntersectsBlock(intersects)
    
    if (intersectedBlock !== null) {
        JengaBlock.ListOfBlocks.forEach((blocks) => {
            const object = blocks.block
            if (object.id == intersectedBlock.id ){
                object.material = highlightedMaterial
            }else{
                object.material = blocks.material
            }
        })
    }else{
        JengaBlock.ListOfBlocks.forEach((block) => {
            if(block.block.material != block.material){
                block.block.material = block.material
            }
        })
        return
    }
}


// listner for choosing 
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

renderer.domElement.addEventListener('mouseup', deleteOnIntersection)
renderer.domElement.addEventListener('mousedown', deleteOnIntersection)
renderer.domElement.addEventListener('mousemove', highlightOnIntersection)


export default {}