export const isIntersectsBlock = (intersects:THREE.Intersection[]):THREE.Object3D | null => {
    if (intersects.length > 0 && intersects[0].object){
        if(intersects[0].object.type === 'Points' && intersects[1]){intersects.shift()}
        if(intersects[0].object.type === 'Points'){return null}
        if(intersects[0].object.name === 'ghost' && intersects[1]){intersects[0] = intersects[1]}
        if(intersects[0].object.name === 'ghost'){return null}
        
        if(intersects[0]){
            return intersects[0].object
        }else{
            return null
    }}else{
        return null
    }
}