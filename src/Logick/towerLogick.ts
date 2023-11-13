import * as THREE from "three";
import { JengaBlock, ListOfBlocksInterface } from "./Blocks";

export class Tower {

    public static  isTowerStable(listOfBlocks: ListOfBlocksInterface[]): {isStable: boolean, stability: number, centerOfMass: THREE.Vector3}{
        const listOfCenters: THREE.Vector3[] = [];
        
        
        listOfBlocks.forEach((element) => {
            if(element.inTower){
                let blockGeometry = element.block.geometry;
                blockGeometry.computeBoundingBox();
                if (blockGeometry.boundingBox) {
                    const centerOfBlock = new THREE.Vector3();
                    blockGeometry.boundingBox.getCenter(centerOfBlock);
                    element.block.localToWorld(centerOfBlock);
                    listOfCenters.push(centerOfBlock);
                    if(element.layer == 0){
                        // TODO:
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

        console.log('wea are out of tower', isStable, stability, centerOfMass);
        return { isStable, stability, centerOfMass };
    }

  // Add more logic or functions as needed
}
