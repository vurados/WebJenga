// import {Block, tower} from './index'
import {scene} from '../InitEngine/Init'
import * as THREE from 'three'

interface BlockInterface{
    width: number
    height: number
    depth: number
}
interface TowerInterface{
    height: number
    blocksInLayer: number
}

export class JengaBlock {
    static curreentTowerHeight:number
    static spaceCursor:number //Empty space where next block go
    static width: number
    static height: number
    static depth: number
    static initialTowerHeight: number
    static blocksInLayer: number
    static ListOfBlocks: {layer:number, place:number, block: THREE.Mesh}[] = []
    static ghostPlacement: boolean
    static lastLayerList: number[]
    color:number 
    layer:number
    place:number

    static Init(JengaBlockConfig: BlockInterface, towerConfig: TowerInterface){
        this.lastLayerList = []
        this.width = JengaBlockConfig.width
        this.height = JengaBlockConfig.height
        this.depth = JengaBlockConfig.depth
        this.initialTowerHeight = towerConfig.height
        this.blocksInLayer = towerConfig.blocksInLayer
        this.curreentTowerHeight = 0
        this.spaceCursor = 0
    }

    constructor() {
        this.layer = JengaBlock.curreentTowerHeight
        this.place = JengaBlock.spaceCursor
        this.color = Math.random() * 0xffffff
        const blockGeometry = new THREE.BoxGeometry(JengaBlock.width, JengaBlock.height, JengaBlock.depth);
        //give every block random color
        const blockMaterial = new THREE.MeshBasicMaterial({ color: this.color }); 
        const block = new THREE.Mesh(blockGeometry, blockMaterial);
        JengaBlock.ListOfBlocks.push({layer:this.layer, place:this.place, block:block})
        if( JengaBlock.spaceCursor == 2){
            JengaBlock.spaceCursor = 0
            JengaBlock.curreentTowerHeight += 1
        }else{
            JengaBlock.spaceCursor += 1
        }
        this.addBlock(block)
    }

    addBlock(block: THREE.Mesh){
        block.position.y = this.layer * JengaBlock.height;
        if((this.layer % 2) == 0){
            block.rotation.y = Math.PI / 2  //rotate blocks in even layers by 90 degree
            block.position.z = (this.place - (JengaBlock.blocksInLayer - 1)/2) * JengaBlock.width
        }else{
            block.position.x = (this.place - (JengaBlock.blocksInLayer - 1)/2) * JengaBlock.width
        }
        // add block to the scene
        scene.add(block);
    }

    getAllSceneBlocks(){
        const blocks = scene.children
        return blocks
    }

    getAllBlockInstances(){
        return JengaBlock.ListOfBlocks
    }

    public static putGhostBlock(cursor: number){
        console.info('ghost placemnt', JengaBlock.ghostPlacement);
        
        if(JengaBlock.ghostPlacement){JengaBlock.removeLastBlock()}
        if(JengaBlock.lastLayerList.includes(cursor)) {console.log('cursor in lastlayerlist', cursor, JengaBlock.lastLayerList);return;}
        
        const ghostBlockGeometry = new THREE.BoxGeometry(JengaBlock.width, JengaBlock.height, JengaBlock.depth);
        const ghostBlockMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.5 });
        const ghostBlock = new THREE.Mesh(ghostBlockGeometry, ghostBlockMaterial);
    
        const ghostBlockLayer = JengaBlock.curreentTowerHeight;
        const ghostBlockPlace = cursor
    
        ghostBlock.position.y = ghostBlockLayer * JengaBlock.height;
    
        if (ghostBlockLayer % 2 === 0) {
          ghostBlock.rotation.y = Math.PI / 2;
          ghostBlock.position.z = (ghostBlockPlace - (JengaBlock.blocksInLayer - 1) / 2) * JengaBlock.width;
        } else {
          ghostBlock.position.x = (ghostBlockPlace - (JengaBlock.blocksInLayer - 1) / 2) * JengaBlock.width;
        }
        // Add the ghost block to the scene
        scene.add(ghostBlock);
        JengaBlock.ghostPlacement = true
    }

    // Method to remove a block at a specific position in the layer
    public static removeLastBlock() {
        const removedBlock = scene.children[scene.children.length - 1]
        scene.remove(removedBlock);
        JengaBlock.ghostPlacement = false
    }

    public static addOnCursor(cursor: number){
        if(JengaBlock.lastLayerList.includes(cursor)) return
        const color = Math.random() * 0xffffff
        const blockGeometry = new THREE.BoxGeometry(JengaBlock.width, JengaBlock.height, JengaBlock.depth);
        //give every block random color
        const blockMaterial = new THREE.MeshBasicMaterial({ color: color }); 
        const block = new THREE.Mesh(blockGeometry, blockMaterial);
        JengaBlock.ListOfBlocks.push({layer:JengaBlock.curreentTowerHeight, place:cursor, block:block})
        if( JengaBlock.lastLayerList.length == JengaBlock.blocksInLayer - 1){
            JengaBlock.lastLayerList = []
            JengaBlock.curreentTowerHeight += 1
        }else{
            JengaBlock.lastLayerList.push(cursor)
        }
        block.position.y = JengaBlock.curreentTowerHeight * JengaBlock.height;
        if((JengaBlock.curreentTowerHeight % 2) == 0){
            block.rotation.y = Math.PI / 2  //rotate blocks in even layers by 90 degree
            block.position.z = (cursor - (JengaBlock.blocksInLayer - 1)/2) * JengaBlock.width
        }else{
            block.position.x = (cursor - (JengaBlock.blocksInLayer - 1)/2) * JengaBlock.width
        }
        // add block to the scene
        scene.add(block);
        JengaBlock.ghostPlacement = false
    }

    // removeBlock() {
    //     const topBlock = scene.children[scene.children.length - 1]; // Assuming blocks are added to the scene
    //     if (topBlock) {
    //         scene.remove(topBlock);
    //         updateTowerHeight(-1);
    //         updateStability();
    //     }
    // }

    // Function to add a block on top of the tower
    // public static putBlockOnTop() {
    //     const newBlockGeometry = new THREE.BoxGeometry(JengaBlock.width, JengaBlock.height, JengaBlock.depth);
    //     const newBlockMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    //     const newBlock = new THREE.Mesh(newBlockGeometry, newBlockMaterial);

    //     // Position the new block on top of the existing tower
    //     newBlock.position.y = JengaBlock.curreentTowerHeight * JengaBlock.height;
    //     if((JengaBlock.curreentTowerHeight % 2) == 0){
    //         newBlock.rotation.y = Math.PI / 2  //rotate blocks in even layers by 90 degree
    //         newBlock.position.z = (JengaBlock.spaceCursor - (3 - 1)/2) * JengaBlock.width
    //     }else{
    //         newBlock.position.x = (JengaBlock.spaceCursor - (3 - 1)/2) * JengaBlock.width
    //     }

    //     if( JengaBlock.spaceCursor == 2){
    //         JengaBlock.spaceCursor = 0
    //         JengaBlock.curreentTowerHeight += 1
    //     }else{
    //         JengaBlock.spaceCursor += 1
    //     }
    //     // Add the new block to the scene
    //     scene.add(newBlock);
    // }
}

export const ConstructTower = (towerConfig: TowerInterface, blocksConfig: BlockInterface) => {
    JengaBlock.Init(blocksConfig, towerConfig)
    for(let i = 0; i < towerConfig.height * towerConfig.blocksInLayer; i++){
        new JengaBlock()
    }
    return JengaBlock
}






// // Function to update the tower height
// function updateTowerHeight(increment) {
//     towerHeight += increment;
// }

// Function to update stability (you need to implement your own stability logic)
// function updateStability() {
//     // Your stability logic goes here
// }