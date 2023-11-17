import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState, useRef } from "react";
import { Bullet } from "./Components/Bullet";
import { Backrooms } from "./Components/Backrooms_another_level";
import { Room } from "./Components/Room"
import { Door1 } from "./Components/Door_new";
import { Targets } from "./Components/Gun_targets";
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
        <Box name="floor" ref={floor} receiveShadow position={[0,0,0]} args={[25,0,65]}>
        <meshStandardMaterial color={"lightgrey"} />
       </Box>
       </RigidBody>

       {fired && projectiles.map((projectile:any)=>(
          <Bullet setObj={setHitObject} key={projectile.id} bullet={projectile} finHit={finHit}/>
       ))}
       
       {false && <RigidBody type="fixed" colliders="trimesh" position={[5,2,10]}>
       
         <Backrooms />
      
       </RigidBody>}
       
        <Room />
      
       {/* <Door1 /> */}


      {/* <RigidBody colliders="trimesh" type="fixed">
      <Targets />
      </RigidBody> */}
       
       </> 
    )
}


export default Scene