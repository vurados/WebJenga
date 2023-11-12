import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement)

function render() {
    requestAnimationFrame( render );
    TWEEN.update()
    controls.update()
    renderer.render( scene, camera );
  }

render();

export  {scene, camera, renderer, controls}