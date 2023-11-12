import * as THREE from 'three'
import {controls, camera} from '../InitEngine/Init'
import TWEEN from '@tweenjs/tween.js'

interface CameraPosInterface{
    x: number
    y: number
    z: number
}
interface TargetInterface{
    x: number
    y: number
    z: number
}

export const updateCameraPosition = (cameraPos: CameraPosInterface, target: TargetInterface) => {
  // const tween = new TWEEN.Tween()    
    const currentSpherical = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    console.log(currentSpherical);
    const newCameraPosition = new THREE.Vector3().setFromSpherical(new THREE.Spherical(cameraPos.z, currentSpherical.phi, currentSpherical.theta));
    // Smoothly transition camera position
    new TWEEN.Tween(camera.position)
      .to(newCameraPosition, 1000) // Adjust duration as needed
      .easing(TWEEN.Easing.Quadratic.Out) // Choose an easing function
      .start();

    // Smoothly transition controls target
    new TWEEN.Tween(controls.target)
      .to(target, 1000) // Adjust duration as needed
      .easing(TWEEN.Easing.Quadratic.Out) // Choose an easing function
      .start();
}