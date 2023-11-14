import * as THREE from "three";
import { JengaBlock, ListOfBlocksInterface } from "./Blocks";
import { scene } from ".";

export class Tower {
    static centerMassDot:THREE.Points


    public static  isTowerStable(listOfBlocks: ListOfBlocksInterface[]): {isStable: boolean, stability: number, centerOfMass: THREE.Vector3}{
        const listOfCenters: THREE.Vector3[] = [];
        
        
        listOfBlocks.forEach((element) => {
            if(element.inTower){
                const blockGeometry = element.block.geometry;
                blockGeometry.computeBoundingBox();
                if (blockGeometry.boundingBox) {
                    const centerOfBlock = new THREE.Vector3();
                    blockGeometry.boundingBox.getCenter(centerOfBlock);
                    element.block.localToWorld(centerOfBlock);
                    listOfCenters.push(centerOfBlock);
                    if(element.layer == 0){
                        // TODO:
                        console.log('lower layer');
                    }
                }
                
            }
        });

        const centerOfMass = new THREE.Vector3();
        for (const center of listOfCenters){
            centerOfMass.add(center);
        }
        centerOfMass.divideScalar(listOfCenters.length);

        // TODO: Change if statement add support area calculating
        let isStable = false;
        let stability = 0
        const supportArea = 10; /* calculate the support area based on your requirements */
        if (centerOfMass.x < supportArea && centerOfMass.y < supportArea) {
            isStable = true;
        }
        if(!Tower.centerMassDot){
            const dotGeometry = new THREE.BufferGeometry();
            dotGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [0,0,0], 3 ) );
            const dotMaterial = new THREE.PointsMaterial( { color: 0xffffff, size:3, sizeAttenuation:false} );
            Tower.centerMassDot = new THREE.Points(dotGeometry, dotMaterial);
            Tower.centerMassDot.position.set(centerOfMass.x, centerOfMass.y, centerOfMass.z)
            Tower.centerMassDot.renderOrder = 999
            Tower.centerMassDot.material.depthTest = false
            scene.add(Tower.centerMassDot);
        }else{
            Tower.centerMassDot.position.set(centerOfMass.x, centerOfMass.y, centerOfMass.z)
        }

        console.log('wea are out of tower', isStable, stability, centerOfMass);
        return { isStable, stability, centerOfMass };
    }

}
