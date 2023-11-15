import * as THREE from "three";
import { JengaBlock, ListOfBlocksInterface } from "./Blocks";
import { scene } from ".";

export class Tower {
    static centerMassDot:THREE.Points
    static baseMesh:THREE.Mesh

    public static  isTowerStable(listOfBlocks: ListOfBlocksInterface[]): {isStable: boolean, stability: number, centerOfMass: THREE.Vector3} | undefined{
        const listOfCenters: THREE.Vector3[] = [];
        const listOfSupportArea: number[] = []
        
        // if(listOfBlocks.length === 0){return}
        console.log('listOfBlocks[0]', listOfBlocks[0], listOfBlocks.length);
        
        for(let i = listOfBlocks.length-1; i >= 0; i--){
            const element = listOfBlocks[i]
            
            if(element.inTower){
                console.log("element.layer, element.place ",element.layer, element.place);
                
                const blockGeometry = element.block.geometry;
                blockGeometry.computeBoundingBox();
                if (blockGeometry.boundingBox) {
                    const centerOfBlock = new THREE.Vector3();
                    blockGeometry.boundingBox.getCenter(centerOfBlock);
                    element.block.localToWorld(centerOfBlock);
                    listOfCenters.push(centerOfBlock);
                    if(element.layer == 0){
                        // TODO:
                        listOfSupportArea.push(element.place)
                        console.log('lower layer');
                    }
                }
                
            }
        }

        Tower.calculateSupportArea(0, listOfSupportArea)

        const centerOfMass = new THREE.Vector3();
        for (const center of listOfCenters){
            centerOfMass.add(center);
        }
        centerOfMass.divideScalar(listOfCenters.length);

        // TODO: Change if statement add support area calculating
        let isStable = false;
        let stability = 0
        
        const supportArea = Tower.calculateSupportArea(0, listOfSupportArea); /* calculate the support area based on your requirements */
        if (supportArea.x[0] < centerOfMass.x && centerOfMass.x < supportArea.x[1] && supportArea.z[0] < centerOfMass.z && centerOfMass.z < supportArea.z[1]) {
            isStable = true;
            stability = Math.min(...[centerOfMass.x - supportArea.x[0], supportArea.x[1] - centerOfMass.x, centerOfMass.z - supportArea.z[0], supportArea.z[1] - centerOfMass.z])
        }
        
        console.log("Tower ~ isTowerStable ~ isStable:", isStable)
        console.log("Tower ~ isTowerStable ~ stability:", stability)
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

    public static calculateSupportArea(layer:number, blockPlacementList:number[]){
        
        if(blockPlacementList.length !== 1){
            blockPlacementList = [Math.min(...blockPlacementList), Math.max(...blockPlacementList)]
        }else{
            blockPlacementList = [blockPlacementList[0], blockPlacementList[0]]
        }
        
        let x:number[]
        let z:number[]
        const blockWidth = JengaBlock.width 
        const blocksInLayer = JengaBlock.blocksInLayer
        if((layer % 2) == 0){
            x = [(-(blocksInLayer - 1)/2) * blockWidth - (blockWidth/2) , ((blocksInLayer - 1)/2) * blockWidth + (blockWidth/2)]
            z = [(blockPlacementList[0] - (blocksInLayer - 1)/2) * blockWidth - (blockWidth/2), (blockPlacementList[1] - (blocksInLayer - 1)/2) * blockWidth + (blockWidth/2)]
        }else{
            z = [(-(blocksInLayer - 1)/2) * blockWidth - blockWidth , ((blocksInLayer - 1)/2) * blockWidth + blockWidth]
            x = [(blockPlacementList[0] - (blocksInLayer - 1)/2) * blockWidth, (blockPlacementList[1] - (blocksInLayer - 1)/2) * blockWidth]
        }

        
        const baseShape = new THREE.Shape();
        // Add the vertices of the block to the base shape
        baseShape.moveTo(x[0], z[0]);
        baseShape.lineTo(x[0], z[1]);
        baseShape.lineTo(x[1], z[1]);
        baseShape.lineTo(x[1], z[0]);
        baseShape.lineTo(x[0], z[0]);
        const geometry = new THREE.ExtrudeGeometry( baseShape, {depth:0.001} );
        if(!Tower.baseMesh){
            const baseMaterial = new THREE.MeshBasicMaterial( { color: 0x888888} );
            Tower.baseMesh = new THREE.Mesh( geometry, baseMaterial );
            Tower.baseMesh.renderOrder = 999
            Tower.baseMesh.material.depthTest = false
            Tower.baseMesh.rotation.x = Math.PI / 2
            Tower.baseMesh.position.y = -(JengaBlock.height / 2)
            scene.add(Tower.baseMesh);
        }else{
            Tower.baseMesh.geometry = geometry
        }
        
        return {x, z}
    } 

}
