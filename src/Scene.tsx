import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState, useRef } from "react";
import { Bullet } from "./Components/Bullet";
import { Model } from "./Components/Old_toy";
import * as THREE from "three"


interface sceneProps {
    projectiles:any,
    finHit : (hitId: any) => void
}

export const Scene = (props:sceneProps)=> {
   const {projectiles, finHit} = props
   const [fired, setFired] = useState<Boolean>(false)
   const [hitObject, setHitObject] = useState<any>({})
   const ref =useRef<any>()
   const floor = useRef<any>()

   useEffect(()=>{
     if(projectiles.length > 0){
        setFired(true)
        
     }
     
   
   }, [projectiles])
   
   const textureLoader = new THREE.TextureLoader()

    return (
       <>

       <RigidBody type="fixed" userData={{
         child: floor.current
       }}>
        <Box name="floor" ref={floor} receiveShadow position={[0,0,0]} args={[25,2,25]}>
        <meshStandardMaterial color={"lightgrey"} />
       </Box>
       </RigidBody>

       <RigidBody ref={ref} userData={{
         health: 100,
         child: ref.current
       }}>
        <Box name="wall"  position={[4,3,5]} args={[3,2,0.5]} >
        <meshStandardMaterial map={textureLoader.load(`./textures/splat.png`)} color="red" />
       </Box>
       </RigidBody>

       {fired && projectiles.map((projectile:any)=>(
          <Bullet setObj={setHitObject} key={projectile.id} bullet={projectile} finHit={finHit}/>
       ))}
         

         <RigidBody name="box" colliders="trimesh" position={[5,2,0]}>
            <Model /> 
         </RigidBody>

       </> 
    )
}


export default Scene