import {scene, camera, controls} from '../InitEngine/Init'
import { ConstructTower} from './Blocks'
import * as THREE from 'three'

// Dimensions of jenga blocks
const blockConfig = {
    width: 1,
    height: 1,
    depth: 3
}
// Number of blocks in the tower
const tower = {
    height: 10,
    blocksInLayer: 3
}

const Block = ConstructTower(tower, blockConfig)
// setup camera
controls.rotateSpeed = 0.35;
controls.maxPolarAngle = Math.PI / 2;
// Disable rotation around the x and z axes
// controls.enableRotate = false;
camera.position.set( 0, tower.height * Block.height / 2, 10 );
const towerCenter = new THREE.Vector3(0, tower.height * Block.height / 2, 0);
controls.target.copy(towerCenter);
controls.update();


export {scene, camera, controls}