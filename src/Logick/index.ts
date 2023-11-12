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
const towerConfig = {
    height: 10,
    blocksInLayer: 3
}

const Block = ConstructTower(towerConfig, blockConfig)
// setup camera
controls.rotateSpeed = 0.35;
controls.maxPolarAngle = Math.PI / 2; //Lock camera angles to upper hemisphere

camera.position.set( 0, towerConfig.height * Block.height / 2, 10 );
const towerCenter = new THREE.Vector3(0, towerConfig.height * Block.height / 2, 0);
controls.target.copy(towerCenter);
controls.update();





export {scene, camera, controls}